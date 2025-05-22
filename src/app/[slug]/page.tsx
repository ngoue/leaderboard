import Players from "@/components/Players";
import { getLeaderboard } from "@/database";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Leaderboard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const leaderboard = await getLeaderboard(slug);

  if (!leaderboard) {
    return redirect("/");
  }

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
