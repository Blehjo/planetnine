import { Component } from "react";
import { Card, Modal, Row, Col, Form, Button } from "react-bootstrap";

export class PostsTab extends Component {

    render() {
        return (
            <>
        <Row style={{ marginBottom: '2rem' }} xs={1} >
                <Col>
                    <Card style={{ color: 'white', textAlign: 'center' }} className='bg-dark'>
                        <Card.Body>
                            {/* <Card.Title style={{ cursor: 'pointer' }} onClick={handlePostForm}>Create a post</Card.Title> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        <Row xs={3}>
        {/* {posts?.length > 0 ? posts?.map(({ postId, mediaLink, postValue, dateCreated, imageSource }) => (
            <Col>
            <Card key={postId} style={{ color: 'white', marginBottom: '1rem', objectFit: 'cover', height: '30rem' }} className="bg-dark">
                <Card.Img onClick={() => navigate(`/posts/${postId}`)} style={{ cursor: 'pointer', height: '20rem', width: 'auto', objectFit: 'cover' }} src={imageSource}/>
                <Card.Body>
                    <Card.Title>{postValue}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    {utcConverter(dateCreated)}
                </Card.Footer>
                <Card.Footer>
                    <Card.Text style={{ cursor: 'pointer' }} id={postId} onClick={handleShow}>Comment</Card.Text>
                </Card.Footer>
            </Card>
            </Col>
        )) : 
            <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center' }} className="bg-dark">
                    <Card.Title>"Stay tuned. Currently no posts..."</Card.Title>
                </Card>
            </Col>
        }
            <Modal show={show} onHide={handleClose}>
                <Card className="bg-light" key={id}>
                    <div className='card-container'>
                    <Card.Link className='card-info' href={`posts/${postId}`}>
                        {imageSource && <Card.Img style={{ objectFit:'cover'}} variant="top" src={imageSource} />}
                    </Card.Link>
                    </div>
                    <Card.Body >
                        <Card.Subtitle >{postValue}</Card.Subtitle>
                        <Card.Text>{`Posted ${utcConverter(dateCreated)}`}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <CommentInfo postId={postId} />
                        <Form id={postId} onSubmit={postComment}>
                        <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={2}>
                            <Col xs={9} >
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={handleChange} placeholder=" Write your comment here" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formMedia">
                                            <Form.Control onChange={showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3}>
                                <Button id={postId} style={{ width: '100%', height: '100%'}} variant="light" type="submit">
                                    Post
                                </Button>
                            </Col>                
                        </Row>
                        </Form>
                    </Card.Footer>
                </Card>
            </Modal>
            <Modal show={postForm} onHide={handlePostForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ marginTop: '-1rem' }}>
                    <PostForm/>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    Share your masterpiece!
                </Modal.Footer>
            </Modal> */}
        </Row>
        </>
        );
    }
}

export default PostsTab;