import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Component, Dispatch } from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard.component";
import PostsTab from "../PostsTab/PostsTab.component";
import { ChatsTab } from "../ChatsTab/ChatsTab.component";
import { PlanetsTab } from "../PlanetsTab/PlanetsTab.component";
import { RootState } from "../../store/store";

import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ConnectedProps, connect } from "react-redux";

type ProfileProps = ConnectedProps<typeof connector>;

export class Profile extends Component<ProfileProps> {
    componentDidMount(): void {
        const { userId }: any = this.props.currentUser.currentUser;
        this.props.getUserProfile(userId);
    }

    render() {
        const { userprofile } = this.props;
        console.log("User Profile: ", userprofile);
        return (
            <Row lg={2}>
                <Col style={{ marginBottom: '2rem' }}lg={4}>
                    <ProfileCard {...userprofile}/>
                </Col>
                <Col lg={8}>                
                <Tabs
                    defaultActiveKey="posts"
                    justify
                    className='mb-5'
                    variant='pills'
                    >
                    <Tab eventKey="posts" title="Posts">
                        <PostsTab />
                    </Tab>
                    <Tab eventKey="chats" title="Chats">
                        <ChatsTab />
                    </Tab>
                    <Tab eventKey="planets" title="Planets">
                        <PlanetsTab />
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
        currentUser: state.user
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId))
});

const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);