import { Component, Fragment } from "react"
import { SinglePostContainer } from "./SinglePost.styles"
import { Comment } from "../../components/Comment/Comment.component"
import { Card } from "react-bootstrap"

export class SinglePost extends Component {
    render() {
        return (
            <Fragment>
                <SinglePostContainer>
                    <Card className="bg-dark">
                        <Card.Header>Post</Card.Header>
                        <Card.Body>
                            <Card.Img src=""/>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </SinglePostContainer>
                <Comment/>
            </Fragment>
        )
}
}