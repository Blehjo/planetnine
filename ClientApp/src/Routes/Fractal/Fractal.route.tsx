import { Component } from "react";
import { FractalContainer } from "./Fractal.styles";
import { FractalTreeCanvas } from "../../components/Fractals/Fractals.component";

export class Fractal extends Component {
    render() {
        return (
            <FractalContainer>
                <FractalTreeCanvas/>
            </FractalContainer>
        );
    }
}