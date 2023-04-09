import { ConnectedProps, connect } from "react-redux";
import { Component, Fragment, ChangeEvent, Dispatch } from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';
import { Badge, Card } from "react-bootstrap";

import { ChatContainer } from "./Chat.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { RootState } from "../../store/store";
import { ChatFetchAllStart, chatFetchAllStart } from "../../store/chat/chat.action";

type ChatProps = ConnectedProps<typeof connector>;

export class ChatComponent extends Component<ChatProps> {

    handleClick(event:  ChangeEvent<HTMLInputElement>) {
        const { id } = event.target;
    }

    componentDidMount(): void {
        this.props.getAllChats();
    }
    render() {
        const { chats } = this.props;
        return (
            <Fragment>
                <h1>Chat Manifests</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.chats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }, index) => {
                    return <ChatContainer>
                            <Card className="bg-dark" key={index}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><Person size={15}/></Badge>
                                </BadgeContainer>
                                {
                                    chatComments && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${chatComments.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    favorites && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${favorites.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { chats: state.chat };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChatComponent);