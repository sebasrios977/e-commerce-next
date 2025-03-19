export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function HomePage({searchParams}: Props) {
  const { page } = await searchParams;
  const pageNumber = parseInt(page || '1');
  const {products, totalPages}  = await getPaginatedProductsWithImages({page: pageNumber});
  
  if (products.length === 0) {
    redirect('/'); // Redirect to home if no products
  }

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination
        totalPages={totalPages}
      />
    </>
  );
}
