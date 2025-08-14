import { SingleItem } from "@/types";

export const getSingleItem = async (id: string): Promise<SingleItem> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`
  );
  const jsonData = await response.json();
  const singleItem = await jsonData.singleItem;
  return singleItem;
};
