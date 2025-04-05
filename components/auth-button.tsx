"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./sign-out-button";

const AuthButton = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending) {
        return <div>Loading ... </div>;
    }

    const session = data;

    return !session ? (
        <div className="flex gap-2 justify-center">
            <Link href={"/sign-in"}>
                <Button>Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
                <Button>Sign Up</Button>
            </Link>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <SignOutButton />
        </div>
    );
};

export default AuthButton;
