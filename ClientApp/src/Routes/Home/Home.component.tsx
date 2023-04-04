import { Component, Fragment } from "react"
import { Sphere } from "../../components/Sphere/Sphere.component"

export class Home extends Component {
    render() {
        return (
            <Fragment>
                <h1>Hello World! The year is 2099. Space travel is no longer a dream. Pioneers are no longer folklore and you're amongst the many brave pilots needed to pave the way for future generations. </h1>
                <Sphere/>
            </Fragment>
        )
    }
}