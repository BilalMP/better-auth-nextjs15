import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/action/email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        }
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ user, newEmail, url }) => {
                await sendEmail({
                    to: user.email,
                    subject: "Approve email change",
                    body: `Your email has been changed to ${newEmail}. Click on the link to appove change: ${url}`
                });
            },
        },
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                input: true,
            },
            address: {
                type: "string",
                required: false,
                input: true,
            },
            phoneNumber: {
                type: "string",
                required: false,
                input: true,
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                body: `Click this link to reset your password: ${url}`
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Email Verification",
                body: `Click this link to verify your email: ${url}`
            });
        },
    },
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
