"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/auth-client";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, setIsPending] = useState<boolean>();
    const error = searchParams.get("error");
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof resetPasswordSchema>) => {
        setIsPending(true);
        const { error, data } = await authClient.resetPassword({
            newPassword: value.password,
            token: token as string,
        });
        if (error) {
            console.log(error);
            toast("Something went wrong. Please try again later");
        } else {
            toast("Success");
            router.push("/sign-in");
        }
        setIsPending(false);
    };

    if (error === "invalid_token") {
        return (
            <div className="grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-gray-800">
                            Invalid Reset Link
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-center text-gray-600">
                                This password reset link is invalid or has
                                expired.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Suspense>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Reset your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="******"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                className="w-full"
                                size="lg"
                                type="submit"
                            >
                                Reset password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center items-center ">
                    <Link
                        href="/signin"
                        className="text-xs hover:underline text-gray-600"
                    >
                        Already registered?
                    </Link>
                </CardFooter>
            </Card>
        </Suspense>
    );
};

export default ResetPasswordForm;
