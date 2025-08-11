import Image from "next/image";
import { PageProps, SingleItem } from "@/types";

const getSingleItem = async (id: string): Promise<SingleItem> => {
  const response = await fetch(
    `http://localhost:3000/api/item/readsingle/${id}`
  );
  const jsonData = await response.json();
  const singleItem = await jsonData.singleItem;
  return singleItem;
};

const ReadSingleItem = async ({ params }: PageProps) => {
  const { id } = await params;
  const singleItem = await getSingleItem(id);
  return (
    <div>
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>¥{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
      </div>
    </div>
  );
};

export default ReadSingleItem;
