"use client";

import { useRouter } from "next/navigation";
import { ItemFormProps } from "@/types";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const DeleteItem = (props: ItemFormProps) => {
  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = await props.params;

    try {
      const response = await fetch(
        `http://localhost:3000/api/item/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch {
      alert("アイテム削除失敗");
    }
  };

  if (loginUserEmail === props.singleItem.email) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <Image
            src={props.singleItem.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h3>¥{props.singleItem.price}</h3>
          <p>{props.singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
