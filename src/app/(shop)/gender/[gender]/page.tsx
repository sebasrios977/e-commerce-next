export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>,
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function GenderPage({ params, searchParams }: Props) {

  const { gender } = await params;

  if ( gender !== 'men' && gender !== 'women' && gender !== 'kid' && gender !== 'unisex') {
    notFound();
  }
  
  const { page } = await searchParams;
  const pageNumber = parseInt(page || '1');
  const {products, totalPages}  = await getPaginatedProductsWithImages({page: pageNumber, gender});
  
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'Artículo de Hombres',
    'women': 'Artículo de Mujeres',
    'kid': 'Artículo de Niños',
    'unisex': 'Artículo para Todos',
  }

  

  return (
    <>
      <Title title={labels[gender]} subtitle="Todos los productos" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}