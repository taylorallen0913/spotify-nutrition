import NutritionLabel from '../components/NutritionLabel'

export default function Home() {
  return (
    <div>
      <NutritionLabel
        listeningStats={[
          { artistName: 'Babytron', listeningPercent: 41 },
          { artistName: 'Babytron', listeningPercent: 41 },
          { artistName: 'Babytron', listeningPercent: 41 },
          { artistName: 'Babytron', listeningPercent: 41 },
        ]}
      />
    </div>
  )
}
