import React from 'react';
import { Layout } from 'antd';

import { StyledHeader, StyledContent, StyledFooter, Title } from './layout.styled';
import PacketList from './packet/list.component';

const App: React.FC = () => (
    <Layout>
        <StyledHeader>
            <Title>Comne</Title>
        </StyledHeader>
        <StyledContent>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <PacketList />
            </div>
        </StyledContent>
        <StyledFooter>©컴퓨터 네트워크 3팀</StyledFooter>
    </Layout>
);

export default App;
