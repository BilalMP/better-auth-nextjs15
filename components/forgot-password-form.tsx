"use client";

import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

const ForgotPasswordForm = () => {
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        setIsPending(true);
        const { error } = await authClient.forgetPassword({
            email: data.email,
            redirectTo: "/reset-password",
        });

        if (error) {
            toast("Something went wrong. Please try again later");
        } else {
            toast(
                "If an account exists with this email, you will receive a password reset link."
            );
        }
        setIsPending(false);
    };

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Forgot your password?</CardDescription>
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
                        <Button
                            disabled={isPending}
                            className="w-full"
                            size="lg"
                            type="submit"
                        >
                            Sent Reset Link
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
    );
};

export default ForgotPasswordForm;
