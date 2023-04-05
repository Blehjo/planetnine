import { Outlet } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SidebarMenu from '../SidebarMenu/SidebarMenu.component';
import { ContentContainer, SidebarsContainer } from './Sidebar.styles';
// import { selectIsListOpen } from '../store/list/list.selector';

function Sidebar() {
    const dispatch = useDispatch();
    // const isListOpen = useSelector(selectIsListOpen);

    return (
        <Row style={{ marginLeft: "2rem", zIndex: 2 }}>
            <SidebarsContainer>
                <SidebarMenu />
            </SidebarsContainer>
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </Row>
    );
}

export default Sidebar;