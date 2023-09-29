import { Component, Dispatch} from "react";
import { Nav, Row } from "react-bootstrap";
import { Collection, ChatDots, House, Eye, Person, Robot, ChatLeft, Globe, Star, Airplane, Moon, PersonBadge, Hexagon } from 'react-bootstrap-icons';
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { checkUserSession } from "../../store/user/user.action";
import { CheckUserSession } from "../../store/user/user.action";
import { SideContainer } from "./SidebarMenu.styles";
import { Lightbulb } from "react-bootstrap-icons";

type SidebarMenuProps = ConnectedProps<typeof connector>;

class SidebarMenu extends Component<SidebarMenuProps> {

    constructor(props: SidebarMenuProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.getUser(this.props.user)
    }

    render() {
        const pathname = window.location.pathname;
        return (
            <SideContainer className='mt-5 pb-5 hidden fixed-top bg-dark'>
                <Row 
                xs={1} 
                style={{ paddingBottom: '4rem'}}
                >
                    <Nav.Item style={pathname == "/voyager" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 mt-3 d-flex align-items-center hovercss">
                        <a href="/voyager">
                        <Airplane className='icons' color="white" />
                        </a>
                        <Nav.Link href="/voyager" className="ms-4">
                            Voyage
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/fractal" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/fractal">
                        <Hexagon className='icons' color="white" />
                        </a>
                        <Nav.Link href="/fractal" className="ms-4">
                            Fractals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/builder" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/builder">
                        <Lightbulb className='icons' color="white" />
                        </a>
                        <Nav.Link href="/builder" className="ms-4">
                            Builder
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/vitals" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/vitals">
                        <Person className='icons' color="white" />
                        </a>
                        <Nav.Link href="/vitals" className="ms-4">
                            Vitals
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/profile" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a onClick={this.handleClick} href="/profile">
                        <House className='icons' color="white" />
                        </a>
                        <Nav.Link onClick={this.handleClick} href="/profile" className="ms-4">
                            Profile
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/crew" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/crew">
                        <Robot className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/crew" className="ms-4">
                            Crew
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/messages" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/messages">
                        <ChatDots className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/messages" className="ms-4">
                            Messages
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/explore" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/explore">
                        <Eye className='icons' color="white" />
                        </a>
                        <Nav.Link href="/explore" className="ms-4">
                            Explore
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/planets" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/planets">
                        <Globe className='icons' color="white"  />
                        </a>
                        <Nav.Link href="/planets" className="ms-4">
                            Planets
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/moons" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/moons">
                        <Moon className='icons' color="white" />
                        </a>
                        <Nav.Link href="/moons" className="ms-4">
                            Moons
                        </Nav.Link>
                    </Nav.Item >
                    <Nav.Item style={pathname == "/pilots" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/pilots">
                        <PersonBadge className='icons' color="white" />
                        </a>
                        <Nav.Link href="/pilots" className="ms-4">
                            Pilots
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/posts" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/posts">
                        <Collection className='icons' color="white" />
                        </a>
                        <Nav.Link href="/posts" className="ms-4">
                            Posts
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/chats" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/chats">
                        <ChatLeft className='icons' color="white" />
                        </a>
                        <Nav.Link href="/chats" className="ms-4">
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={pathname == "/favorites" ? {background: 'black', borderRadius: '.2rem' } : {visibility: 'visible'}} className="ms-4 d-flex align-items-center hovercss">
                        <a href="/favorites">
                        <Star className='icons' color="white" />
                        </a>
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