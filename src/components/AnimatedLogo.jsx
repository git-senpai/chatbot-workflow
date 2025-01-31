import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import ErrorBoundary from "./ErrorBoundary";

function Cube() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
    </Float>
  );
}

function AnimatedLogo() {
  return (
    <ErrorBoundary fallback={<div className="w-32 h-32" />}>
      <Suspense fallback={<div className="w-32 h-32" />}>
        <div className="w-32 h-32">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Cube />
          </Canvas>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AnimatedLogo;
