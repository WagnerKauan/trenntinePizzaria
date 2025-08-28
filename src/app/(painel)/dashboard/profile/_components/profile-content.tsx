"use server";

import { redirect } from "next/navigation";
import { getUserInfo } from "../_data-access/get-user-info"
import { ProfileList } from "./profile-list";



export async function ProfileContent({ userId }: { userId: string }) {

  const user = await getUserInfo(userId);

  if(!user) {
    redirect("/signIn");
  }

  return (
    <>
      <ProfileList user={user} />
    </>
  )
}