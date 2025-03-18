import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { create } from 'zustand';

async function main() {

    // 1. Borrar registros previos
    // await Promise.all([
    //     prisma.productImage.deleteMany(),
    //     prisma.product.deleteMany(),
    //     prisma.category.deleteMany(),
    // ]);

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Categorias

    const {categories, products} = initialData;

    const categoriesData = categories.map((name) => ({name}));

    await prisma.category.createMany({
        data: categoriesData,
    });


    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);


    // Productos

    products.forEach( async(product) => {
        const { images, type, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            }
        });

        // Images
        const imagesData = images.map((image) => {
            return {
                url: image,
                productId: dbProduct.id,
            }
        });

        await prisma.productImage.createMany({
            data: imagesData,
        });
    });

    




    console.log('Seed ejecutado');
}


(() => {
    if (process.env.NODE_ENV === 'production') return;


    main();
})();