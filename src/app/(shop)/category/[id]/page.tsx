import { ProductGrid, Title } from "@/components";
import { ValidGender } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: ValidGender;

  }
}

export default async function({ params }: Props) {

  const { id } = await params;

  
  if ( id !== 'men' && id !== 'women' && id !== 'kid' && id !== 'unisex') {
    notFound();
  }

  const labels: Record<ValidGender, string> = {
    men: 'Artículo de Hombres',
    women: 'Artículo de Mujeres',
    kid: 'Artículo de Niños',
    unisex: 'Artículo para Todos',
  }

  const products = initialData.products.filter(product => product.gender === id);

  return (
    <>
      <Title title={labels[id]} subtitle="Todos los productos" />

      <ProductGrid products={products} />
    </>
  );
}