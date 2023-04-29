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
                    <Mercury position={[5, 0, 1]}/> 
                    <Venus position={[1, 0, 5]}/> 
                    <Earth position={[8, 0, 8]}/>
                    <Mars position={[-5, 0, 15]}/> 
                    <Jupiter position={[-8, 0, -8]}/> 
                    <Neptune position={[-9, 0, -5]}/>
                    <Uranus position={[-10, 0, -15]}/> 
                <OrbitControls/>
            </Canvas>
            </SolarSystemContainer>
        )
    }
}