import { Component, Dispatch, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Badge, Card } from "react-bootstrap";
import { Envelope, Globe, Person, Rocket } from 'react-bootstrap-icons';

import { BadgeContainer, PilotContainer } from "./Pilots.styles";
import { RootState } from "../../store/store";
import { PilotFetchAllStart, PilotFetchSingleStart, pilotFetchAllStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { MessageCreateStart, messageCreateStart } from "../../store/message/message.action";

type PilotProps = ConnectedProps<typeof connector>;

export class Pilots extends Component<PilotProps> {
    constructor(props: PilotProps) {
        super(props);
    }

    handleClick(userId: number) {
        this.props.getPilot(userId);
    }

    handleSendMessage(messageValue: string) {
        this.props.sendMessage(messageValue);
    }

    componentDidMount(): void {
        this.props.getAllPilots();
    }

    render() {
        const { pilots } = this.props;
        return (
            <Fragment>
                <h1>Pilots</h1>
                <p>Take a look at your fellow Pilots</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {pilots.pilots?.map(({ username, about, imageLink, imageSource, planets, followers, userId }, index) => {
                        return <PilotContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink ? imageSource : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"}/>
                                <Card.ImgOverlay>
                                    <BadgeContainer>
                                    <a href={`/profile/${userId}`}>
                                        <Badge style={{ color: 'black' }} bg="light"><Person style={{ cursor: 'pointer' }} size={15}/></Badge>
                                    </a>
                                    </BadgeContainer>
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light"><Envelope style={{ cursor: 'pointer' }} onClick={() => this.handleSendMessage(username)} size={15}/></Badge>
                                    </BadgeContainer>
                                    {
                                        planets && 
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Globe size={15}/>
                                            {` ${planets}`}
                                            </Badge>
                                        </BadgeContainer> 
                                    }
                                    {
                                        followers && 
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Rocket size={15}/>
                                            {` ${followers}`}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{username}</Card.Text>
                                    <Card.Text>{about}</Card.Text>
                                </Card.Body>
                            </Card>
                        </PilotContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { pilots: state.pilot };
};

const mapDispatchToProps = (dispatch: Dispatch<PilotFetchAllStart | PilotFetchSingleStart | MessageCreateStart>) => ({
	getAllPilots: () => dispatch(pilotFetchAllStart()),
    getPilot: (userId: number ) => dispatch(pilotFetchSingleStart(userId)),
    sendMessage: (messageValue: string) => dispatch(messageCreateStart(messageValue))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pilots);