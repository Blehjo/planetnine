import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { User } from "../../store/user/user.types";
import { Planet } from "../../store/planet/planet.types";
import { Moon } from "../../store/moon/moon.types";
import { ArrowBarRight, Globe, Moon as MoonBadge, PersonBadge } from "react-bootstrap-icons";

interface ISearchProps {
    users: User[];
    planets: Planet[];
    moons: Moon[];
}

export class CardList extends Component<ISearchProps> {
    constructor(props: ISearchProps) {
        super(props);
    }

    render() {
        const { users, planets, moons } = this.props;
        return (
            <div className='card-list'>
                {users.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Users
                </div>}
                {users.slice(0,5).map(user => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={user.userId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{user.username}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${user.userId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <PersonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {planets.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Planets
                </div>}
                {planets.slice(0,5).map(planet => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={planet.planetId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{planet.planetName}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/singleplanet/${planet.planetId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Globe size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {moons.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Moons
                </div>}
                {moons.slice(0,5).map(moon => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={moon.moonId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{moon.moonName}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/singlemoon/${moon.moonId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <MoonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
        )
    }
};