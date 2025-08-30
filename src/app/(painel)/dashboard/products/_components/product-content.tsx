"use server";


import getAllProducts from "../_data-access/get-all-products";
import { ProductsList } from "./product-list";


export async function ProductContent() {
  
    const products = await getAllProducts();

    return(
      <>
        <ProductsList products={products} />
      </>
    )
}


