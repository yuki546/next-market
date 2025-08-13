import { JWTPayload } from "jose";

export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface SingleItem {
  created_at: string;
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  email: string;
}

export interface CustomJWTPayload extends JWTPayload {
  email: string;
}

export interface ItemFormProps {
  params: PageProps["params"];
  singleItem: SingleItem;
}
