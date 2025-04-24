'use client';

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);


    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Espere...</p>
    }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            priority
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
          />

          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
                <p>{product.size} | {product.title}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector 
                quantity={product.quantity} 
                onQuantityChange={(value) => updateProductQuantity(product, value)}
            />

            <button 
                onClick={() => removeProduct(product)}
                className="underline mt-3"
            >
                Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
