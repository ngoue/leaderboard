"use server";

import { createClient } from "@redis/client";
import cloneDeep from "lodash/cloneDeep";
import type { Leaderboard } from "./types";

const LEADERBOARD_KEY = "leaderboard";
const SEED_DATA: Leaderboard = [
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

const client = await createClient({
  url: process.env.KV_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function getLeaderboard(): Promise<Leaderboard> {
  const data = await client.get(LEADERBOARD_KEY);

  if (data) {
    return JSON.parse(data) as Leaderboard;
  } else {
    const initial = cloneDeep(SEED_DATA);
    await saveLeaderboard(initial);
    return initial;
  }
}

export async function saveLeaderboard(data: Leaderboard): Promise<Leaderboard> {
  await client.set(LEADERBOARD_KEY, JSON.stringify(data));
  return data;
}

export async function recordWin(name: string): Promise<Leaderboard> {
  const leaderboard = await getLeaderboard();
  return await saveLeaderboard(
    leaderboard.map((player) =>
      name === player.name ? { ...player, wins: player.wins + 1 } : player
    )
  );
}

export async function recordLoss(name: string) {
  const leaderboard = await getLeaderboard();
  return await saveLeaderboard(
    leaderboard.map((player) =>
      name === player.name
        ? { ...player, wins: Math.max(player.wins - 1, 0) }
        : player
    )
  );
}
