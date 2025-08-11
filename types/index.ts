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
}
