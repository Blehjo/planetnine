import { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";

import { CardList } from "./CardList.component";
import { SearchBox } from "./SearchBox.component";

import { Moon } from "../../store/moon/moon.types";
import { Planet } from "../../store/planet/planet.types";
import { User } from "../../store/user/user.types";

type DefaultProps = {
    users: User[],
    planets: Planet[],
    moons: Moon[],
    searchField: string,
    show: boolean
}
export class Searchbar extends Component<{}, DefaultProps> {
    constructor(props: DefaultProps) {
        super(props);

        this.state = {
            users: [],
            planets: [],
            moons: [],
            searchField: '',
            show: false
        };
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    componentDidMount(): void {
        fetch('https://planetnineserver.azurewebsites.net/api/user')
        .then(response => response.json())
        .then(users => this.setState({ users: users }));

        fetch('https://planetnineserver.azurewebsites.net/api/planet')
        .then(response => response.json())
        .then(planets => this.setState({ planets: planets }));

        fetch('https://planetnineserver.azurewebsites.net/api/moon')
        .then(response => response.json())
        .then(moons => this.setState({ moons: moons }));
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    handleClickEvent() {
        this.setState({ show: !this.state.show });
    }

    render() {
    const { users, planets, moons, searchField, show } = this.state;
    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchField.toLowerCase()));
    const filteredPlanets = planets.filter(planet =>
        planet.planetName?.toLowerCase().includes(searchField.toLowerCase()));
    const filteredMoons = moons.filter(moon =>
        moon.moonName?.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <>
                <input style={{ borderRadius: ".5rem", width: "20rem" }} onClick={this.handleClickEvent} placeholder="Search" />
                <Modal show={show} onHide={this.handleClickEvent}>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <div>
                        {searchField.length > 0 && <CardList users={filteredUsers} planets={filteredPlanets} moons={filteredMoons}/>}
                    </div>
                </Modal>
            </>
        );
    }
}