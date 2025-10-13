"use client";
import { NewsItem, TicketEvent } from "@/data/data";
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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [ticket, setTicket] = useState<TicketEvent[]>([]);
  const [render, setRender] = useState(0);

  const deletePlayer = (id: number | string, label: any) => async () => {
    const links: Record<string, string> = {
      player: "/api/player",
      news: "/api/news",
      ticket: "/api/ticket",
    };
    const ip = links[label];
    console.log("Deleting from:", ip, "ID:", id, "Label:", label);
    alert(`Are you sure you want to delete this ${label}?`);

    try {
      const response = await fetch(ip, {
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
      const apiAddress = [
        { label: "/api/player", state: setPlayers },
        { label: "/api/news", state: setNews },
        { label: "/api/ticket", state: setTicket },
      ];

      // Fetch all data in parallel
      const responses = await Promise.all(
        apiAddress.map((a) =>
          fetch(a.label, { headers: { "Content-Type": "application/json" } })
        )
      );

      // Check for network errors
      const hasError = responses.some((res) => !res.ok);
      if (hasError) throw new Error("Network response was not ok");

      // Parse all JSON responses
      const dataArr = await Promise.all(responses.map((res) => res.json()));

      // Update state accordingly
      dataArr.forEach((data, i) => {
        if (data.message) {
          setErr(data.message);
        } else {
          apiAddress[i].state(data);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr("Error fetching data");
      setTimeout(() => setErr(null), 3000);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                      onClick={deletePlayer(player.id, "player")}
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

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">
          News Data Results
        </h1>
        {err && (
          <div className="mb-4 p-3 pb-6 bg-red-100 text-red-800 border border-red-200 rounded">
            {err}
          </div>
        )}
        <div>
          {news.length > 0 ? (
            <ul className="space-y-4">
              {news.map((item) => (
                <li
                  key={item.id}
                  className="p-3 relative bg-blue-100 rounded border border-blue-200"
                >
                  <div className="font-bold">{item.title}</div>
                  <div>{item.content}</div>
                  <div className="text-xs text-gray-600">Date: {item.date}</div>
                  <button
                    className="absolute bottom-2 right-0 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={deletePlayer(item.id, "news")}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>loading.....</div>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">
          Tickets & Events Data Results
        </h1>
        {err && (
          <div className="mb-4 p-3 pb-6 bg-red-100 text-red-800 border border-red-200 rounded">
            {err}
          </div>
        )}
        <div>
          {ticket.length > 0 ? (
            <ul className="space-y-4">
              {ticket.map((evt) => (
                <li
                  key={evt.id}
                  className="p-3 relative bg-yellow-100 rounded border border-yellow-200"
                >
                  <div className="font-bold">
                    {evt.title} ({evt.competition})
                  </div>
                  <div>Date: {evt.date}</div>
                  <div>Venue: {evt.venue}</div>
                  <div>
                    Tiers:
                    <ul className="ml-4 list-disc">
                      {evt.tiers.map((tier) => (
                        <li key={tier.name}>
                          {tier.name}: KES {tier.price} ({tier.available} left)
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">
                      Event ID: {evt.id}
                    </span>
                  </div>
                  <button
                    className="absolute bottom-2 right-0 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={deletePlayer(evt.id, "ticket")}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>loading.....</div>
          )}
        </div>
      </div>
    </section>
  );
}
