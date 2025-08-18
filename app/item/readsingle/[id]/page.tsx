import Image from "next/image";
import { PageProps } from "@/types";
import Link from "next/link";
import { getSingleItem } from "@/app/utils/api";

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const singleItem = await getSingleItem(id);

  return {
    title: singleItem.title,
    description: singleItem.description,
  };
}

const ReadSingleItem = async ({ params }: PageProps) => {
  const { id } = await params;

  const singleItem = await getSingleItem(id);
  return (
    <div className="grid-container-si">
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
        <div>
          <Link href={`/item/update/${singleItem.id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem.id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
