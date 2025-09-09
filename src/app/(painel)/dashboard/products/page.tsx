"use server";

import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { ProductContent } from "./_components/product-content";
import { redirect } from "next/navigation";


export default async function Products() {

  const user = await getCurrentUser();

  if(!user) {
    redirect("/signIn");
  }

  return(
    <>
      <ProductContent user={user} />
    </>
  )
}