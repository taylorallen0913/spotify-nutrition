import React from 'react'

interface ListeningStats {
  artistName: string
  listeningPercent: number
}

interface NutritionLabelProps {
  listeningStats: ListeningStats[]
}

export default function NutritionLabel({
  listeningStats,
}: NutritionLabelProps) {
  return (
    <div className="flex flex-col bg-white border-2 border-black w-1/5 m-20 p-2">
      <h1 className="text-5xl font-helvetica-bold text-black font-black">
        Nutrition Facts
      </h1>
      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex items-center font-helvetica text-black">
        <p className="font-bold text-lg">Yearly Serving Size</p>
        <p className="ml-auto text-md">12,204 minutes (203.4 hours)</p>
      </div>
      <hr className="my-1 h-3 bg-black border-0" />
      <div className="flex items-center">
        <div>
          <p className="text-2xl font-helvetica text-black font-bold">
            Minutes
          </p>
          <p className="text-md font-helvetica text-black font-bold">per day</p>
        </div>
        <div className="ml-auto">
          <p className="text-4xl font-helvetica text-black font-bold">125</p>
        </div>
      </div>
      <hr className="my-1 h-2 bg-black border-0" />
      <p className="text-xl font-helvetica text-black font-bold ml-auto">
        % Yearly Value*
      </p>
      <hr className="my-1 h-px bg-black border-0" />

      {listeningStats.map((stat) => (
        <div className="flex">
          <p className="text-xl font-helvetica text-black font-bold">
            {stat.artistName}
          </p>
          <p className="text-xl font-helvetica text-black font-medium ml-auto">
            `${stat.listeningPercent}%`
          </p>
        </div>
      ))}

      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex">
        <p className="text-xl font-helvetica text-black font-bold">
          Playboi Carti
        </p>
        <p className="text-xl font-helvetica text-black font-medium ml-auto">
          24%
        </p>
      </div>
      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex">
        <p className="text-xl font-helvetica text-black font-bold">
          Lil Uzi Vert
        </p>
        <p className="text-xl font-helvetica text-black font-medium ml-auto">
          5%
        </p>
      </div>
      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex">
        <p className="text-xl font-helvetica text-black font-bold">Lil Durk</p>
        <p className="text-xl font-helvetica text-black font-medium ml-auto">
          10%
        </p>
      </div>
      <hr className="my-1 h-px bg-black border-0" />
      <div className="flex">
        <p className="text-xl font-helvetica text-black font-bold">midwxst</p>
        <p className="text-xl font-helvetica text-black font-medium ml-auto">
          2%
        </p>
      </div>
      <hr className="my-1 h-px bg-black border-0" />

      <p className="text-md font-helvetica text-black font-medium">
        *The % Yearly Value tells you how much an artist contributes to a yearly
        diet. 57,660 minutes a year is used for general nutrition advice.
      </p>
    </div>
  )
}
