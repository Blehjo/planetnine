import { Component, Dispatch, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { Col, Nav, Row } from "react-bootstrap";
import { Collection, House, Database, Eye, Clipboard, Bookmark, ChatDots, Person, PersonWorkspace, Newspaper, Robot, ChatLeft, Globe, Star, Airplane, Moon, Badge3d, PersonBadge } from 'react-bootstrap-icons';
import { ConnectedProps, connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { checkUserSession } from "../../store/user/user.action";
import { CheckUserSession } from "../../store/user/user.action";

type SidebarMenuProps = ConnectedProps<typeof connector>;

class SidebarMenu extends Component<SidebarMenuProps> {

    constructor(props: SidebarMenuProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.getUser(this.props.user)
    }

    componentDidMount(): void {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <div style={{ color: "white", width: 250, height: '100vh', overflowY: 'auto', marginTop: '3rem', overflowX: 'hidden' }} className='hidden fixed-top bg-dark'>
                <Row 
                className="mw-100 pt-3"  
                xs={1} 
                >
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <Airplane className='' color="white" size={20}/>
                        <Nav.Link href="/voyager" className="ms-4">
                            Voyage
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <Person className='' color="white" size={20}/>
                        <Nav.Link href="/vitals" className="ms-4">
                            Vitals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <House className='' color="white" size={20}/>
                        <Nav.Link onClick={this.handleClick} href="/profile" className="ms-4">
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
                        <Eye className='' color="white" size={20}/>
                        <Nav.Link href="/explore" className="ms-4">
                            Explore
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <Globe className='' color="white" size={20} />
                        <Nav.Link href="/planets" className="ms-4">
                            Planets
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <Moon className='' color="white" size={20}/>
                        <Nav.Link href="/moons" className="ms-4">
                            Moons
                        </Nav.Link>
                    </Nav.Item >
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <PersonBadge className='' color="white" size={20}/>
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
                        <ChatLeft className='' color="white" size={20}/>
                        <Nav.Link href="/chats" className="ms-4">
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-3 ms-3 d-flex align-items-center">
                        <Star className='' color="white" size={20}/>
                        <Nav.Link href="/favorites" className="ms-4">
                            Favorites
                        </Nav.Link>
                    </Nav.Item>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user.currentUser?.userId,
    userprofile: state.userprofile
});

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart | CheckUserSession>) => ({
    getCurrentUser: () => dispatch(checkUserSession()),
    getUser: (userId: number | undefined) => dispatch(userprofileFetchSingleStart(userId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SidebarMenu);