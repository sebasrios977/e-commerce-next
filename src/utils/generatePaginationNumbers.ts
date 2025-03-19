

export const generatePagination = (currentPage: number, totalPages: number) => {
    // Si el numero total de paginas es 7 o menos, se mostraran todas las paginas sin puntos suspensivos
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Si la pagina actual esta entre las primeras 3 paginas, entonces mostrar las primeras 3, puntos suspensivos, y las ultimas 2
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // Si la pagina actual esta entre las ultimas 3 paginas, entonces mostrar las primeras 2, puntos suspensivos, y las ultimas 3
    if (currentPage > totalPages - 3) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // Si la pagina actual esta en otro lugar medio, mostrar la primera pagina, puntos suspensivos, la pagina actual, puntos suspensivos, y la ultima pagina
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];

}