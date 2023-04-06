import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Component } from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard.component";
import PostsTab from "../PostsTab/PostsTab.component";
import { ChatsTab } from "../ChatsTab/ChatsTab.component";
import { PlanetsTab } from "../PlanetsTab/PlanetsTab.component";
 
export class Profile extends Component {
    render() {

        return (
            <Row lg={2}>
                <Col style={{ marginBottom: '2rem' }}lg={4}>
                    <ProfileCard />
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