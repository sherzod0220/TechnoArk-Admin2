import axiosInstance from "@api";
import { SignIn,SignUp,Verification } from "../types";

// ===== Auth Sign-In=====

export async function signIn(data:SignIn) {
    return await axiosInstance.post("user/login", data)
}

// ===== Auth Sign-Up
export async function signUp(data:SignUp) {
    return await axiosInstance.post("user/register", data)
}


// ===== Auth Verification
export async function verification(data:Verification) {
    return await axiosInstance.post("user/verify_email", data)
}

