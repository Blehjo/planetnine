import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import { ProfileCard } from "../ProfileCard/ProfileCard.component";
import PostsTab from "../PostsTab/PostsTab.component";
import { ChatsTab } from "../ChatsTab/ChatsTab.component";
import { PlanetsTab } from "../PlanetsTab/PlanetsTab.component";
import { RootState } from "../../store/store";

import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { PilotFetchSingleStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { PostCreateStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { CommentFetchSingleStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { MoonsTab } from "../MoonsTab/MoonsTab.component";
import { MoonCreateStart, moonCreateStart } from "../../store/moon/moon.action";
import { PlanetCreateStart, PlanetFetchSingleStart, PlanetFetchUserPlanetsStart, planetCreateStart, planetFetchSingleStart, planetFetchUserPlanetsStart } from "../../store/planet/planet.action";
import { ChatFetchSingleStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";


export type ProfileProps = ConnectedProps<typeof connector>;

export class Profile extends Component<ProfileProps> {
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
                    <Tab eventKey="moons" title="Moons">
                        <MoonsTab { ...this.props } />
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
        pilot: state.pilot,
        posts: state.post,
        comments: state.comment,
        moons: state.moon,
        planets: state.planet,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart | PilotFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | ChatFetchUserChatsStart | ChatFetchSingleStart | CommentFetchSingleStart | FavoriteCreateStart | MoonCreateStart | PlanetCreateStart | PlanetFetchUserPlanetsStart | PlanetFetchSingleStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    getPilot: (userId: number) => dispatch(pilotFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: number | undefined) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile)),
    createPlanet: (planetMass: string, planetName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, imageLink: string, imageFile: File  ) => dispatch(planetCreateStart(planetMass, planetName, perihelion, aphelion, gravity, temperature, imageLink, imageFile)),
    createMoon: (moonMass: number, moonName: string, perihelion: number, aphelion: number, gravity: number, temperature: number, planetId: number | null, imageLink: string | null, imageFile: File  ) => dispatch(moonCreateStart(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile)),
    getComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    getPlanets: () => dispatch(planetFetchUserPlanetsStart()),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
});

const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);