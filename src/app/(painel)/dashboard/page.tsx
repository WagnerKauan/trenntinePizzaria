"use server";

import { getCurrentUser } from "@/utils/jwt/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const user = await getCurrentUser();

  if(!user) {
    redirect("/signIn");
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
    </>
  )
}