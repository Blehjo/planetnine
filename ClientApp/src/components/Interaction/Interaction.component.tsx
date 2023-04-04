import { Component, Fragment } from "react"
// import { withRouter } from "react-router";
import { IProfile } from "../../routes/Profiles/Profiles.component"
import { IPost } from "../../routes/Posts/Posts.component"
import { IChat } from "../../routes/Chats/Chats.component"

interface IState {
    content: IProfile | IPost | IChat;
    // match: 
}

class Interaction extends Component {
    getContent() {
        this.setState({

        })
    }

    componentDidMount() {
        const id = this.props;
        // this.fetchData(id);
        console.log(id)
    }

    // fetchData(id: number): void {
    //     console.log(id);
    // };

    render() {
        return (
            <Fragment>

            </Fragment>
        )
    }
}

// export default withRouter(Interaction);