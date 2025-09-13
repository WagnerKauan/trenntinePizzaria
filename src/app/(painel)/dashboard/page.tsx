import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { redirect } from "next/navigation";
import { OrdersContent } from "./_components/orders-content";

export default async function Dashboard() {

  const user = await getCurrentUser();

  if(!user) {
    redirect("/admin");
  }

  return (
    <>
      <OrdersContent />
    </>
  )
}