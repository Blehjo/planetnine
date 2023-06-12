import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import ReactLoading from "react-loading";

import { ProfileCard } from "../ProfileCard/ProfileCard.component";
import PostsTab from "../PostsTab/PostsTab.component";
import { ChatsTab } from "../ChatsTab/ChatsTab.component";
import { PlanetsTab } from "../PlanetsTab/PlanetsTab.component";
import { RootState } from "../../store/store";

import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { PilotFetchSingleStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postDeleteStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { MoonsTab } from "../MoonsTab/MoonsTab.component";
import { MoonCreateStart, MoonDeleteStart, MoonFetchSingleStart, MoonFetchUserMoonsStart, moonCreateStart, moonDeleteStart, moonFetchSingleStart, moonFetchUserMoonsStart } from "../../store/moon/moon.action";
import { PlanetCreateStart, PlanetDeleteStart, PlanetFetchSingleStart, PlanetFetchUserPlanetsStart, planetCreateStart, planetDeleteStart, planetFetchSingleStart, planetFetchUserPlanetsStart } from "../../store/planet/planet.action";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchUserChatsStart, chatDeleteStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";
import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from "../../store/mooncomment/mooncomment.action";

export type ProfileProps = ConnectedProps<typeof connector>;

export class Profile extends Component<ProfileProps> {
    render() {
        const { posts, chats, planets, moons, userprofile } = this.props;
        return (
            <Row lg={2}>
                {
                    userprofile.isLoading  ? 
                    <div style={{ width: '50%', margin: 'auto' }}>
                        <ReactLoading type="bars" color="lightgrey" height={667} width={375}/>
                    </div> :
                    <>
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
                    </>
                }
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
        mooncomments: state.mooncomment,
        planetcomments: state.planetcomment,
        moons: state.moon,
        planets: state.planet,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart | PilotFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | MoonCreateStart | PlanetCreateStart | PlanetDeleteStart | PlanetFetchUserPlanetsStart | PlanetFetchSingleStart | MoonFetchUserMoonsStart | PlanetCommentFetchSingleStart | MoonCommentFetchSingleStart | MoonFetchSingleStart | PlanetCommentCreateStart | MoonCommentCreateStart | MoonDeleteStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    getPilot: (userId: number) => dispatch(pilotFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: number | undefined) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile)),
    deletePost: (postId: number) => dispatch(postDeleteStart(postId)),
    createPlanet: (planetMass: string, planetName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, imageLink: string, imageFile: File  ) => dispatch(planetCreateStart(planetMass, planetName, perihelion, aphelion, gravity, temperature, imageLink, imageFile)),
    createMoon: (moonMass: string, moonName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, planetId: number | null, imageLink: string, imageFile: File  ) => dispatch(moonCreateStart(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile)),
    createPlanetComment: (commentValue: string, imageFile: File, planetId: number) => dispatch(planetcommentCreateStart(commentValue, imageFile, planetId)),
    createMoonComment: (commentValue: string, imageFile: File, postId: number) => dispatch(moonCommentCreateStart(commentValue, imageFile, postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getPlanetComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    getMoonComments: (moonId: number) => dispatch(moonCommentFetchSingleStart(moonId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    getPlanets: () => dispatch(planetFetchUserPlanetsStart()),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    deletePlanet: (planetId: number) => dispatch(planetDeleteStart(planetId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    deleteChat: (chatId: number) => dispatch(chatDeleteStart(chatId)),
    getMoons: () => dispatch(moonFetchUserMoonsStart()),
    getMoon: (moonId: number) => dispatch(moonFetchSingleStart(moonId)),
    deleteMoon: (moonId: number) => dispatch(moonDeleteStart(moonId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);