export const revalidate = 604800; // 7 days

import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import { StockLabel, ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontraddo',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontraddo',
      description: product?.description ?? '',
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`/products/${product?.images[1]}`],
    },
  }
}


interface Props {
  params: Promise<{
    slug: string;
  }>
}


export default async function SlugPage({params}: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow 
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>


      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{ product.title }</h1>

        <p className="text-lg mb-5">${ product.price }</p>

        {/* Selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={ 2 } />

        {/* Boton */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>


        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>

        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}