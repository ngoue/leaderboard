"use server";

import { createClient } from "@redis/client";
import type { Leaderboard } from "./types";

const client = await createClient({
  url: process.env.KV_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function getLeaderboards(): Promise<Leaderboard[]> {
  const keys = await client.keys("*");
  const leaderboards = await Promise.all(
    keys.map((key) => getLeaderboard(key))
  );
  return leaderboards.filter((leaderboard) => leaderboard !== undefined);
}

export async function getLeaderboard(
  key: string
): Promise<Leaderboard | undefined> {
  const data = await client.get(key);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data) as Leaderboard;
  } catch (error) {
    console.error("Error parsing leaderboard data:", error);
    return;
  }
}

export async function saveLeaderboard(
  key: string,
  data: Leaderboard
): Promise<Leaderboard> {
  await client.set(key, JSON.stringify(data));
  return data;
}

export async function recordWin(
  key: string,
  name: string
): Promise<Leaderboard> {
  const leaderboard = await getLeaderboard(key);
  if (!leaderboard) {
    throw new Error(`Leaderboard not found: ${key}`);
  }

  return await saveLeaderboard(key, {
    ...leaderboard,
    players: leaderboard.players.map((player) =>
      name === player.name ? { ...player, wins: player.wins + 1 } : player
    ),
  });
}

export async function recordLoss(key: string, name: string) {
  const leaderboard = await getLeaderboard(key);
  if (!leaderboard) {
    throw new Error(`Leaderboard not found: ${key}`);
  }

  return await saveLeaderboard(key, {
    ...leaderboard,
    players: leaderboard.players.map((player) =>
      name === player.name
        ? { ...player, wins: Math.max(player.wins - 1, 0) }
        : player
    ),
  });
}
