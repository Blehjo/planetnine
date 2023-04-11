import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Component, Dispatch } from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard.component";
import PostsTab from "../PostsTab/PostsTab.component";
import { ChatsTab } from "../ChatsTab/ChatsTab.component";
import { PlanetsTab } from "../PlanetsTab/PlanetsTab.component";
import { RootState } from "../../store/store";

import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ConnectedProps, connect } from "react-redux";
import { PilotFetchSingleStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";


export type ProfileProps = ConnectedProps<typeof connector>;

export class Profile extends Component<ProfileProps> {
    
    componentDidMount() {
        const userId = 1;
        const { currentUser }: any = this.props.currentUser;
        const { pilot }: any = this.props.pilot;
        // this.props.getUserProfile(pilot.userId);
    }
    
    render() {
        return (
            <Row lg={2}>
                <Col style={{ marginBottom: '2rem' }}lg={4}>
                    <ProfileCard { ...this.props }/>
                </Col>
                <Col lg={8}>                
                <Tabs
                    defaultActiveKey="posts"
                    justify
                    className='mb-5'
                    variant='pills'
                    >
                    <Tab eventKey="posts" title="Posts">
                        <PostsTab { ...this.props } />
                    </Tab>
                    <Tab eventKey="chats" title="Chats">
                        <ChatsTab { ...this.props } />
                    </Tab>
                    <Tab eventKey="planets" title="Planets">
                        <PlanetsTab { ...this.props } />
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        );
    }
}

const mapToStateProps = (state: RootState) => {
    return { 
        userprofile: state.userprofile,
        currentUser: state.user,
        pilot: state.pilot
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart | PilotFetchSingleStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    getPilot: (userId: number) => dispatch(pilotFetchSingleStart(userId))
});

const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);