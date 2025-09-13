"use server";

import { getCurrentUser } from "@/utils/jwt/getCurrentUser"
import { ProfileContent } from "./_components/profile-content";
import { redirect } from "next/navigation";


export default async function Profile() {

  const user = await getCurrentUser();

  if(!user) {
    redirect("/admin");
  }

  return (
    <>
      <ProfileContent user={user} />
    </>
  )
}