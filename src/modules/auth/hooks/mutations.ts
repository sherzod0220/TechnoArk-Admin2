import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service";
import { SignIn } from "../types";
import {Notification} from "@notification";
import { useNavigate } from "react-router-dom";
export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data:SignIn) => signIn(data),
        onSuccess:(response) =>{
          const { access_token } = response?.data?.data?.tokens;          
          const { id } = response?.data?.data?.data;
          localStorage.setItem("access_token", access_token)          
          localStorage.setItem("id",id)
          Notification({
            type: "success",
            message: response?.data?.message
          })
          navigate("/main");
        },
        onError: (error) => {
          Notification({
              type: "error",
              message: error?.message
          })
      }
    })
  }


  // ====== sign-up =======