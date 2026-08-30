"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export default function Car() {

  const { scene } = useGLTF(
    "land_rover_range_rover_sport_solar_crown.glb"
  );


  const carRef = useRef();


  useFrame(() => {s

    if (carRef.current) {

    carRef.current.rotation.y += 0.0005;

    }

  });



  return (

    <primitive

      ref={carRef}

      object={scene}

      scale={0.90}

      position={[0,-0.8,0]}

      rotation={[0, 0, 0]}

    />

  );

}


useGLTF.preload(
  "land_rover_range_rover_sport_solar_crown.glb"
);