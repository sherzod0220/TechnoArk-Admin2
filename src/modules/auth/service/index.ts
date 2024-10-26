import axiosInstance from "@api";
import { SignIn } from "../types";
// ===== Auth Sign-In=====

export async function signIn(data:SignIn) {
    return await axiosInstance.post("user/login", data)
}