import { Component, MouseEventHandler } from "react"
import { ButtonContainer, ControllerContainer, VoyagerContainer } from "./Voyager.styles";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Earth } from "../../shaders/earth.shaders";
import { Mars } from "../../shaders/mars.shaders";
import { Mercury } from "../../shaders/mercury.shaders";
import { Venus } from "../../shaders/venus.shaders";
import { Jupiter } from "../../shaders/jupiter.shaders";
import { Neptune } from "../../shaders/neptune.shaders";
import { Uranus } from "../../shaders/uranus.shaders";

export class Voyager extends Component{
    state = {
        // activeMarkerId: "me",
        // markers: [{ id: 'me', lat: 0, lon: 0 }],
        planet: 0
    }

    setActiveMarkerId(): void {
        this.setState({
            activeMarkerId: ''
        })
    }

    incrementPlanet(): void {
        this.setState({
            planet: this.state.planet < 6 && this.state.planet + 1
        });
    }
    
    decrementPlanet(): void {
        this.setState({
            planet: this.state.planet > 1 && this.state.planet - 1 
        });
    }
    render() {
        const { planet } = this.state;
        return (
            <VoyagerContainer>
            <Canvas>
                <pointLight position={[10, 5, 10]} />
                <Stars />
                {
                    planet <= 0 ? (
                        <Mercury/> 
                    ) : planet === 1 ? (
                        <Venus/> 
                    ) : planet === 2 ? (
                        <Earth/>
                    ) : planet === 3 ? (
                        <Mars/> 
                    ) : planet === 4 ? (
                        <Jupiter/> 
                    ) : planet === 5 ? (
                        <Neptune/>
                    ) : (
                        <Uranus/> 
                    )
                }
                <OrbitControls/>
            </Canvas>
            <ControllerContainer>
                <ButtonContainer>
                <button type="button" className="btn btn-secondary" onClick={() => this.decrementPlanet()}>Previous</button>
                </ButtonContainer>
                <ButtonContainer>
                <button type="button" className="btn btn-light" onClick={() => this.incrementPlanet()}>Next</button>
                </ButtonContainer>
            </ControllerContainer>
            </VoyagerContainer>
        );
    }
}