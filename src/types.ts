export type Player = {
  name: string;
  wins: number;
};

export type Leaderboard = {
  id: string;
  title: string;
  players: Player[];
};
