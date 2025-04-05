import { object, string } from "zod"

const getPasswordSchema = (type: "Password" | "Confirm Password") =>
    string({ required_error: `${type} is required`})
        .min(8, `${type} must be atleast 8 characters`)
        .max(32, `${type} must at most 32 characters`);

const getEmailSchema = () =>
    string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("invalid email address");

const getNameSchema = () =>
    string({ required_error: "Name is required" })
        .min(1, "Name is required")
        .max(50, "Name must be at least 50 characters");

export const signUpSchema = object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("Password"),
    confirmPassword: getPasswordSchema("Confirm Password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"]
});

export const signInSchema = object({
    email: getEmailSchema(),
    password: getPasswordSchema("Password")
});

export const forgotPasswordSchema = object({
    email: getEmailSchema(),
});

export const resetPasswordSchema = object({
    password: getPasswordSchema("Password"),
    confirmPassword: getPasswordSchema("Confirm Password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
});