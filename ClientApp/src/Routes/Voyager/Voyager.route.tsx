import { Component } from "react"
import BoxShader from "../../shaders/box.shaders";
import { VoyagerContainer } from "./Voyager.styles";

export class Voyager extends Component {
    render() {
        return (
            <VoyagerContainer>
            <BoxShader/>
            </VoyagerContainer>
        );
    }
}