import { Canvas, useLoader } from '@react-three/fiber';
import { ListeningStats } from '../interfaces/spotify';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import NutritionLabel from './NutritionLabel';

interface FiberSceneProps {
  listeningStats: ListeningStats[];
  topGenre: string;
}

function Box({ position }: { position: number[] }) {
  const colorMap = useLoader(TextureLoader, 'label.png');
  return (
    <mesh position={position} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry attach="geometry" args={[2, 3, 2]} />
      <meshBasicMaterial color="gray" map={colorMap} attach="material-0" />
      <meshBasicMaterial color="gray" attach="material-1" />
      <meshBasicMaterial color="gray" attach="material-2" />
      <meshBasicMaterial color="gray" attach="material-3" />
      <meshBasicMaterial color="gray" attach="material-4" />
      <meshBasicMaterial color="gray" attach="material-5" />
    </mesh>
  );
}

export default function FiberScene({
  listeningStats,
  topGenre,
}: FiberSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows={true}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Box position={[0, 0, 0]} />
      </Canvas>
      {/* <NutritionLabel listeningStats={listeningStats} topGenre={topGenre} /> */}
    </div>
  );
}
