import { Component, Fragment } from "react"
import { SingleChatContainer } from "./SingleChat.styles"
import { Comment } from "../../components/Comment/Comment.component"
import { Card } from "react-bootstrap"

export class SingleChat extends Component {
    render() {
        return (
            <Fragment>
                <SingleChatContainer>
                    <Card className="bg-dark">
                        <Card.Header>Chat</Card.Header>
                        <Card.Body>
                            <Card.Img src=""/>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </SingleChatContainer>
                <Comment/>
            </Fragment>
        )
    }
}