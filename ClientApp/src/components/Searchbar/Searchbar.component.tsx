import { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";

import { SearchBox } from "./SearchBox.component";
import { CardList } from "./CardList.component";

import { User } from "../../store/user/user.types";
import { Planet } from "../../store/planet/planet.types";
import { Moon } from "../../store/moon/moon.types";

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
        fetch('https://planetnineservers.azurewebsites.net/api/user')
        .then(response => response.json())
        .then(users => this.setState({ users: users }));

        fetch('https://planetnineservers.azurewebsites.net/api/planet')
        .then(response => response.json())
        .then(planets => this.setState({ planets: planets }));
        
        fetch('https://planetnineservers.azurewebsites.net/api/moon')
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
                <input onClick={this.handleClickEvent} placeholder="Search" />
                <Modal show={show} onHide={this.handleClickEvent}>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <CardList users={filteredUsers} planets={filteredPlanets} moons={filteredMoons}/>
                </Modal>
            </>
        );
    }
}