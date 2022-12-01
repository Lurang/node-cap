import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import useInterval from '../useInterval';
import { DNSComponent } from './dns';
import { HTTPComponent } from './http';
import { ICMPComponent } from './icmp';
import { AvailableProtocol, Packet } from './packet.types';
import { SSHComponent } from './ssh';
import { ProtocolTag } from './tag';

const PacketList: React.FC = () => {
  const [packetList, setPacketList] = useState<Packet[]>([]);

  const getPacketList = async () => {
    const res = await fetch('/api/packet');
    const json: Packet[] = await res.json();
    setPacketList(json);
  };

  // TODO: remove useEffect, which cause api twice
  useEffect(() => {
    getPacketList();
  }, [])
  useInterval(getPacketList, 60 * 1000);

  const columns: ColumnsType<Packet> = [
    {
      title: 'Source Address',
      dataIndex: 'src',
      key: 'src',
    },
    {
      title: 'Destination Address',
      dataIndex: 'dst',
      key: 'dst',
    },
    {
      title: 'Source Port',
      dataIndex: 'sport',
      key: 'sport',
    },
    {
      title: 'Destination Port',
      dataIndex: 'dport',
      key: 'dport',
    },
    {
      title: 'Protocol',
      dataIndex: 'protocol',
      key: 'protocol',
      filters: [
        { text: 'HTTP', value: 'HTTP' },
        { text: 'DNS', value: 'DNS' },
        { text: 'ICMP', value: 'ICMP' },
        { text: 'SSH', value: 'SSH' },
      ],
      onFilter: (value: any, packet) => value.includes(packet.protocol),
      render: (protocol: AvailableProtocol) => <ProtocolTag protocol={protocol} />,
    }
  ];


  const onChange: TableProps<Packet>['onChange'] = (filters) => {
    console.log(filters);
  }

  return (
    <Table
      size="small"
      dataSource={packetList}
      columns={columns}
      rowKey={record => record.id}
      onChange={onChange}
      expandable={{
        expandedRowRender: (record) => {
          if (record.protocol === 'ICMP') {
            return <ICMPComponent packet={record} />
          }
          else if (record.protocol === 'HTTP') {
            return <HTTPComponent packet={record} />
          }
          else if (record.protocol === 'DNS') {
            return <DNSComponent packet={record} />
          }
          else if (record.protocol === 'SSH') {
            return <SSHComponent packet={record} />
          }
          return (
            <p style={{ margin: 0 }}>{record.protocol}</p>
          )
        },
      }}
      expandRowByClick
    />
  );
};

export default PacketList;