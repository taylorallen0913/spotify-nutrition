import NutritionLabel from './NutritionLabel';
import { ListeningStats } from '../interfaces/spotify';

interface FiberSceneProps {
  listeningStats: ListeningStats[];
  topGenre: string;
}

export default function FiberScene({
  listeningStats,
  topGenre,
}: FiberSceneProps) {
  return (
    <div>
      <NutritionLabel listeningStats={listeningStats} topGenre={topGenre} />
    </div>
  );
}
