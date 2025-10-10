"use client";
import { Player } from "@/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DefendersList() {
  const [err, setErr] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("/api/player", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.message) {
        setErr(data.message);
        return;
      }
      setPlayers(data);
      console.log("Fetched players:", data);
    } catch (error) {
      setErr("Error fetching players");
      setTimeout(() => setErr(null), 3000);
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const goalkeepers: Player[] = players.filter(
    (n) => n.position === "Goalkeeper"
  )!;
  const defenders: Player[] = players.filter((n) => n.position === "Defender")!;
  const midfilders: Player[] = players.filter(
    (n) => n.position === "Midfielder"
  )!;
  const strikers: Player[] = players.filter((n) => n.position === "Striker")!;

  const router = useRouter();

  console.log(defenders);
  function handleFullProfile(p: Player) {
    router.push(`/player/${encodeURIComponent(p.name)}`);
  }

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 md:px-8 items-center py-10">
        <header className="mb-8 justify-center items-center text-green-700">
          <h2 className="text-3xl md:text-4xl font-extrabold">GoalKeepers</h2>
          <p className="text-gray-600 mt-2">
            Meet the players forming the backbone of the defence.
          </p>
          <div
            className={` h-0.5 top-1/2 w-3/5 z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50`}
          ></div>
        </header>

        <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {goalkeepers ? (
            goalkeepers.map((p) => (
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
                      onClick={() => {
                        // setSelected(p),
                        handleFullProfile(p);
                      }}
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
            <div>No players found{err}</div>
          )}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <header className="mb-8  justify-center items-center text-green-700">
          <h2 className="text-3xl md:text-4xl font-extrabold">Defenders</h2>
          <p className="text-gray-600 mt-2">
            Meet the players forming the backbone of the defence.
          </p>
          <div
            className={` h-0.5 top-1/2 w-3/5 z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50`}
          ></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {defenders.map((p) => (
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
                <h3 className="text-lg font-bold text-black">{p.name}</h3>
                <p className="text-sm text-black">{p.nationality}</p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => {
                      // setSelected(p),
                      handleFullProfile(p);
                    }}
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
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <header className="mb-8  justify-center items-center text-green-700">
          <h2 className="text-3xl md:text-4xl font-extrabold">Midfielders</h2>
          <p className="text-gray-600 mt-2">
            Meet the players forming the Engine of the team.
          </p>
          <div
            className={` h-0.5 top-1/2 w-3/5 z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50`}
          ></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {midfilders.map((p) => (
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
                    onClick={() => {
                      // setSelected(p),
                      handleFullProfile(p);
                    }}
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
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <header className="mb-8  justify-center items-center text-green-700">
          <h2 className="text-3xl md:text-4xl font-extrabold">Stikers</h2>
          <p className="text-gray-600 mt-2">The Striking force of the team</p>
          <div
            className={` h-0.5 top-1/2 w-3/5 z-0 bg-gradient-to-l from-green-700/50 via-orange-300/60 to-green-700/50`}
          ></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {strikers.map((p) => (
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
                <h3 className="text-lg font-bold text-black">{p.name}</h3>
                <p className="text-sm text-black">{p.nationality}</p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => {
                      // setSelected(p),
                      handleFullProfile(p);
                    }}
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
          ))}
        </div>
      </section>
    </>
  );
}
