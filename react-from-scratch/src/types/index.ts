export type User = {
  id: number;
};

export type Song = {
  id: number;
  name: string;
  trait: string;
  imageUrl: string;
  likedBy: User["id"][];
};
