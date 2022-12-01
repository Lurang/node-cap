import { Tag } from 'antd';
import { AvailableProtocol } from './packet.types';
export interface ProtocolTagProps {
    protocol: AvailableProtocol,
}

export const ProtocolTag = ({protocol}: ProtocolTagProps) => {
    const protoColColorMap = {
        ICMP: 'red',
        HTTP: 'geekblue',
        DNS: 'purple',
        SSH: 'green',
    };

    return (
        <Tag color={protoColColorMap[protocol]}>{protocol}</Tag>
    );
}