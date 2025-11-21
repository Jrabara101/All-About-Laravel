// src/queries/index.ts

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
    // Assuming the backend returns { data: [...] }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
