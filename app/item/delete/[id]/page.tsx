"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageProps } from "@/types";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const DeleteItem = ({ params }: PageProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

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

  if (loginUserEmail === email) {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image
            src={image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h3>¥{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
