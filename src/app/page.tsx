"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const playersRaw = [
  {
    name: "josh",
    wins: 1,
  },
  {
    name: "jordan",
    wins: 2,
  },
  {
    name: "danny",
    wins: 0,
  },
];

export default function Leaderboard() {
  const [playerState, setPlayerState] = useState(playersRaw);

  const wins = playerState.map(({ wins }) => wins);
  const maxWins = Math.max(...wins);
  const minWins = Math.min(...wins);
  const players = playerState.map((player) => ({
    ...player,
    relativeWins: player.wins - minWins,
    place:
      player.wins === maxWins && maxWins != 0
        ? 1
        : player.wins === minWins
        ? 3
        : 2,
  }));

  console.log({ players });

  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <div>
        <h1 className="sr-only">Leaderboard</h1>
      </div>

      <div className="flex flex-row justify-around items-end w-full px-1 gap-x-1 md:w-auto md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
        {players.map(({ name, wins, place, relativeWins }) => (
          <div key={name} className={`${name} flex flex-col max-h-[80vh]`}>
            <div className="size-32 md:size-36 lg:size-44 xl:size-52">
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
                "flex flex-col justify-end items-center bg-primary rounded-t min-h-24",
                place === 1 ? "h-[80vh]" : place === 2 ? "h-[40vh]" : "h-[24vh]"
              )}
            >
              <div className="">
                <p className="font-extrabold text-black">
                  {relativeWins > 0 && "+"}
                  {relativeWins}
                </p>
              </div>
              <div className="flex flex-row gap-x-2 mb-2">
                <button className="size-12">
                  <Image
                    src="/images/caret-up-circle.svg"
                    alt="caret up circle icon"
                    width={48}
                    height={48}
                  />
                </button>
                <button className="size-12">
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
        ))}
      </div>
    </main>
  );
}
