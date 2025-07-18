"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function signupEmailAction(formData: FormData) {
    const name = String(formData.get("name"));
    if (!name) return { error: "Name is required." };
    const username = String(formData.get("username"));
    if (!username) return { error: "Username is required." };
    const email = String(formData.get("email"));
    if (!email) return { error: "Email is required." };
    const password = String(formData.get("password"));
    if (!password) return { error: "Password is required." };

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                username,
            },
        });

        return { error: null };
    } catch (error) {
        if (error instanceof APIError) {
            const errorCode = error.body
                ? (error.body.code as ErrorCode)
                : "UNKNOWN";

            switch (errorCode) {
                case "USER_ALREADY_EXISTS":
                    return {
                        error: "Oops! Something went wrong, please try again.",
                    };
                default:
                    return {
                        error:
                            `${error.message}.` || "An unknown error occurred.",
                    };
            }
        } else {
            return { error: "Internal server error." };
        }
    }
}
