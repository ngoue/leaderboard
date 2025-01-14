"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const playersRaw = [
  {
    name: "danny",
    wins: 0,
  },
  {
    name: "jordan",
    wins: 0,
  },
  {
    name: "josh",
    wins: 0,
  },
];

export default function Leaderboard() {
  const [playerState, setPlayerState] = useState(playersRaw);

  const wins = playerState.map(({ wins }) => wins);
  const games = wins.reduce((acc, curr) => acc + curr, 0);
  const maxWins = Math.max(...wins);
  const minWins = Math.min(...wins);
  const players = playerState.map((player) => ({
    ...player,
    relativeWins: player.wins - minWins,
    height:
      player.wins === maxWins && maxWins != 0
        ? "h-[80vh]"
        : player.wins === minWins
        ? "h-[24vh]"
        : "h-[40vh]",
  }));

  const win = (name: string) => {
    setPlayerState((prev) =>
      prev.map((player) =>
        name === player.name ? { ...player, wins: player.wins + 1 } : player
      )
    );
  };

  const lose = (name: string) => {
    setPlayerState((prev) =>
      prev.map((player) =>
        name === player.name
          ? { ...player, wins: Math.max(player.wins - 1, 0) }
          : player
      )
    );
  };

  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <div className="mt-2">
        <h1 className="font-extrabold text-black dark:text-primary text-2xl lg:text-4xl">
          Leaderboard
        </h1>
      </div>

      <div className="flex flex-row justify-around items-end transition-all w-full px-1 gap-x-1 md:w-auto md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
        {players.map(({ name, wins, height, relativeWins }) => (
          <div
            key={name}
            className={clsx(name, "flex flex-col max-h-[80vh] transition-all")}
          >
            <div className="size-28 md:size-36 lg:size-44 xl:size-52">
              <Image
                priority
                alt={`${name} headshot`}
                src={`/images/${name}.png`}
                width={256}
                height={256}
              />
            </div>
            <div
              className={clsx(
                "flex flex-col justify-between items-center bg-primary rounded-t min-h-24 transition-all",
                height
              )}
            >
              <div className="my-4">
                <p className="font-extrabold text-black text-2xl lg:text-4xl">
                  {relativeWins > 0 && `+${relativeWins}`}
                </p>
              </div>
              <div className="flex flex-col justify-between items-center gap-y-4">
                <div className="flex flex-col justify-between items-center gap-y-2">
                  <p className="text-black">Wins: {wins}</p>
                  <p className="text-black">
                    Rate: {games === 0 ? "-" : Math.trunc((wins / games) * 100)}
                    %
                  </p>
                </div>
                <div className="flex flex-row gap-x-2 mb-2">
                  <button className="size-12" onClick={() => win(name)}>
                    <Image
                      src="/images/caret-up-circle.svg"
                      alt="caret up circle icon"
                      width={48}
                      height={48}
                    />
                  </button>
                  <button
                    className="size-12 disabled:opacity-40"
                    onClick={() => lose(name)}
                    disabled={wins === 0}
                  >
                    <Image
                      src="/images/caret-down-circle.svg"
                      alt="caret down circle icon"
                      width={48}
                      height={48}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
