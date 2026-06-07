const getAllDiscount = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/discount`,
      {
        method: "GET",
        cache: "no-store", // optional for fresh data
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch discounts: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
};

export const Discount = {
  getAllDiscount,
};