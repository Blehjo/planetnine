import { useEffect } from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { selectSinglePilot } from "../../store/pilot/pilot.selector";

import { SingleProfileCard } from "../../components/ProfileCard/SingleProfileCard.component";
import { Pilot } from "../../store/pilot/pilot.types";
import { Post } from "../../store/post/post.types";
import { Chat } from "../../store/chat/chat.types";
import { Planet } from "../../store/planet/planet.types";
import { Moon } from "../../store/moon/moon.types";
import { postFetchUserPostsStart } from "../../store/post/post.action";
import SinglePostsTab from "../../components/PostsTab/SinglePostsTab.component";
import SingleChatsTab from "../../components/ChatsTab/SingleChatsTab.component";
import SinglePlanetsTab from "../../components/PlanetsTab/SinglePlanetsTab.component";
import SingleMoonsTab from "../../components/MoonsTab/SingleMoonsTab.component";

const defaultFormFields = {
    chatValue: "",
    imageSource: "",
    imageFile: null,
    show: false
}

export interface SingleProfile {
    profile?: Pilot;
    posts?: Post[];
    chats?: Chat[];
    planets?: Planet[];
    moons?: Moon[];
}

export function SingleProfile() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const queryId = parseInt(id!);
    const profile = useSelector(selectSinglePilot);

    useEffect(() => {
        dispatch(pilotFetchSingleStart(queryId));
        dispatch(postFetchUserPostsStart(queryId));
    }, []);

    return (
        <Row lg={2}>
            <Col style={{ marginBottom: '2rem' }}lg={4}>
                <SingleProfileCard profile={profile!}/>
            </Col>
            <Col lg={8}>                
            <Tabs
                defaultActiveKey="posts"
                justify
                className='mb-5'
                variant='pills'
                >
                <Tab eventKey="posts" title="Posts">
                    <SinglePostsTab userId={queryId} />
                </Tab>
                <Tab eventKey="chats" title="Chats">
                    <SingleChatsTab userId={queryId} />
                </Tab>
                <Tab eventKey="planets" title="Planets">
                    <SinglePlanetsTab userId={queryId} />
                </Tab>
                <Tab eventKey="moons" title="Moons">
                    <SingleMoonsTab userId={queryId} />
                </Tab>
            </Tabs>
            </Col>
        </Row>
    );
}