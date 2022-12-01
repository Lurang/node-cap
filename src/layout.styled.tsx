import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout

export const StyledHeader = styled(Header)`
    position: 'sticky';
    top: 0;
    z-index: 1;
    width: 100%;
`;

export const Title = styled.h2`
    margin: 0px;
    color: azure;
`;

export const StyledContent = styled(Content)`
    padding: 0 50px;
    margin-top: 64px;
`;

export const StyledFooter = styled(Footer)`
    text-align: center;
`;
