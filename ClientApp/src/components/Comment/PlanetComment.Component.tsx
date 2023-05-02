import { ChangeEvent, Component, Dispatch } from "react";
import { CardContainer, CommentBarContainer, CommentContainer, FormContainer, InnerComments } from "./Comment.styles";
import { ConnectedProps, connect } from "react-redux";

import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { RootState } from "../../store/store";

import { Card, Col, Form, Row } from "react-bootstrap";
import { TextContainer } from "../Post/Post.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { Planet } from "../../store/planet/planet.types";
import { PlanetCommentFetchSingleStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";

interface CommentQuery extends CommentProps {
    queryId: number;
    planet: Planet;
}

type CommentProps = ConnectedProps<typeof connector>;

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class PlanetComment extends Component<CommentQuery, IDefaultFormFields> {
    constructor(props: CommentQuery) {
        super(props);
        this.state = {
            commentValue: "",
            imageSource: "",
            imageFile: null,
            show: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { planets } = this.props;
        const planetId = planets.singlePlanet?.planetId ? planets.singlePlanet?.planetId : 0
        this.props.createComment(commentValue, imageFile, planetId);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const { files } = event.target;
            const selectedFiles = files as FileList;
            let imageFile = selectedFiles[0];
            const reader = new FileReader();
            reader.onload = x => {
            this.setState({
                ...this.state,
                imageFile,
                imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
            this.setState({
                ...this.state,
                imageFile: null,
                imageSource: null
            });
        }
    }

    componentDidMount(): void {
        const { queryId } = this.props;
        this.props.getComments(queryId);
    }

    render() {
        const { planets, planetcomments } = this.props;
        return(
            <CommentBarContainer>
                <CommentContainer>
                    <h1 className="notifications">Comments</h1>
                {
                    planetcomments.comments?.map(({ planetCommentId, commentValue, mediaLink, dateCreated }) => {
                        return <CardContainer>
                            <Card className="bg-dark" key={planetCommentId}>
                                <TextContainer>
                                    <Card.Text>{commentValue}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </TextContainer>
                            </Card>
                        </CardContainer>
                    })
                }
                </CommentContainer>
                <FormContainer>
                <Form style={{ margin: 'auto' }} key={planets?.planetId} onSubmit={this.postComment}>
                    <Row style={{ margin: '.5rem', justifyContent: 'center' }} xs={1}>
                        <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <button style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                                        Post
                                    </button>
                                </Col>                
                            </Row>
                        </Col>
                    </Row>
                </Form>
                </FormContainer>
            </CommentBarContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        planets: state.planet,
        planetcomments: state.planetcomment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CommentFetchSingleStart | CommentCreateStart | PlanetCommentFetchSingleStart>) => ({
    getComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanetComment);