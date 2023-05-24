import { Component } from "react";
import { Card } from "react-bootstrap";
import { User } from "../../store/user/user.types";
import { Planet } from "../../store/planet/planet.types";
import { Moon } from "../../store/moon/moon.types";

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
                {/* { users.length == 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Users
                </div>} */}
                {users.map(user => (
                    <Card style={{ color: "black", margin: ".2rem" }} key={user.userId} >
                        <Card.Body>{user.username}</Card.Body>
                    </Card>
                ))}
                { planets.length == 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Planets
                </div>}
                {planets.map(planet => (
                    <Card style={{ color: "black", margin: ".2rem" }} key={planet.planetId} >
                        <Card.Body>{planet.planetName}</Card.Body>
                    </Card>
                ))}
                {moons.length == 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Moons
                </div>}
                {moons.map(moon => (
                    <Card style={{ color: "black", margin: ".2rem" }} key={moon.moonId} >
                        <Card.Body>{moon.moonName}</Card.Body>
                    </Card>
                ))}
            </div>
        )
    }
};