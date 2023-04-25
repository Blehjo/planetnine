import { ChangeEvent, Component, MouseEvent, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three/src/materials/MeshLambertMaterial";
import { FractalGUIContainer, FractalTreeContainer } from "./Fractals.styles";

const royalblue = new THREE.MeshLambertMaterial({ color: "darkred" });

interface IFractalState {
  depth: number;
  angleIncrement: number;
  shape: string;
  showDepth: boolean;
  showAngle: boolean;
  showShape: boolean;
  is3D: boolean;
}

interface IShape {
  handleShape: (inputShape: string) => void;
}

interface IAngle {
  handleAngle: (e: MouseEvent<HTMLElement>) => void;
  angleIncrement: number;
}

interface IDepth {
  handleDepth: (e: MouseEvent<HTMLElement>) => void;
  depth: number;
}

interface IFractalTree {
  depth: number;
  angleIncrement: number;
  shape: string;
  is3D: boolean;
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
      is3D: false
    }
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

  render() {
    const { depth, angleIncrement, shape, showDepth, showAngle, showShape, is3D } = this.state;
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
            {showShape && <ShapeUI handleShape={this.handleShape} />}
        </div>
        </FractalGUIContainer>
        </FractalTreeContainer>
    );
  }  
}

function FractalTree({ depth, angleIncrement, shape, is3D }: IFractalTree) {
  const branches: any = [];
  const ratio = 0.75;
  let angleZ = 0;
  let angleX = 0;
  let radius = 0.2;
  let height = 1;
  let x = 0,
    y = 0,
    z = 0;
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
      {/* Value can be changed to modify fractal */}
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
    <div className="">
      <input
        id="depth-slider"
        className="appearance-none bg-blue-500 rounded-lg h-1 thumb-lg-blue-600"
        type="range"
        min="1"
        max="10"
        value={depth}
        onClick={(e) => handleDepth(e)}
      />
    </div>
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

function ShapeUI({ handleShape }: IShape) {
  return (
    <div className="mx-auto w-72 sm:w-72 flex justify-between">
      <button
        className="rounded-md bg-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400"
        onClick={() => handleShape("cylinder")}
      >
        Cylinder
      </button>
      <button
        className="rounded-md bg-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400"
        onClick={() => handleShape("cube")}
      >
        Cube
      </button>
      <button
        className="rounded-md bg-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400"
        onClick={() => handleShape("sphere")}
      >
        Sphere
      </button>
      {/* <button
        className="rounded-md bg-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400"
        onClick={() => handleShape("Octahedron")}
      >
        Octahedron
      </button> */}
    </div>
  );
}