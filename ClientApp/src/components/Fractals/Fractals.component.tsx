import { ChangeEvent, Component, MouseEvent, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three/src/materials/MeshLambertMaterial";
import { Accordion } from "react-bootstrap";

import { DragStyle, FractalGUIContainer, FractalTreeContainer } from "./Fractals.styles";
import { ButtonContainer, ControllerContainer } from "./Fractals.styles";

const royalblue = new THREE.MeshLambertMaterial({ color: "darkred" });

interface IFractalState {
  depth: number;
  angleIncrement: number;
  shape: string;
  showDepth: boolean;
  showAngle: boolean;
  showShape: boolean;
  is3D: boolean;
  ratio: number;
  angleZ: number;
  angleX: number;
  radius: number;
  height: number;
  x: number;
  y: number;
  z: number;
}

interface IShape {
  handleShape: (inputShape: string) => void;
  parameters: TreeParameters;
  changeWidth: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface IAngle {
  handleAngle: (e: MouseEvent<HTMLElement>) => void;
  angleIncrement: number;
}

interface IDepth {
  handleDepth: (e: MouseEvent<HTMLElement>) => void;
  depth: number;
}

type TreeParameters = {
  ratio: number;
  angleZ: number;
  angleX: number;
  radius: number;
  height: number;
  x: number;
  y: number;
  z: number;
}
interface IFractalTree {
  depth: number;
  angleIncrement: number;
  shape: string;
  is3D: boolean;
  parameters: TreeParameters;
}

interface IBranch {
  radiusT: number; 
  radiusB: number; 
  height: number; 
  x: number; 
  y: number; 
  z: number; 
  angleZ: number; 
  angleX: number; 
  shape: string;
}

export class FractalTreeCanvas extends Component<{}, IFractalState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      depth: 10,
      angleIncrement: 0.5,
      shape: "cylinder",
      showDepth: false,
      showAngle: false,
      showShape: true,
      is3D: false,
      ratio: .65,
      angleZ: 0,
      angleX: 0,
      radius: .2,
      height: 1,
      x: 0,
      y: 0,
      z: 0
    }
    this.changeWidth = this.changeWidth.bind(this);
  }

  handleDepth(e: MouseEvent<HTMLElement>): void {
    this.setState({
      // depth: e.currentTarget
    });
  }

  handleAngle(e: MouseEvent<HTMLElement>): void {
    this.setState({
      // angleIncrement: e.target
    });
  }

  handleShape(inputShape: string): void {
    this.setState({
      shape: inputShape
    });
  }

  changeWidth(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { depth, angleIncrement, shape, showDepth, showAngle, showShape, is3D, ratio, angleZ, angleX, radius, height, x, y, z } = this.state;
    const parameters = { ratio, angleZ, angleX, radius, height, x, y, z };
    const MIN = 0;
    const MAX = 10;
    return (
        <FractalTreeContainer>
        <Suspense fallback={null}>
            <Canvas 
              frameloop="demand" 
            >
              <PerspectiveCamera makeDefault position={[0, 3, 5]} fov={50} />
              <OrbitControls enableZoom={true} target={[0, 2, 0]} />
              <hemisphereLight
                  intensity={0.5}
                  groundColor={"#080820"}
                  position={[0, 1, 0]}
              />
              <FractalTree
                parameters={parameters}
                depth={depth}
                angleIncrement={angleIncrement}
                shape={shape}
                is3D={is3D}
              />
            </Canvas>
        </Suspense>

        {/* UI */}
        <FractalGUIContainer>
        <div className="mx-auto w-fit flex justify-center my-3">
            {showDepth && <DepthUI depth={depth} handleDepth={this.handleDepth} />}
            {showAngle && (
            <AngleUI angleIncrement={angleIncrement} handleAngle={this.handleAngle} />
            )}
            <ControllerContainer>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Settings</Accordion.Header>
                    <Accordion.Body>

                    <Accordion>
                    <Accordion.Item eventKey="1">
                    <Accordion.Header>Shapes</Accordion.Header>
                    <Accordion.Body>

                    <ButtonContainer>
                    <button
                      type="button" className="btn btn-light"
                      onClick={() => this.handleShape("cylinder")}
                    >
                      Cylinder
                    </button>
                    </ButtonContainer>

                    <ButtonContainer>
                    <button
                      type="button" className="btn btn-light"
                      onClick={() => this.handleShape("cube")}
                    >
                      Cube
                    </button>
                    </ButtonContainer>

                    <ButtonContainer>
                    <button
                      type="button" className="btn btn-light"
                      onClick={() => this.handleShape("sphere")}
                    >
                      Sphere
                    </button>
                    </ButtonContainer>

                    <ButtonContainer>
                    <button
                    type="button" className="btn btn-light"
                    onClick={() => this.handleShape("Octahedron")}
                    >
                      Octahedron
                    </button> 
                    </ButtonContainer>

                    </Accordion.Body>
                    </Accordion.Item>
                    <div>
                    <DragStyle
                      type="range"
                      min={0}
                      max={2}
                      name="ratio"
                      value={ratio}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Ratio: {ratio}</p>
                    <DragStyle
                      type="range"
                      min={0}
                      max={6.3}
                      name="angleZ"
                      value={angleZ}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Angle Z: {angleZ}</p>
                    <DragStyle
                      type="range"
                      min={0}
                      max={6.3}
                      name="angleX"
                      value={angleX}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Angle X: {angleX}</p>
                    <DragStyle
                      type="range"
                      min="-10"
                      max={10}
                      name="radius"
                      value={radius}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Radius: {radius}</p>
                    <DragStyle
                      type="range"
                      min={MIN}
                      max={MAX}
                      name="height"
                      value={height}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Height: {height}</p>
                    <DragStyle
                      type="range"
                      min="-10"
                      max={10}
                      name="x"
                      value={x}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>X: {x}</p>
                    <DragStyle
                      type="range"
                      min="-10"
                      max={10}
                      name="y"
                      value={y}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Y: {y}</p>
                    <DragStyle
                      type="range"
                      min="-10"
                      max={10}
                      name="z"
                      value={z}
                      step=".05"
                      onChange={this.changeWidth}
                    />
                    <p>Z: {z}</p>
                    </div>
                    </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ControllerContainer>
        </div>
        </FractalGUIContainer>
        </FractalTreeContainer>
    );
  }  
}

