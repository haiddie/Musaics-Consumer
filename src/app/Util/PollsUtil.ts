export const selectPoll = async (create_content: any) => {
  const url = `${process.env.NEXT_PUBLIC_MUSAICS_CONSUMER_URL}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(create_content),
    });

    if (!response.ok) {
      throw new Error("Failed to select poll");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error selecting poll:", error);
    throw error;
  }
};
