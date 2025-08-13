import { PageProps } from "@/types";
import { getSingleItem } from "../../readsingle/[id]/page";
import Form from "./form";

const UpdateItem = async ({ params }: PageProps) => {
  const { id } = await params;
  const singleItem = await getSingleItem(id);
  return (
    <div>
      <h1 className="page-title">アイテム編集</h1>
      <Form params={params} singleItem={singleItem} />
    </div>
  );
};

export default UpdateItem;
