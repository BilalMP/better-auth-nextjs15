"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import LoadingButton from "./loading-button";
import { useState } from "react";
import { toast } from "sonner";

const SignOutButton = () => {
    const router = useRouter();
    const [pending, setPending] = useState<boolean>(false);

    const handleSignOut = async () => {
        try {
            setPending(true);
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/sign-in");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast("Failed to sign out");
        } finally {
            setPending(false);
        }
    };

    return (
        <LoadingButton
            pending={pending}
            onClick={handleSignOut}
        >
            Sign Out
        </LoadingButton>
    );
};

export default SignOutButton;
