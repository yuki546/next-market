"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageProps } from "@/types";

const UpdateItem = ({ params }: PageProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getSingleItem = async (id: string) => {
      const response = await fetch(
        `http://localhost:3000/api/item/readsingle/${id}`
      );
      const jsonData = await response.json();
      const singleItem = await jsonData.singleItem;
      setTitle(singleItem.title);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setDescription(singleItem.description);
      setEmail(singleItem.email);
    };
    const fetchData = async () => {
      const { id } = await params;
      getSingleItem(id);
    };
    fetchData();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = await params;

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
            title: title,
            price: price,
            image: image,
            description: description,
            email: "dummy@gmail.com",
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

  return (
    <div>
      <h1>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          type="text"
          name="title"
          placeholder="アイテム名"
          required
        />
        <input
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          type="text"
          name="price"
          placeholder="価格"
          required
        />
        <input
          value={image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.value)
          }
          type="text"
          name="image"
          placeholder="画像"
          required
        />
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          name="description"
          rows={15}
          placeholder="商品説明"
          required
        ></textarea>
        <button>編集</button>
      </form>
    </div>
  );
};

export default UpdateItem;
