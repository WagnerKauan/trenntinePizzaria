"use client";

import { Search } from "lucide-react";
import { CardMenuItem } from "./card-menu-item";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/cart/cartSlice";
import { useEffect, useState } from "react";
import { Product } from "@/generated/prisma";

interface AreaMenuProps {
  products: Product[];
}

export function AreaMenu({ products }: AreaMenuProps) {
  const [searchPizza, setSearchPizza] = useState("");
  const [productsFiltered, setProductsFiltered] = useState(products || []);

  const dispatch = useDispatch();

  function handleAddToCart(pizza: Product) {
    dispatch(addProduct(pizza));
  }

  useEffect(() => {
    if (searchPizza) {
      const pizzasFiltered = products.filter((products) =>
        products.name.toLowerCase().includes(searchPizza.toLowerCase())
      );
      setProductsFiltered(pizzasFiltered);
    } else {
      setProductsFiltered(products);
    }
  }, [searchPizza, products]);

  return (
    <section className="mt-40 px-2 xl:px-0">
      <div className="flex items-center justify-center w-full">
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
            value={searchPizza}
            onChange={(e) => setSearchPizza(e.target.value)}
          />
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-12">
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
