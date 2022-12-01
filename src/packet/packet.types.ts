export type AvailableProtocol = 'ICMP' | 'HTTP' | 'DNS' | 'SSH';

export interface ICMP {
    id: string,
    src: string,
    dst: string,
    protocol: 'ICMP',
    checksum: number,
    seqno: number,
    identifier: number,
    payload: {
        type: 'Buffer',
        data: number[],
    },
    type: string,
    code: string,
    data: string,
}

export interface TCP {
    id: string,
    src: string,
    dst: string,
    sport: number,
    dport: number,
    seqno: number,
    ackno: number,
    flags: number,
    window: number,
    checksum: number,
    protocol: 'HTTP' | 'SSH',
    payload: {
        type: 'Buffer',
        data: number[],
    },
    data: string,
}

export interface UDP {
    id: string,
    src: string,
    dst: string,
    sport: number,
    dport: number,
    checksum: number,
    protocol: 'DNS',
    payload: {
        type: 'Buffer',
        data: number[],
    },
    data: string,
}

export type Packet = UDP | TCP | ICMP;
