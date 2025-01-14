import Players from "@/components/Players";
import { getLeaderboard } from "@/database";

export const revalidate = 0;

export default async function Leaderboard() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <div className="mt-2">
        <h1 className="font-extrabold text-black dark:text-primary text-2xl lg:text-4xl">
          Leaderboard
        </h1>
      </div>

      <Players initial={leaderboard} />
    </main>
  );
}
