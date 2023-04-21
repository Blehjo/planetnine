import { Component, Dispatch, Fragment } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { HeaderContainer, MarginContainer, PilotContainer, PilotDashContainer } from "./PilotDash.styles";
import { RootState } from "../../store/store";
import { PilotFetchAllStart, pilotFetchAllStart } from "../../store/pilot/pilot.action";
import { ConnectedProps, connect } from "react-redux";

type PilotDashProps = ConnectedProps<typeof connector>;

export class PilotDash extends Component<PilotDashProps> {

    componentDidMount(): void {
        this.props.getPilots();
    }

    render() {
        const { pilots } = this.props;
        return(
            <PilotDashContainer>
                <HeaderContainer>
                    <div>
                        Pilots
                    </div>
                </HeaderContainer>
                <MarginContainer>
                {
                    pilots.pilots?.map(({ userId, username, imageSource, imageLink }) => {
                        return (
                            <PilotContainer key={userId}>
                            <Row xs={2}>
                                <Col xs={2}>
                                    <Image style={{ borderRadius: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={imageLink ? imageSource : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                </Col>
                                <Col xs={8}>
                                    {username}
                                </Col>
                            </Row>        
                            </PilotContainer>
                        )
                    })
                }
                </MarginContainer>
            </PilotDashContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        pilots: state.pilot
    }
};

const mapDispatchToProps = (dispatch: Dispatch<PilotFetchAllStart>) => ({
    getPilots: () => dispatch(pilotFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PilotDash);