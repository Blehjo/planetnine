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
    }

    setActiveMarkerId(): void {
        this.setState({
            activeMarkerId: ''
        })
    }
    render() {
        const { markers, activeMarkerId } = this.state;
        const activeMarker = markers.find(marker => marker.id === activeMarkerId)
        return (
            <VoyagerContainer>
            <Canvas>
                <pointLight position={[10, 5, 10]} />
                <Stars />
                {/* <Mercury/> */}
                {/* <Venus/> */}
                {/* <Earth/> */}
                {/* <Mars/> */}
                <Jupiter/>
                {/* <Neptune/> */}
                {/* <Uranus/> */}
                <OrbitControls/>
            </Canvas>
            <div className="controls">
                <ControlPanel markers={markers} activeMarkerId={activeMarkerId} setActiveMarkerId={this.setActiveMarkerId} />
            </div>
            </VoyagerContainer>
        );
    }
}