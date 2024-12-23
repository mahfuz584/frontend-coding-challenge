"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  useEffect(() => {
    const productId = searchParams.get("id");

    if (productId) {
      const product = PRODUCTS_DATA.find((prod) => prod.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [searchParams]);

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      router.push(`/products?id=${product.id}`);
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push("/products");
  }, [router]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
