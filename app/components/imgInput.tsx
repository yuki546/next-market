import { ImgInputProps } from "@/types";
import React, { useState } from "react";

const ImgInput = (props: ImgInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleClick = async () => {
    if (!imageFile) return;

    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "next-market");
      data.append("cloud_name", "my-web-app");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/my-web-app/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const jsonData = await response.json();
      await props.setImage(jsonData.url);
      alert("画像アップロード成功");
    } catch {
      alert("画像アップロード失敗");
    }
  };

  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImageFile(e.target.files?.[0] || null)
        }
        accept="image/png, image/jpg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像 Upload
      </button>
    </div>
  );
};

export default ImgInput;
