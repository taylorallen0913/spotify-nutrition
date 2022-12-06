import NutritionLabel from '../components/NutritionLabel'

export default function Home() {
  return (
    <div>
      <NutritionLabel
        listeningStats={[
          { artistName: 'Babytron', listeningPercent: 41 },
          { artistName: 'Lucki', listeningPercent: 24 },
          { artistName: 'Lil Uzi Vert', listeningPercent: 12 },
          { artistName: 'Lil Yachty', listeningPercent: 10 },
          { artistName: 'Destroy Lonely', listeningPercent: 7 },
          { artistName: 'Baby Keem', listeningPercent: 5 },
          { artistName: 'Steve Lacy', listeningPercent: 2 },
        ]}
        favoriteGenre={'Detroit Trap'}
      />
    </div>
  )
}
