'use server';

import { ValidType } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";


interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
    gender,
}: PaginationOptions) => {

    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;

    try {
        // 1. Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                productImage: {
                    select: {
                        url: true,
                    }
                },
                category: {
                    select: {
                        name: true,
                    }
                }
            },
            where: {
                gender: gender,
            }
        });

        // 2. Obtener el total de paginas
        const totalCount = await prisma.product.count({
            where: {
                gender: gender,
            }
        });
        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.productImage.map(image => image.url),
                type: product.category.name.toLowerCase() as ValidType,
            })),
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos, error' + error);
    }
}