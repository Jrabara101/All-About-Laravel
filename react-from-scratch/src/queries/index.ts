import { Song } from "../types";

export async function getSongs() {
  try {
    const response = await fetch("http://localhost:8000/api/songs", {
      headers: {
        accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Remote Data Mutation: Toggle like status on backend
export async function toggleLikedStatus(id: Song["id"], userId: number) {
  try {
    const response = await fetch(`http://localhost:8000/api/songs/${id}/like`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Remote Data Mutation: Unlike on backend
export async function unlikeSong(id: Song["id"], userId: number) {
  try {
    const response = await fetch(`http://localhost:8000/api/songs/${id}/unlike`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Remote Data Mutation: Add new song
export async function addSong(song: Omit<Song, "id" | "likedBy">) {
  try {
    const response = await fetch("http://localhost:8000/api/songs", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(song),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
