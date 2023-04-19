import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import { ArtificialIntelligenceCreateStart, ArtificialIntelligenceFetchSingleStart, ArtificialIntelligenceFetchUsersStart, artificialIntelligenceCreateStart, artificialIntelligenceFetchSingleStart, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { ConnectedProps, connect } from "react-redux";
import { ModalPostContainer } from "../../components/ModalPost/ModalPost.styles";

type ArtificialIntelligenceProps = ConnectedProps<typeof connector>;

interface IDefaultForms {
    name: string;
    role: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class ArtificialIntelligence extends Component<ArtificialIntelligenceProps, IDefaultForms> {
    constructor(props: ArtificialIntelligenceProps) {
        super(props);
        this.state = {
            name: "",
            role: "",
            imageSource: "",
            imageFile: null,
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        const { name, role, imageFile } = this.state;
        try {
            this.props.createCrewMember(name, role, imageFile);
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

    componentDidMount(): void {
        this.props.getAllCrew();
    }

    render() {
        const { artificialIntelligence } = this.props;
        const { show, name, role } = this.state;
        return (
            <Fragment>
            <Row xs={2}>
                <Col xs={2}>
                    <h1>Crew</h1>
                </Col>
                <Col>
                    <Plus size={40} style={{ cursor: 'pointer' }} onClick={this.handleClick}/>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Modal show={show} onHide={this.handleClose}>
                <ModalPostContainer>
                <Modal.Header closeButton>
                <Modal.Title>Data log</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        value={name}
                        type="name"
                        as="input"
                        placeholder="Crew member name"
                        autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                    <Form.Control
                        onChange={this.handleChange}
                        name="role"
                        value={role}
                        type="role"
                        as="input"
                        placeholder="Crew member role"
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
                <Button variant="secondary" onClick={() => this.handleClose()}>
                    Close
                </Button>
                <Button type="submit" variant="primary">
                    Log
                </Button>
                </Modal.Footer>
                </Form>
                </ModalPostContainer>
            </Modal>
            </Fragment>
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

export default connector(ArtificialIntelligence);