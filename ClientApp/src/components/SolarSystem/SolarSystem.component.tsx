import { Component } from "react";
import { SolarSystemContainer } from "./SolarSystem.styles";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Mercury } from "../../shaders/mercury.shaders";
import { Venus } from "../../shaders/venus.shaders";
import { Earth } from "../../shaders/earth.shaders";
import { Mars } from "../../shaders/mars.shaders";
import { Jupiter } from "../../shaders/jupiter.shaders";
import { Neptune } from "../../shaders/neptune.shaders";
import { Uranus } from "../../shaders/uranus.shaders";

export class SolarSystem extends Component {

    render() {
        return(
            <SolarSystemContainer>
                <Canvas>
                <pointLight position={[10, 5, 10]} />
                <Stars />
                    <Mercury position={[0, 0, 4]}/> 
                    <Venus position={[6, 0, 0]}/> 
                    <Earth position={[15, 0, 0]}/>
                    <Mars position={[-15, 0, 0]}/> 
                    <Jupiter position={[-6, 0, 0]}/> 
                    <Neptune position={[-1.2, 0, 0]}/>
                    <Uranus position={[-1.2, 0, 0]}/> 
                <OrbitControls/>
            </Canvas>
            </SolarSystemContainer>
        )
    }
}