import sortBy from "lodash/sortBy";
import { getLeaderboards } from "@/database";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function Leaderboard() {
  const leaderboards = await getLeaderboards();

  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <div className="mt-2 w-full max-w-4xl">
        <h1 className="text-center font-extrabold text-black dark:text-primary text-2xl lg:text-4xl">
          Leaderboard
        </h1>
        <div className="flex flex-col w-full">
          {leaderboards.map((leaderboard) => (
            <Link
              key={leaderboard.id}
              href={`/${leaderboard.id}`}
              className="border-2 border-primary rounded-md px-4 pt-4 m-2 hover:bg-primary/20 transition-all duration-200 ease-in-out"
            >
              <div className="flex flex-col gap-4">
                <h2 className="font-extrabold text-black dark:text-primary text-lg lg:text-2xl">
                  {leaderboard.title}
                </h2>
                <div className="flex flex-row items-center justify-center gap-4">
                  {sortBy(leaderboard.players, ["wins"])
                    .reverse()
                    .map((player) => (
                      <div
                        key={player.name}
                        className="flex flex-col justify-end size-24 lg:size-40"
                      >
                        <Image
                          priority
                          alt={`${player.name} headshot`}
                          src={`/images/${player.name}.png`}
                          width={256}
                          height={256}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
