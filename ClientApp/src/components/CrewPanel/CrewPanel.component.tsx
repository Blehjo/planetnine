import { Component, Dispatch } from "react";
import { IconContainer, SidebarContainer } from "../Notification/Notifications.styles";
import { RootState } from "../../store/store";
import { ChatFetchUserChatsStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ConnectedProps, connect } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import { ArtificialIntelligenceFetchSingleStart, ArtificialIntelligenceFetchUsersStart, artificialIntelligenceFetchSingleStart, artificialIntelligenceFetchUsersFailed, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { CrewContainer } from "./CrewPanel.styles";
import { ArtificialIntelligenceState } from "../../store/artificialintelligence/artificialintelligence.reducer";
import { ChatState } from "../../store/chat/chat.reducer";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";


type CrewPanelProps = ConnectedProps<typeof connector>;

export class CrewPanel extends Component<CrewPanelProps> {
    componentDidMount(): void {
        this.props.getCrewMembers();
    }

    componentDidUpdate(prevProps: Readonly<{ artificialIntelligences: ArtificialIntelligenceState; chats: ChatState; chatComments: ChatCommentState; } & { getCrewMembers: () => void; getSingleCrewMember: (artificialIntelligenceId: number) => void; getChats: () => void; getChatcomments: (artificialIntelligenceId: number) => void; }>, prevState: Readonly<{}>, snapshot?: any): void {
        const { artificialIntelligences, getCrewMembers } = this.props;
        if (artificialIntelligences.userArtificialIntelligences?.length !== prevProps.artificialIntelligences.userArtificialIntelligences?.length) {
            getCrewMembers();
        }
    }

    render() {
        const { artificialIntelligences } = this.props;
        return (
            <SidebarContainer >
                <CrewContainer>
                    <h1 className="notifications">Crew </h1>
                    <IconContainer>
                    <Row xs={4}>
                        {
                            artificialIntelligences.userArtificialIntelligences?.map(({ name, role, imageLink, imageSource }) => {
                                return (
                                    <Col key={name}>
                                        <Image style={{ borderRadius: '.2rem', objectFit: 'cover', width: '2rem', height: '2rem' }} fluid src={imageLink ? imageSource : ""} />
                                    </Col>
                            )})
                        }
                    </Row>
                    </IconContainer>
                </CrewContainer>
            </SidebarContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        artificialIntelligences: state.artificialIntelligence,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceFetchUsersStart | ArtificialIntelligenceFetchSingleStart | ChatFetchUserChatsStart | ChatCommentFetchSingleStart >) => ({
	getCrewMembers: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getSingleCrewMember: (artificialIntelligenceId: number) => dispatch(artificialIntelligenceFetchSingleStart(artificialIntelligenceId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChatcomments: (artificialIntelligenceId: number) => dispatch(chatcommentFetchSingleStart(artificialIntelligenceId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CrewPanel);