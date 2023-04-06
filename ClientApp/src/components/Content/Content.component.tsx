import axios from "axios";
import { Component, Fragment } from "react";
import { IProfile } from "../../routes/Profiles/Profiles.route";
import { IPost } from "../../routes/Posts/Posts.route";
import { IChat } from "../../routes/Chats/Chats.route";
import { Row } from "react-bootstrap";
import { Spinner } from "reactstrap";

interface IState {
    profiles?: IProfile[];
    posts?: IPost[];
    chats?: IChat[];
    isLoading: boolean;
    error: string;
}

export class Content extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);   
        this.state = {
            profiles: [],
            posts: [],
            chats: [],
            isLoading: false,
            error: ""
        }
    }

    getGifs() {
        this.setState({ isLoading: true })
        axios.get("https://randomuser.me/api/?results=5")
        .then(response => response.data.results)
        .then(profiles => {
        this.setState({
            profiles,
            isLoading: false
        });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount(): void {
        this.getGifs();
    }

    render() {
        const { profiles, posts, chats, isLoading } = this.state;
        return (
            <Fragment>
                {
                    isLoading ? 
                    <div style={{ fontSize: '20rem', textAlign: 'center' }}>
                        <Spinner/>
                    </div> :
                    <Row>
                        <h1>Posts</h1>
                    </Row>
                }
            </Fragment>
        )
    }
}