"use server";

import { cookies } from "next/headers";



export async function clearToken() {

  const cookieStore = await cookies();

  cookieStore.delete("session");
}
