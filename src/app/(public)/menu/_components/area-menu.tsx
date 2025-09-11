"use client";

import { Search } from "lucide-react";
import { CardMenuItem } from "./card-menu-item";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/cart/cartSlice";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface AreaMenuProps {
  products: Product[];
}

export function AreaMenu({ products }: AreaMenuProps) {
  const [searchProducts, setSearchProducts] = useState("");
  const [productsFiltered, setProductsFiltered] = useState(products || []);
  const [selectedCategory, setSelectedCategory] = useState("pizza");

  const dispatch = useDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addProduct(product));
  }

  useEffect(() => {
    if (searchProducts) {
      const productsFiltered = products.filter((products) =>
        products.name.toLowerCase().includes(searchProducts.toLowerCase())
      );
      setProductsFiltered(productsFiltered);
    } else {
      setProductsFiltered(products);
      selectFilter(selectedCategory);
    }
  }, [searchProducts, products]);


  function selectFilter(value: string) {
    setSelectedCategory(value);
    if (value === "pizza") {
      const productsFiltered = products.filter((products) => products.category === "pizza");
      setProductsFiltered(productsFiltered);
    } else if (value === "drink") {
      const productsFiltered = products.filter((products) => products.category === "drink");
      setProductsFiltered(productsFiltered);
    } else {
      setProductsFiltered(products);
    }
  }

  return (
    <section className="mt-42 px-2 xl:px-0">
      <div className="flex flex-col items-center w-full container mx-auto">
        <div
          className="flex items-center w-full max-w-md rounded-full bg-white px-3 shadow-lg border 
          border-gray-200 focus-within:border-primary-normal"
        >
          <label htmlFor="search" className="cursor-pointer">
            <Search size={18} className="text-gray-500" />
          </label>
          <input
            type="search"
            id="search"
            placeholder="Busque por uma pizza..."
            className="ml-2 flex-1 bg-transparent p-2 text-gray-700 placeholder:text-gray-400 focus:outline-none"
            value={searchProducts}
            onChange={(e) => setSearchProducts(e.target.value)}
          />
        </div>

        <div className="self-end">
          <Select defaultValue={selectedCategory} onValueChange={selectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pizza">Pizza</SelectItem>
              <SelectItem value="drink">Bebida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-10">
        {productsFiltered.length > 0 ? (
          productsFiltered.map((product, index) => (
            <CardMenuItem
              key={index}
              product={product}
              addToCard={handleAddToCart}
            />
          ))
        ) : (
          <div>
            <p className="text-center text-gray-400">
              Nenhum produto encontrado
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
