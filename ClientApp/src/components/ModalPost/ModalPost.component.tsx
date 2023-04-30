import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { Postcard } from 'react-bootstrap-icons';

import { BoxPostContainer, ModalPostContainer } from "./ModalPost.styles";
import { RootState } from "../../store/store";
import { PostCreateStart, postCreateStart } from "../../store/post/post.action";

interface IDefaultFormFields {
    show: boolean;
    postValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
  };

type ModalPostProps = ConnectedProps<typeof connector>;

export class ModalPost extends Component<ModalPostProps, IDefaultFormFields> {
    constructor(props: ModalPostProps) {
        super(props);

        this.state = {
            show: false,
            postValue: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }

    handleClose() {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { postValue, mediaLink, imageFile } = this.state;
        try {
            this.props.createPost(postValue, mediaLink, imageFile);
        } catch (error) {
            if (error) {
                alert('Try again, please');
            } 
        }
        this.handleClose();
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

    render() {
        const { show, postValue } = this.state;
        return(
            <Fragment>
                <BoxPostContainer>
                    <Postcard className="bg-info rounded modalIcon" onClick={() => this.handleClick()}/>
                </BoxPostContainer>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <ModalPostContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Data log</Modal.Title>
                    </Modal.Header>
                    <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formPostValue">
                        <Form.Control
                            onChange={this.handleChange}
                            name="postValue"
                            value={postValue}
                            type="postValue"
                            as="input"
                            placeholder="Post"
                            autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="formFile"
                        >
                        <Form.Control 
                            as="input"
                            name="mediaLink"
                            onChange={this.showPreview}
                            accept="image/*"
                            type="file" 
                            placeholder="Media"
                        />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Log
                    </button>
                    </Modal.Footer>
                    </Form>
                    </ModalPostContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    posts: state.post
});

const mapDispatchToProps = (dispatch: Dispatch<PostCreateStart>) => ({
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalPost);