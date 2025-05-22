"use client";

import type { Player } from "@/types";
import Image from "next/image";
import clsx from "clsx";

export type PlayerProps = Player & {
  rate: string;
  relativeWins: number;
  height: string;
  imageSizePercent: number;
  onWin: () => Promise<void>;
  onLoss: () => Promise<void>;
};

export default function Player({
  name,
  wins,
  rate,
  relativeWins,
  height,
  imageSizePercent,
  onWin,
  onLoss,
}: PlayerProps) {
  return (
    <div
      key={name}
      className={clsx(name, "flex flex-col max-h-[80vh] transition-all")}
    >
      <div className="flex flex-col justify-end items-center size-28 md:size-36 lg:size-44 xl:size-52">
        <Image
          priority
          alt={`${name} headshot`}
          src={`/images/${name}.png`}
          style={{
            width: `${imageSizePercent}%`,
            height: `${imageSizePercent}%`,
          }}
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
            <p className="text-black">
              Wins: <span className="font-extrabold">{wins}</span>
            </p>
            <p className="text-black">
              Rate: <span className="font-extrabold">{rate}%</span>
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-2">
            <button className="size-12" onClick={onWin}>
              <Image
                src="/images/caret-up-circle.svg"
                alt="caret up circle icon"
                width={48}
                height={48}
              />
            </button>
            <button
              className="size-12 disabled:opacity-40"
              onClick={onLoss}
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
  );
}
