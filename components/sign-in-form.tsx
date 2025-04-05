"use client";

import { signInSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import { ErrorContext } from "better-auth/react";

const SignInForm = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
            },
            {
                onRequest: () => {
                    setIsPending(true);
                },
                onSuccess: async () => {
                    router.push("/");
                    router.refresh();
                },
                onError: (ctx: ErrorContext) => {
                    console.log(ctx);
                    toast("Something went wrong. Please try again later");
                },
            }
        );
        setIsPending(false);
    };
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@example.com"
                                            {...field}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="*****"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-xs hover:underline text-gray-600"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Button
                            disabled={isPending}
                            className="w-full"
                            size="lg"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <Link
                    href="/signup"
                    className="text-xs hover:underline text-gray-600"
                >
                    Create an account
                </Link>
            </CardFooter>
        </Card>
    );
};

export default SignInForm;
