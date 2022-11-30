const Cap = require('cap').Cap;
const decoders = require('cap').decoders;
const fs = require('fs');
const {ICMPV4} = require('./decoder');
const PROTOCOL = decoders.PROTOCOL;

const c = new Cap();
const device = Cap.findDevice('14.35.70.156');
const filter = 'ip proto 1 or port 22 or port 53 or port 80';
const bufSize = 10 * 1024 * 1024;
const buffer = Buffer.alloc(bufSize);

const linkType = c.open(device, filter, bufSize, buffer);

c.setMinBytes && c.setMinBytes(0);

const checkProtocol = (sport, dport) => {
  if ([sport, dport].includes(22)) {
    return 'SSH';
  } else if ([sport, dport].includes(53)) {
    return 'DNS';
  } else if ([sport, dport].includes(80)) {
    return 'HTTP';
  }
};

const bufToStr = (buffer) => {
  let str = '';
  for (const pair of buffer.entries()) {
    if (pair[1] >= 32 && pair[1] < 128) {
      str += Buffer.from([pair[1]]).toString('ascii');
    } else {
      str += '.';
    }
  }

  return str;
};

c.on('packet', (nbytes, trunc) => {
  let result;

  if (linkType === 'ETHERNET') {
    let ret = decoders.Ethernet(buffer);

    if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
      ret = decoders.IPV4(buffer, ret.offset);
      if (ret.info.protocol === PROTOCOL.IP.TCP) {
        if (ret.info.totallen === buffer.length - ret.offset + ret.hdrlen) {
          // TSO.....
        } else {
          const datalen = ret.info.totallen - ret.hdrlen;
          const tcp = decoders.TCP(buffer, ret.offset);
          const payload = Buffer.from(new Uint8Array(buffer).slice(tcp.offset, tcp.offset + datalen - tcp.hdrlen));


          result = {
            src: ret.info.srcaddr,
            dst: ret.info.dstaddr,
            sport: tcp.info.srcport,
            dport: tcp.info.dstport,
            seqno: tcp.info.seqno,
            ackno: tcp.info.ackno,
            flags: tcp.info.flags,
            window: tcp.info.window,
            checksum: tcp.info.checksum,
            protocol: checkProtocol(tcp.info.srcport, tcp.info.dstport),
            payload,
            data: bufToStr(Buffer.from(new Uint8Array(buffer).slice(tcp.offset, tcp.offset + datalen - tcp.hdrlen)))
          };
        }
      } else if (ret.info.protocol === PROTOCOL.IP.UDP) {
        const udp = decoders.UDP(buffer, ret.offset);
        const payload = bufToStr(Buffer.from(new Uint8Array(buffer).slice(udp.offset, udp.offset + udp.info.length)));
        result = {
          src: ret.info.srcaddr,
          dst: ret.info.dstaddr,
          sport: udp.info.srcport,
          dport: udp.info.dstport,
          checksum: udp.info.checksum,
          protocol: checkProtocol(udp.info.srcport, udp.info.dstport),
          payload,
          data: bufToStr(Buffer.from(new Uint8Array(buffer).slice(udp.offset, udp.offset + udp.info.length))),
        };
      } else if (ret.info.protocol === PROTOCOL.IP.ICMP) {
        const icmp = ICMPV4(buffer, ret.offset);
        const length = ret.info.totallen;
        const payload = Buffer.from(new Uint8Array(buffer).slice(icmp.offset, length));
        result = {
          src: ret.info.srcaddr,
          dst: ret.info.dstaddr,
          protocol: 'ICMP',
          checksum: icmp.checksum,
          seqno: icmp.seqno,
          identifier: icmp.identifier,
          payload,
          type: icmp.type,
          code: icmp.code,
          data: bufToStr(Buffer.from(new Uint8Array(buffer).slice(icmp.offset, length))),
        };
      }
    }
  }

  result && fs.appendFileSync('./cap.json', JSON.stringify(result) + '\n');
});

const express = require('express');
const app = express();

app.use('/api', require('./api'));

app.listen(3001);
