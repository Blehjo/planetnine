import { Component, Fragment } from 'react';
import { Card, Row, Col, Modal, Form, Button } from 'react-bootstrap';
const defaultFormFields = {
    groupName: '',
    description: '',
    mediaLink: '', 
    imageSource: null,
    imageFile: null
}

export class PlanetsTab extends Component {
    render() {

        return (
            <Fragment>
            <Row style={{ marginBottom: '2rem' }} xs={1} >
                <Col>
                    <Card style={{ color: 'white', textAlign: 'center' }} className='bg-dark'>
                        <Card.Body>
                            {/* <Card.Title style={{ cursor: 'pointer' }} onClick={handleShowCreateGroup}>Create a community</Card.Title> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* {communities?.length > 0 ? Array.from(communities)?.map(({ communityId, groupName, description, dateCreated, mediaLink, imageSource }) => (
                <Card.Link key={communityId} style={{ textDecoration: 'none', color: 'black', margin: '1rem' }} href={`/community/${communityId}`}>
                    <Row>
                        <Col key='img' xl={4}>
                            <Card.Img height='200' style={{ objectFit:'cover', borderRadius: '.5rem' }} src={imageSource} />
                        </Col>
                        <Col xl={8} key={communityId}>
                            <Card.Header>{groupName}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                <Card.Text>{`Established ${utcConverter(dateCreated)}`}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card.Link>
            )) : (
                <Card key='excuse' style={{ color: 'white', textAlign: 'center' }}className="bg-dark">
                    <Card.Title>"Stay tuned. Currently no communities..."</Card.Title>
                </Card>
            )} */}
            {/* <Modal show={showCreateGroup} onHide={handleShowCreateGroup}>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a community</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Control style={{ height: '.5rem' }} onChange={handleChange} name="groupName" value={groupName} as="textarea" type="groupname" placeholder="Community name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Control style={{ height: '.5rem' }} onChange={handleChange} name="description" value={description} as="textarea" type="description" placeholder="Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMedia">
                                <Form.Control onChange={showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" as="input" type="submit" value="Close" onClick={handleShowCreateGroup}/>
                            <Button variant="light" as="input" type="submit" value="Add Community" />
                        </Modal.Footer>
                    </Form>
                </Modal> */}
        </Fragment>
        );
    }
}