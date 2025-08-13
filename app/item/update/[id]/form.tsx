"use client";

import { useRouter } from "next/navigation";
import { ItemFormProps } from "@/types";
import useAuth from "@/app/utils/useAuth";

const UpdateItem = (props: ItemFormProps) => {
  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (formData: FormData) => {
    const { id } = await props.params;

    try {
      const response = await fetch(
        `http://localhost:3000/api/item/update/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: formData.get("title"),
            price: formData.get("price"),
            image: formData.get("image"),
            description: formData.get("description"),
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch {
      alert("アイテム編集失敗");
    }
  };

  if (loginUserEmail === props.singleItem.email) {
    return (
      <div>
        <form action={handleSubmit}>
          <input
            defaultValue={props.singleItem.title}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            defaultValue={props.singleItem.price}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            defaultValue={props.singleItem.image}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            defaultValue={props.singleItem.description}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;
