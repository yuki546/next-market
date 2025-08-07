"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
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
          email: "ダミーデータ",
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch {
      alert("アイテム作成失敗");
    }
  };

  return (
    <div>
      <h1>アイテム作成</h1>
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
        <button>作成</button>
      </form>
    </div>
  );
};

export default CreateItem;
