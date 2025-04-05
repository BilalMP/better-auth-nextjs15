"use server"

import nodemailer from "nodemailer"

export const sendEmail = async ({ to, subject, body }: { to: string, subject: string, body: string }) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: parseInt(process.env.EMAIL_PORT || "587") === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to.toLowerCase().trim(),
        subject: subject,
        text: body
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        if (!info.messageId) {
        throw new Error(`Failed to send email: ${JSON.stringify(info.response)}`)
        }
        return {
            success: true,
            messageId: info.messageId
        }
    } catch (error) {
        console.error(`Email sending error: ${error instanceof Error ? error.message : 'Unknown error'}`, error)
        return {
            success: false,
            message: "Failed to send email. Please check your email settings and try again"
        }
    }
}
