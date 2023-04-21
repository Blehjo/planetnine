import { Component, Dispatch, Fragment } from "react"
import { FixedMoonContainer, MoonPanelContainer } from "./Moon.styles"
import NotificationComponent from "../Notification/Notification.component"
import { RootState } from "../../store/store";
import { MoonFetchAllStart, moonFetchAllStart } from "../../store/moon/moon.action";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PostContainer } from "../Post/Post.styles";
import { Badge, Card } from "react-bootstrap";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen } from "react-bootstrap-icons";

type MoonProps = ConnectedProps<typeof connector>;

export class Moon extends Component<MoonProps> {
    constructor(props: MoonProps) {
        super(props);
    }
    
    componentDidMount(): void {
        this.props.getMoons();
    }
    render() {
        const { moons } = this.props;
        return (
            <Fragment>
                <FixedMoonContainer className="fixed-top">
                    <MoonPanelContainer>
                        <h1>Moons</h1>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry>
                            {moons.moons?.map(({ moonName, perihelion, aphelion, moonMass, temperature, gravity }, index) => {
                                return <PostContainer key={index}>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={"https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                        <Card.ImgOverlay>
                                            <BadgeContainer>
                                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15}/></Badge>
                                            </BadgeContainer>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{moonName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PostContainer>
                            })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </MoonPanelContainer>
                </FixedMoonContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        moons: state.moon
    }
};

const mapDispatchToProps = (dispatch: Dispatch<MoonFetchAllStart>) => ({
    getMoons: () => dispatch(moonFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Moon);