'use client';
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const { getSummaryInformation } = useCartStore()

    const { totalItems, subTotal, tax, total } = getSummaryInformation();

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Espere...</p>;
    }

    if (totalItems === 0) {
        redirect('/empty');
    }
    
  return (
    <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{ totalItems === 1 ? '1 articulo' : `${totalItems} articulos` }</span>

        <span>Subtotal</span>
        <span className="text-right">{ currencyFormat(subTotal) }</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{ currencyFormat(tax) }</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>
    </div>
  );
};
