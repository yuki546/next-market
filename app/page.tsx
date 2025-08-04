import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Item {
  created_at: string;
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  email: string;
}

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall");
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div>
      {allItems.map((item: Item) => (
        <Link href="" key={item.id}>
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <div>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
