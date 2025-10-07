import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(20, { message: "Name must be at most 20 characters" }),
    email: z.string({ message: "Email should be text and required" }).includes("@", { message: "Invalid email" }),
    address: z.string({ message: "Address is required" }).min(2, { message: "Address must be at least 2 characters" }).max(20, { message: "Address must be at most 20 characters" }),
    phoneNumber: z.string({ message: "Phone Number is required" }).min(2, { message: "Phone Number must be at least 2 characters" }).max(10, { message: "Phone Number must be at most 10 characters" }),
    password: z.string({message:"Password is required"}).min(8,{message:"Password must be at least 8 characters"}).max(20,{message:"Password must be at most 20 characters"}),
    confirmPassword: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Password must be at most 20 characters" }), 
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"]
});

export const signInSchema = z.object({
    email: z.string({ message: "Email should be text and required" }).includes("@", { message: "Invalid email" }),
    password: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Password must be at most 20 characters" }),
});

export const forgotPasswordSchema = z.object({
    email: z.string({ message: "Email should be text and required" }).includes("@", { message: "Invalid email" }),
});

export const resetPasswordSchema = z.object({
    password:z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Password must be at most 20 characters" }),
    confirmPassword: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).max(20, { message: "Password must be at most 20 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
});