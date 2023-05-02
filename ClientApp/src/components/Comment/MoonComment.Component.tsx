import { ChangeEvent, Component, Dispatch } from "react";
import { CardContainer, CommentBarContainer, CommentContainer, FormContainer, InnerComments } from "./Comment.styles";
import { ConnectedProps, connect } from "react-redux";

import { RootState } from "../../store/store";

import { Card, Col, Form, Row } from "react-bootstrap";
import { TextContainer } from "../Post/Post.styles";
import { utcConverter } from "../../utils/date/date.utils";

import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from "../../store/mooncomment/mooncomment.action";
import { Moon } from "../../store/moon/moon.types";

interface CommentQuery extends CommentProps {
    queryId: number;
    moon: Moon;
}

type CommentProps = ConnectedProps<typeof connector>;

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class MoonComment extends Component<CommentQuery, IDefaultFormFields> {
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
        const { moons } = this.props;
        const moonId = moons.singleMoon?.moonId ? moons.singleMoon?.moonId : 0
        this.props.createComment(commentValue, imageFile, moonId);
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
        const { moons, mooncomments } = this.props;
        return(
            <CommentBarContainer>
                <CommentContainer>
                    <h1 className="notifications">Comments</h1>
                {
                    mooncomments.mooncomments?.map(({ moonCommentId, commentValue, mediaLink, dateCreated }) => {
                        return <CardContainer>
                            <Card className="bg-dark" key={moonCommentId}>
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
                <Form style={{ margin: 'auto' }} key={moons?.moonId} onSubmit={this.postComment}>
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
        moons: state.moon,
        mooncomments: state.mooncomment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MoonCommentCreateStart | MoonCommentFetchSingleStart>) => ({
    getComments: (moonId: number) => dispatch(moonCommentFetchSingleStart(moonId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(moonCommentCreateStart(commentValue, imageFile, postId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MoonComment);