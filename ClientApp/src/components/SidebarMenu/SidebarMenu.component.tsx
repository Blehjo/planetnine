import { Component, Dispatch} from "react";
import { Nav, Row } from "react-bootstrap";
import { Collection, ChatDots, House, Eye, Person, Robot, ChatLeft, Globe, Star, Airplane, Moon, PersonBadge, Hexagon } from 'react-bootstrap-icons';
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { checkUserSession } from "../../store/user/user.action";
import { CheckUserSession } from "../../store/user/user.action";
import { SideContainer } from "./SidebarMenu.styles";

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
            <SideContainer className='hidden fixed-top bg-dark'>
                <Row 
                xs={1} 
                >
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Airplane className='icons' color="white" />
                        <Nav.Link href="/voyager" className="ms-4">
                            Voyage
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Hexagon className='icons' color="white" />
                        <Nav.Link href="/fractal" className="ms-4">
                            Fractals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Person className='icons' color="white" />
                        <Nav.Link href="/vitals" className="ms-4">
                            Vitals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <House className='icons' color="white" />
                        <Nav.Link onClick={this.handleClick} href="/profile" className="ms-4">
                            Profile
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Robot className='icons' color="white"  />
                        <Nav.Link href="/crew" className="ms-4">
                            Crew
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <ChatDots className='icons' color="white"  />
                        <Nav.Link href="/messages" className="ms-4">
                            Messages
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Eye className='icons' color="white" />
                        <Nav.Link href="/explore" className="ms-4">
                            Explore
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Globe className='icons' color="white"  />
                        <Nav.Link href="/planets" className="ms-4">
                            Planets
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Moon className='icons' color="white" />
                        <Nav.Link href="/moons" className="ms-4">
                            Moons
                        </Nav.Link>
                    </Nav.Item >
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <PersonBadge className='icons' color="white" />
                        <Nav.Link href="/pilots" className="ms-4">
                            Pilots
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Collection className='icons' color="white" />
                        <Nav.Link href="/posts" className="ms-4">
                            Posts
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <ChatLeft className='icons' color="white" />
                        <Nav.Link href="/chats" className="ms-4">
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-4 d-flex align-items-center">
                        <Star className='icons' color="white" />
                        <Nav.Link href="/favorites" className="ms-4">
                            Favorites
                        </Nav.Link>
                    </Nav.Item>
                </Row>
            </SideContainer>
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