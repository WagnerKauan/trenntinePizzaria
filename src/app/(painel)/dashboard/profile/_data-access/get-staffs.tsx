"use server";

import prisma from "@/lib/prisma";

export async function getStaffs() {
  
  try {

    const staffs = await prisma.user.findMany({
      where: {
        role: "STAFF",
      },
    });

    return staffs;
  } catch (err) {
    return [];
  }
}
