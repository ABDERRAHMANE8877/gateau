"use client";
import "../css/WeddingCake.css";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";

export default function WeddingCake() {
  return (
    <div className="cake-container">
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }} shadows>
        <color attach="background" args={["#fdfff5"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Center>
          <Cake />
        </Center>
        <OrbitControls enableZoom={true} minDistance={3} maxDistance={15} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

function Cake() {
  const cakeRef = useRef();

  useFrame((state, delta) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={cakeRef} position={[0, 0, 0]}>
      {/* Bottom tier */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#FFF5E6" roughness={0.7} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 1.5, 32]} />
        <meshStandardMaterial color="#FFF9F0" roughness={0.7} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Flowers */}
      {[...Array(8)].map((_, i) => (
        <SimpleFlower
          key={i}
          position={[Math.cos((i * Math.PI * 2) / 8) * 1.8, 1, Math.sin((i * Math.PI * 2) / 8) * 1.8]}
          color={i % 2 === 0 ? "#FFD1DC" : "#FFAEC9"}
          scale={0.15}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <SimpleFlower
          key={i + 8}
          position={[Math.cos((i * Math.PI * 2) / 6) * 1.2, 2.5, Math.sin((i * Math.PI * 2) / 6) * 1.2]}
          color={i % 2 === 0 ? "#FFD1DC" : "#FFAEC9"}
          scale={0.12}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <SimpleFlower
          key={i + 14}
          position={[Math.cos((i * Math.PI * 2) / 4) * 0.6, 3.5, Math.sin((i * Math.PI * 2) / 4) * 0.6]}
          color="#FFD1DC"
          scale={0.1}
        />
      ))}

      {/* Cake base */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.2, 32]} />
        <meshStandardMaterial color="#E6E6E6" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function SimpleFlower({ position, color = "#FFD1DC", scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFFF99" roughness={0.7} />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[Math.cos((i * Math.PI * 2) / 5) * 0.3, 0, Math.sin((i * Math.PI * 2) / 5) * 0.3]}
          castShadow
        >
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
