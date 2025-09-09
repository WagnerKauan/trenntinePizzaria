"use server";

import { redirect } from "next/navigation";
import { ProfileList } from "./profile-list";
import { User } from "@/generated/prisma";
import { getStaffs } from "../_data-access/get-staffs";


interface ProfileContentProps {
  user: User;
}

export async function ProfileContent({ user }: ProfileContentProps) {

  if(!user) {
    redirect("/signIn");
  }

  const staffs = await getStaffs();

  return (
    <>
      <ProfileList user={user} staffs={staffs} />
    </>
  )
}