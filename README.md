# Comne Packet Capture Program

DNS, ICMP, HTTP, SSH 프로토콜에 대한 패킷 캡쳐 프로그램

## Requirement
install nodejs v18.x.x https://nodejs.org/

install python if not exist

[visual studio build tools 설치 (Desktop development with C++)](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku-BuildTools)
c++을 이용한 데스크탑 개발 체크

Window
install npcap 1.71 installer https://npcap.com/#download

Linux \
install libpcap \
ex) ubuntu: apt install libpcap

## Config
config.json에 캡쳐할 ip주소 입력
```json
{
    "ip": "10.10.10.10"
}
```

cap.json파일 존재여부 확인 (빈값이여도 상관없음)

## Run
아래 명령어로 필요한 nodejs 라이브러리 설치
```
npm install
```

아래 명령어로 코드 build
```
npm run build
```

아래 명령어로 실행
```
npm run start
```

이후 localhost:3000에서 확인


## Known Error

```
npm install시
python 찾지못하는 문제
```
-> python3버전 다운로드및 PATH설정

```
npm install시
c언어 모듈을 불러오지 못하는경우
```
-> visual studio build tools이 설치되어있는지 확인

```
npm run start 이후
TypeError: device must be a string
```
-> config.json에 ip 주소 제대로 넣었는지 확인

```
npm run start이후
pcap 파일을 불러오지 못하는경우
```
-> window일경우 npcap, linux일경우 libpcap이 제대로 설치되어있는지 확인
