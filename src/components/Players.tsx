"use client";

import { Leaderboard } from "@/types";
import { useState } from "react";
import Player from "./Player";
import { recordLoss, recordWin } from "@/database";

export type PlayersProps = {
  initial: Leaderboard;
};

export default function Players({ initial }: PlayersProps) {
  const [leaderboard, setLeaderboard] = useState(initial);
  const wins = leaderboard.map(({ wins }) => wins);
  const games = wins.reduce((acc, curr) => acc + curr, 0);
  const maxWins = Math.max(...wins);
  const minWins = Math.min(...wins);
  const players = leaderboard.map((player) => ({
    ...player,
    relativeWins: player.wins - minWins,
    rate: games === 0 ? "-" : `${Math.trunc((player.wins / games) * 100)}`,
    height:
      player.wins === maxWins && maxWins != 0
        ? "h-[80vh]"
        : player.wins === minWins
        ? "h-[24vh]"
        : "h-[40vh]",
  }));

  const handleWin = async (name: string) => {
    const result = await recordWin(name);
    setLeaderboard(result);
  };

  const handleLoss = async (name: string) => {
    const result = await recordLoss(name);
    setLeaderboard(result);
  };

  return (
    <div className="flex flex-row justify-around items-end transition-all w-full px-1 gap-x-1 md:w-auto md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
      {players.map((player) => (
        <Player
          key={player.name}
          onWin={() => handleWin(player.name)}
          onLoss={() => handleLoss(player.name)}
          {...player}
        />
      ))}
    </div>
  );
}