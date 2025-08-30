"use server";

import { OrdersList } from "./orders-list";


export async function OrdersContent() {

  return (
    <>
      <OrdersList />
    </>
  )
} 