"use client";
import { useEffect, useState } from "react";

type Player = {
  id: number;
  number: number;
  name: string;
  pos: string;
  position: string;
  nickname: string;
  bio: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  weight: string;
  imageUrl: string;
  social: {
    instagram: string;
  };
};

export default function PlayerForm() {
  const [err, setErr] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [render, setRender] = useState(0);

  const deletePlayer = (id: number) => async () => {
    alert("Are you sure you want to delete this player?");

    try {
      const response = await fetch("/api/player", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("Delete response:", data);
      fetchPlayers();
    } catch (error) {
      // console.error("Error deleting player:", error);
    }
  };

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
      // console.log("Fetched players:", data);
    } catch (error) {
      setErr("Error fetching players");
      setTimeout(() => setErr(null), 3000);
      // console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <section>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">
          Player Data Results
        </h1>
        {err && (
          <div className="mb-4 p-3 pb-6 bg-red-100 text-red-800 border border-red-200 rounded">
            {err}
          </div>
        )}
        <div>
          {players.length > 0 ? (
            <ul className="space-y-4">
              {players.map((player) => (
                <li
                  key={player.number}
                  className="p-3 bg-green-100 rounded border border-green-200"
                >
                  <div className="font-bold">
                    {player.name} {player.position}
                  </div>
                  <div>Nickname: {player.nickname}</div>
                  <div>Nationality: {player.nationality}</div>
                  <div>Date of Birth: {player.dateOfBirth}</div>
                  <div>Player: {player.position}</div>
                  <div>Player: {player.imageUrl}</div>
                  <div>
                    Height: {player.height} | Weight: {player.weight}
                  </div>
                  <div>
                    Instagram:{" "}
                    {player.social.instagram ? (
                      <a
                        href={player.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {player.social.instagram}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </div>

                  <div className="relative mt-2">
                    <button
                      className="absolute bottom-2 right-0 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={deletePlayer(player.id)}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>loading.....</div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-xl font-bold mb-2">News Data Input</h1>
        {/* News input form goes here */}
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-xl font-bold mb-2">Tickets Data Input</h1>
        {/* Tickets input form goes here */}
      </div>
    </section>
  );
}
