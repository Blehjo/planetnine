import { Component } from "react"
import { VoyagerContainer } from "./Voyager.styles";
import ControlPanel from "../../components/Earth/ControlPanel.component";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Earth } from "../../shaders/earth.shaders";
import { Mars } from "../../shaders/mars.shaders";
import { Mercury } from "../../shaders/mercury.shaders";
import { Venus } from "../../shaders/venus.shaders";
import { Jupiter } from "../../shaders/jupiter.shaders";
import { Neptune } from "../../shaders/neptune.shaders";
import { Uranus } from "../../shaders/uranus.shaders";

export class Voyager extends Component {
    state = {
        activeMarkerId: "me",
        markers: [{ id: 'me', lat: 0, lon: 0 }],
        planet: "mercury"
    }

    setActiveMarkerId(): void {
        this.setState({
            activeMarkerId: ''
        })
    }

    handlePlanet(planet: string): void {
        this.setState({
            planet: planet
        })
    }
    render() {
        const { markers, activeMarkerId, planet } = this.state;
        const activeMarker = markers.find(marker => marker.id === activeMarkerId)
        return (
            <VoyagerContainer>
            <Canvas>
                <pointLight position={[10, 5, 10]} />
                <Stars />
                {
                    planet === "mercury" ? (
                        <Mercury  onClick={() => this.handlePlanet("mercury")}/> 
                    ) : planet === "venus" ? (
                        <Venus onClick={() => this.handlePlanet("venus")}/> 
                    ) : planet === "earth" ? (
                        <Earth onClick={() => this.handlePlanet("earth")}/>
                    ) : planet === "mars" ? (
                        <Mars onClick={() => this.handlePlanet("mars")}/> 
                    ) : planet === "jupiter" ? (
                        <Jupiter onClick={() => this.handlePlanet("jupiter")}/> 
                    ) : planet === "neptune" ? (
                        <Neptune onClick={() => this.handlePlanet("neptune")}/>
                    ) : (
                        <Uranus /> 
                    )
                }
                <OrbitControls/>
            </Canvas>
            <div className="controls">
                <ControlPanel markers={markers} activeMarkerId={activeMarkerId} setActiveMarkerId={this.setActiveMarkerId} />
            </div>
            </VoyagerContainer>
        );
    }
}