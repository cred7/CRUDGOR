"use client";
import { Player } from "@/data/data";
import { useRouter } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";

// Lazy load player group components
const PlayerGroup = lazy(() => import("../../components/PlayerGroup"));

export default function DefendersList() {
  const [err, setErr] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  // const players = playerData;
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

  const router = useRouter();

  function handleFullProfile(p: Player) {
    router.push(`/player/${encodeURIComponent(p.name)}`);
  }

  // Helper to filter players by position
  const getPlayersByPosition = (position: string) =>
    players.filter((n) => n.position === position);

  return (
    <>
      <Suspense fallback={<div>Loading Goalkeepers...</div>}>
        <PlayerGroup
          title="GoalKeepers"
          description="Meet the players forming the backbone of the defence."
          players={getPlayersByPosition("Goalkeeper")}
          handleFullProfile={handleFullProfile}
          err={err}
        />
      </Suspense>
      <Suspense fallback={<div>Loading Defenders...</div>}>
        <PlayerGroup
          title="Defenders"
          description="Meet the players forming the backbone of the defence."
          players={getPlayersByPosition("Defender")}
          handleFullProfile={handleFullProfile}
        />
      </Suspense>
      <Suspense fallback={<div>Loading Midfielders...</div>}>
        <PlayerGroup
          title="Midfielders"
          description="Meet the players forming the Engine of the team."
          players={getPlayersByPosition("Midfielder")}
          handleFullProfile={handleFullProfile}
        />
      </Suspense>
      <Suspense fallback={<div>Loading Strikers...</div>}>
        <PlayerGroup
          title="Strikers"
          description="The Striking force of the team"
          players={getPlayersByPosition("Striker")}
          handleFullProfile={handleFullProfile}
        />
      </Suspense>
    </>
  );
}
