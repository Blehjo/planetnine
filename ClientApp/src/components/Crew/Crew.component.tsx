import { Component, Dispatch } from "react";
import { CardHolder, CrewContainer, FontContainer } from "./Crew.styles";
import { ConnectedProps, connect } from "react-redux";
import { ArtificialIntelligenceCreateStart, ArtificialIntelligenceFetchSingleStart, ArtificialIntelligenceFetchUsersStart, artificialIntelligenceCreateStart, artificialIntelligenceFetchSingleStart, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { RootState } from "../../store/store";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Card } from "react-bootstrap";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import { HeaderContainer } from "../PilotDash/PilotDash.styles";

type CrewProps = ConnectedProps<typeof connector>;

export class Crew extends Component<CrewProps> {
    constructor(props: CrewProps) {
        super(props);

    }

    componentDidMount(): void {
        this.props.getAllCrew();
    }
    render() {
        const { artificialIntelligence } = this.props;
        return(
            <CrewContainer>
                <HeaderContainer>
                <div>Crew</div>
                </HeaderContainer>
                <CardHolder>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>
                    {artificialIntelligence.userArtificialIntelligences?.map(({ name, role, imageSource, imageLink }, index) => {
                        return <FontContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                <Card.ImgOverlay>
                                    <ArrowsFullscreen style={{ cursor: 'pointer' }} size={15}/>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </FontContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
                </CardHolder>
            </CrewContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { artificialIntelligence: state.artificialIntelligence };
};

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceFetchUsersStart | ArtificialIntelligenceFetchSingleStart | ArtificialIntelligenceCreateStart>) => ({
	getAllCrew: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getCrew: (userId: number ) => dispatch(artificialIntelligenceFetchSingleStart(userId)),
    createCrewMember: (name: string, role: string, imageFile: File) => dispatch(artificialIntelligenceCreateStart(name, role, imageFile))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Crew);