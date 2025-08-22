"use client";

import { Pizza } from "@/types";
import { Search } from "lucide-react";
import { CardMenuItem } from "./card-menu-item";
import { useDispatch } from "react-redux";
import { addPizza } from "@/store/cart/cartSlice";
import { useEffect, useState } from "react";

interface AreaMenuProps {
  pizzas: Pizza[];
}

export function AreaMenu({ pizzas }: AreaMenuProps) {
  const [searchPizza, setSearchPizza] = useState("");
  const [pizzasFiltered, setPizzasFiltered] = useState(pizzas || []);

  const dispatch = useDispatch();

  function handleAddToCart(pizza: Pizza) {
    dispatch(addPizza(pizza));
  }

  useEffect(() => {
    if (searchPizza) {
      const pizzasFiltered = pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchPizza.toLowerCase())
      );
      setPizzasFiltered(pizzasFiltered);
    } else {
      setPizzasFiltered(pizzas);
    }
  }, [searchPizza, pizzas]);

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

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {pizzasFiltered.length > 0 ? (
          pizzasFiltered.map((pizza, index) => (
            <CardMenuItem
              key={index}
              pizza={pizza}
              addToCard={handleAddToCart}
            />
          ))
        ) : (
          <div>
            <p className="text-center text-gray-400">
              Nenhuma pizza encontrada
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
