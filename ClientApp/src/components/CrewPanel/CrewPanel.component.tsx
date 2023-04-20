import { Component, Dispatch } from "react";
import { IconContainer, NotificationsContainer, SidebarContainer } from "../Notification/Notifications.styles";
import { RootState } from "../../store/store";
import { ChatFetchSingleStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Image, Row } from "react-bootstrap";
import { ArtificialIntelligenceFetchSingleStart, ArtificialIntelligenceFetchUsersStart, artificialIntelligenceFetchSingleStart, artificialIntelligenceFetchUsersFailed, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { Robot } from "react-bootstrap-icons";


type CrewPanelProps = ConnectedProps<typeof connector>;

export class CrewPanel extends Component<CrewPanelProps> {
    componentDidMount(): void {
        this.props.getCrewMembers();
    }

    render() {
        const { chats, artificialIntelligences } = this.props;
        return (
            <SidebarContainer className="fixed-top" >
                <NotificationsContainer>
                    <h1>Crew Members</h1>
                    <IconContainer>
                    <Row xs={4}>
                        {
                            artificialIntelligences.userArtificialIntelligences?.map(({ name, role, imageLink, imageSource }) => {
                                return (
                                    <Col>
                                        <Image style={{ borderRadius: '1rem' }} fluid src={imageLink ? imageSource : ""} />
                                    </Col>
                            )})
                        }
                    </Row>
                    </IconContainer>
                </NotificationsContainer>
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