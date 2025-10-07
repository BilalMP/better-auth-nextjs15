"use server"

import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/auth";

export const getServerSession = cache(async () => {
    console.log("session")
    return await auth.api.getSession({ headers: await headers() });
});