export const getTopProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/product/top`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};
