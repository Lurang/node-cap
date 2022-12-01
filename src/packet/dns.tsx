import { Descriptions } from 'antd';
import { UDP } from './packet.types';

interface DNSProps {
    packet: UDP;
}

export const DNSComponent = ({packet}: DNSProps) => {
    const payload = packet.payload.data.map(x => x.toString(16));
    const payloadArr = [];
    while (payload.length) {
        payloadArr.push(payload.splice(0, 8));
    }

    return (
        <Descriptions title="DNS Info" layout="vertical" bordered>
            <Descriptions.Item label="Id">{packet.id}</Descriptions.Item>
            <Descriptions.Item label="Src">{packet.src}</Descriptions.Item>
            <Descriptions.Item label="Dst">{packet.dst}</Descriptions.Item>
            <Descriptions.Item label="Sport">{packet.sport}</Descriptions.Item>
            <Descriptions.Item label="Dport">{packet.dport}</Descriptions.Item>
            <Descriptions.Item label="Checksum">{packet.checksum}</Descriptions.Item>
            <Descriptions.Item label="Protocol">{packet.protocol}</Descriptions.Item> 
            <Descriptions.Item label="Payload">
                {payloadArr.map((p, index) => {
                    return (
                        <div id={index.toString()}>{p.map(x => x + ' ')}</div>
                    )
                })}
            </Descriptions.Item>
            <Descriptions.Item label="data">{packet.data}</Descriptions.Item>
        </Descriptions>
    )
};
