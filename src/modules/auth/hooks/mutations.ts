import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service";
import { SignIn } from "../types";
import {Notification} from "@notification";
import { useNavigate } from "react-router-dom";
import { saveData } from "@token-service";
export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data:SignIn) => signIn(data),
        onSuccess:(response) =>{
          console.log(response,"res");
          
          const { AccessToken } = response?.data;          
          // const { id } = response?.data?.data?.data;
          
          
          // localStorage.setItem("access_token", access_token)          
          // localStorage.setItem("id",id)
          saveData("access_token", AccessToken);
          // saveData("id", id);
          Notification({
            type: "success",
            message: response?.data?.Message
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