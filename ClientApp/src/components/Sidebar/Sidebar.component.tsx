import { Component } from 'react';
import { Outlet } from 'react-router';
import { Row } from 'react-bootstrap';

import { ContentContainer, SidebarsContainer } from './Sidebar.styles';
import SidebarMenuComponent from '../SidebarMenu/SidebarMenu.component';

class Sidebar extends Component {    
    render() {
        return (
            <Row style={{ marginLeft: "2rem", zIndex: 2 }}>
                <SidebarsContainer>
                    <SidebarMenuComponent />
                </SidebarsContainer>
                <ContentContainer>
                    <Outlet />
                </ContentContainer>
            </Row>
        );
    }
}

export default Sidebar;