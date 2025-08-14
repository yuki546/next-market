import { PageProps } from "@/types";
import Form from "./form";
import { getSingleItem } from "@/app/utils/api";

const DeleteItem = async ({ params }: PageProps) => {
  const { id } = await params;
  const singleItem = await getSingleItem(id);
  return (
    <div>
      <h1 className="page-title">アイテム削除</h1>
      <Form params={params} singleItem={singleItem} />
    </div>
  );
};

export default DeleteItem;
