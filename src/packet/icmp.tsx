import { Descriptions } from 'antd';
import { ICMP } from './packet.types';

interface ICMPProps {
    packet: ICMP;
}

export const ICMPComponent = ({packet}: ICMPProps) => {
    const payload = packet.payload.data.map(x => x.toString(16));
    const payloadArr = [];
    while (payload.length) {
        payloadArr.push(payload.splice(0, 8));
    }

    return (
        <Descriptions title="ICMP Info" layout="vertical" bordered>
            <Descriptions.Item label="Source">{packet.src}</Descriptions.Item>
            <Descriptions.Item label="Destination">{packet.dst}</Descriptions.Item>
            <Descriptions.Item label="Protocol">{packet.protocol}</Descriptions.Item>
            <Descriptions.Item label="Checksum">{packet.checksum}</Descriptions.Item>
            <Descriptions.Item label="SeqNo">{packet.seqno}</Descriptions.Item>
            <Descriptions.Item label="Identifier">{packet.identifier}</Descriptions.Item>
            <Descriptions.Item label="Type">{packet.type}</Descriptions.Item>
            <Descriptions.Item label="Code">{packet.code}</Descriptions.Item>
            <Descriptions.Item label="Payload">
                {payloadArr.map((p, index) => {
                    return (
                        <div id={index.toString()}>{p.map(x => x + ' ')}</div>
                    )
                })}
            </Descriptions.Item>
            <Descriptions.Item label="Data">{packet.data}</Descriptions.Item>
        </Descriptions>
    )
};
