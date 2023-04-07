import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { Col, Nav, Row } from "react-bootstrap";
import { Collection, House, Database, Eye, Clipboard, Bookmark, ChatDots, Person, PersonWorkspace, Newspaper, Robot, ChatLeft } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
// import { communityFetchAllStart } from "../store/community/community.action";
// import { selectCommunities } from "../store/community/community.selector";
// import { getUserCommunities } from "../utils/api/community";
// import { getUser } from "../utils/userDocument";

const SidebarMenu = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);

    return (
        <div style={{ color: "white", width: 250, height: '100vh', overflowY: 'auto', marginTop: '3rem', overflowX: 'hidden' }} className='hidden fixed-top bg-dark'>
            <Row 
            className="mw-100 pt-3"  
            xs={1} 
            >
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Person className='' color="white" size={20}/>
                    <Nav.Link href="/vitals" className="ms-4">
                        Vitals
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <House className='' color="white" size={20}/>
                    <Nav.Link href="/profile" className="ms-4">
                        Profile
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Robot className='' color="white" size={20} />
                    <Nav.Link href="/crew" className="ms-4">
                        Crew
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <ChatDots className='' color="white" size={20} />
                    <Nav.Link href="/messages" className="ms-4">
                        Messages
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <PersonWorkspace className='' color="white" size={20}/>
                    <Nav.Link href="/explore" className="ms-4">
                        Explore
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Clipboard className='' color="white" size={20} />
                    <Nav.Link href="/planets" className="ms-4">
                        Planets
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Newspaper className='' color="white" size={20}/>
                    <Nav.Link href="/moons" className="ms-4">
                        Moons
                    </Nav.Link>
                </Nav.Item >
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Database className='' color="white" size={20}/>
                    <Nav.Link href="/pilots" className="ms-4">
                        Pilots
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Collection className='' color="white" size={20}/>
                    <Nav.Link href="/posts" className="ms-4">
                        Posts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Eye className='' color="white" size={20}/>
                    <Nav.Link href="/favorites" className="ms-4">
                        Favorites
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <ChatLeft className='' color="white" size={20}/>
                    <Nav.Link href="/chats" className="ms-4">
                        Chats
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                    <Bookmark className='' color="white" size={20}/>
                    <Nav.Link href="/resources" className="ms-4">
                        Resources
                    </Nav.Link>
                </Nav.Item>
            </Row>
        </div>
    )
}

export default SidebarMenu;