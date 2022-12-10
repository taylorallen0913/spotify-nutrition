interface ListeningStats {
  artistName: string;
  listeningPercent: number;
}

interface NutritionLabelProps {
  listeningStats: ListeningStats[];
  favoriteGenre: string;
}

export default function NutritionLabel({
  listeningStats,
  favoriteGenre,
}: NutritionLabelProps) {
  return (
    <div className="flex flex-col bg-white border-2 border-black w-[22rem] m-5 p-2">
      <h1 className="text-5xl font-helvetica-bold text-black font-black">
        Nutrition Facts
      </h1>
      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex items-center font-helvetica text-black">
        <p className="font-bold text-lg">Serving Size</p>
        <p className="ml-auto font-bold text-lg">1 Year (365 days)</p>
      </div>
      <hr className="my-1 h-2 bg-black border-0" />
      <div className="flex items-center">
        <div>
          <p className="text-2xl font-helvetica text-black font-bold">
            Top Genre
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-lg font-helvetica text-black font-bold">
            {favoriteGenre}
          </p>
        </div>
      </div>
      <hr className="my-1 h-1 bg-black border-0" />
      <p className="text-md font-helvetica text-black font-bold ml-auto">
        % Yearly Value*
      </p>
      <hr className="my-1 h-px bg-black border-0" />

      {listeningStats.map((stat) => (
        <div key={stat.artistName}>
          <div className="flex">
            <p className="text-xl font-helvetica text-black font-bold">
              {stat.artistName}
            </p>
            <p className="text-xl font-helvetica text-black ml-auto">
              {stat.listeningPercent}%
            </p>
          </div>
          <hr className="my-1 h-px bg-black border-0" />
        </div>
      ))}

      <p className="text-md font-helvetica text-black font-medium">
        *The % Yearly Value tells you how much an artist contributes to a yearly
        diet. 57,660 minutes a year is used for general nutrition advice.
      </p>
    </div>
  );
}
