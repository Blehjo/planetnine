import { Component, Fragment } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { Badge } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';

export interface GoToProps {
    navigation: NavigationScreenProp<any,any>
};

export class GoToButton extends Component<GoToProps, object> {

    render() {
        return (
            <BadgeContainer>
                <Badge style={{ color: 'black' }} bg="light">
                    <Person onClick={() => this.props.navigation.navigate('/singleprofile')} />
                </Badge>
            </BadgeContainer>
        );
    }
}