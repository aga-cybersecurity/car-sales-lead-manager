"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function RangeRover() {
  const { scene } = useGLTF(
    "/models/land_rover_range_rover_sport_solar_crown.glb"
  );

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">

      <Canvas
        camera={{
          position: [0, 1, 6],
          fov: 45,
        }}
      >

        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Environment preset="city" />

        <RangeRover />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
        />

      </Canvas>

    </div>
  );
}

useGLTF.preload(
  "/models/land_rover_range_rover_sport_solar_crown.glb"
);