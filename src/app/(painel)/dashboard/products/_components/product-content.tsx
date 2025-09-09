"use server";


import { User } from "@/generated/prisma";
import getAllProducts from "../_data-access/get-all-products";
import { ProductsList } from "./product-list";


interface productContentProps {
  user: User;
}

export async function ProductContent({ user }: productContentProps) {
  
    const products = await getAllProducts();

    return(
      <>
        <ProductsList products={products} user={user} />
      </>
    )
}


