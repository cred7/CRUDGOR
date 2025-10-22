"use client";
import { Player } from "@/data/data";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  players: Player[];
  handleFullProfile: (p: Player) => void;
  err?: string | null;
};

export default function PlayerGroup({
  title,
  description,
  players,
  handleFullProfile,
  err,
}: Props) {
  return (
    <section className="max-w-6xl bg-green-50 mx-auto px-4 md:px-8 items-center py-10">
      <header className="mb-8 justify-center items-center text-green-700">
        <h2 className="text-3xl md:text-4xl font-extrabold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div
          className={` h-0.5 top-1/2 w-3/5 z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50`}
        ></div>
      </header>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players && players.length > 0 ? (
          players.map((p) => (
            <article
              key={p.id}
              className="relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-3 top-3 bg-black/50 text-white px-2 py-1 rounded">
                  #{p.number}
                </div>
                <div className="absolute right-3 top-3 bg-white/80 text-black px-2 py-1 rounded text-sm">
                  {p.position}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg text-black font-bold">{p.name}</h3>
                <p className="text-sm text-black">{p.nationality}</p>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleFullProfile(p)}
                    className="text-sm px-3 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    View profile
                  </button>
                  <div className="text-right text-xs text-gray-500">
                    <div>{p.height}</div>
                    <div>{p.weight}</div>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div>No players found{err ? `: ${err}` : ""}</div>
        )}
      </div>
    </section>
  );
}
