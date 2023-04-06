import { Fragment, Component } from 'react';

export class ChatsTab extends Component {
    render() {

        return (
            <Fragment>
                {/* {chats?.length > 0 ? chats?.map(({ chatId, title }) => (
                    <Card key={chatId} style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }} className="bg-dark">
                        <Card.Body >
                            <Card.Title style={{ cursor: 'pointer' }} id={chatId} onClick={(event) => navigate(`/chat/${event.target.id}`)} >{title}</Card.Title>
                        </Card.Body>
                    </Card>
                )) : (
                    <Card style={{ color: 'white', textAlign: 'center' }}className="bg-dark">
                        <Card.Title>"Stay tuned. Currently no chats..."</Card.Title>
                    </Card>
                )} */}
            </Fragment>
        );
    }
}