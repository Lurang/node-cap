
const ICMPV4 = (b, offset) => {
    offset || (offset = 0);

    /*     1B       1B         1B         1B
        | type  |  code  |       checksum        |
        | additional header field or unused      |
        | payload                                |
    */

    // 1바이트 타입
    const type = b[offset++];

    // 1바이트 코드
    const code = b[offset++];

    // 2바이트 체크썸
    const checksum = b.readUInt16BE(offset, true);
    offset += 2;
    /*
        type의 값
        3, 4, 5, 11 -> 에러
        0: echo응답
        3: 도달불가 에러
        4: source quench
        5: Redirect
        8: echo request
        11: time exceeded
        30: traceroute
        15~18: 정보 주고받기
    */

    // echo 요청 & echo 응답
    if ([0, 8, 30].includes(type)) {
        // 2바이트 identifier
        const identifier = b.readUInt16BE(offset, true);
        offset += 2;

        // 2바이트 sequence number
        const seqno = b.readUInt16BE(offset, true);
        offset += 2;

        return {
            type,
            code,
            checksum,
            identifier,
            seqno,
            offset,
        };
    } else {
        return {
            type,
            code,
            checksum,
            offset,
        };
    }
};

module.exports = {
    ICMPV4,
};