function FractalTree({ parameters, depth, angleIncrement, shape, is3D }: IFractalTree) {
  const branches: any = [];
  const { radius, ratio, height, angleZ, angleX, x, y, z } = parameters;
  let id = 0;

  function generate(depth: number, angleZ: number, angleX: number, radius: number, height: number, x: number, y: number, z: number) {
    if (depth === 0) return;
    branches.push(
      <Branch
        radiusT={radius * ratio}
        radiusB={radius}
        height={height}
        angleZ={angleZ}
        angleX={angleX}
        x={x}
        y={y}
        z={z}
        shape={shape}
        key={id}
      />
    );

    // cartesian coordinates
    x -= Math.sin(angleZ) * Math.cos(angleX) * height;
    y += Math.cos(angleZ) * Math.cos(angleX) * height;
    z += Math.sin(angleX) * height;
    radius *= ratio;
    height *= ratio;
    depth -= 1;
    // Can be changed. Everything can be changed to modify the fractal
    let angleZL = (angleZ * 10 + angleIncrement * 10) / 10;
    let angleZR = (angleZ * 10 - angleIncrement * 10) / 10;
    id += 1;

    generate(depth, angleZL, 0, radius, height, x, y, z);
    generate(depth, angleZR, 0, radius, height, x, y, z);
    if (is3D) {
      let angleXL = (angleX * 10 + angleIncrement * 10) / 10;
      let angleXR = (angleX * 10 - angleIncrement * 10) / 10;
      generate(depth, 0, angleXL, radius, height, x, y, z);
      generate(depth, 0, angleXR, radius, height, x, y, z);
    }
  }

  generate(depth, angleZ, angleX, radius, height, x, y, z);
  return branches;
}

// branch of a fractal tree
function Branch({ radiusT, radiusB, height, x, y, z, angleZ, angleX, shape }: IBranch) {
  return (
    <group position={[x, y, z]} rotation={[angleX, 0, angleZ]}>
      <mesh position={[0, height / 2, 0]} material={royalblue}>
        {shape === "cylinder" ? (
          <cylinderGeometry
            attach="geometry"
            args={[radiusT, radiusB, height, 32]}
          />
        ) : shape === "cube" ? (
          <boxGeometry attach="geometry" args={[height, height, height]} />
        ) : shape === "sphere" ? (
          <sphereGeometry attach="geometry" args={[height / 2]} />
        ) : (
          <octahedronGeometry attach="geometry" args={[height / 2]} />
        )}
      </mesh>
    </group>
  );
}

// GUI
function DepthUI({ depth, handleDepth }: IDepth) {
  return (
    <input
      id="depth-slider"
      className="appearance-none bg-blue-500 rounded-lg h-1 thumb-lg-blue-600"
      type="range"
      min="1"
      max="10"
      value={depth}
      onClick={(e) => handleDepth(e)}
    />
  );
}

function AngleUI({ angleIncrement, handleAngle }: IAngle) {
  return (
    <div className="">
      <input
        id="angle-slider"
        className="appearance-none bg-blue-500 rounded-lg h-1 thumb-lg-blue-600"
        type="range"
        min="0.1"
        max="1.5"
        step="0.1"
        value={angleIncrement}
        onClick={(e) => handleAngle(e)}
      />
    </div>
  );
}
