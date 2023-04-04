import { Outlet } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SidebarMenu from '../SidebarMenu/SidebarMenu.component';
// import { selectIsListOpen } from '../store/list/list.selector';

function Sidebar() {
    const dispatch = useDispatch();
    // const isListOpen = useSelector(selectIsListOpen);

    return (
        <Row style={{ marginLeft: "2rem", zIndex: 2 }}>
            <Col xs={2} >
                <div className="sticky-top">
                    <SidebarMenu />
                </div>
            </Col>
            <Col style={{ margin: '2rem' }} xs={10} >
                <Outlet />
            </Col>
        </Row>
    );
}

export default Sidebar;