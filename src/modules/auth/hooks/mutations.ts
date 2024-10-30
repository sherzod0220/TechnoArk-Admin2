import { useMutation } from "@tanstack/react-query";
import { signIn,signUp,verification } from "../service";
import { SignIn,SignUp,Verification } from "../types";
import {Notification} from "@notification";
import { useNavigate } from "react-router-dom";
import { saveData } from "@token-service";


// ========= Sign In ========
export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data:SignIn) => signIn(data),
        onSuccess:(response) =>{
          // console.log(response,"res");
          const { AccessToken } = response?.data;          
          // const { id } = response?.data;
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

  export function useSignUpMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data:SignUp) => signUp(data),
        onSuccess:(response) =>{
          // console.log(response,"res");
          // const { AccessToken } = response?.data;          
          // const { id } = response?.data;
          // saveData("access_token", AccessToken);
          // saveData("id", id);
          Notification({
            type: "success",
            message: response?.data
          })
          navigate("/verification");
          console.log(response);
          
        },
        onError: (error) => {
          Notification({
              type: "error",
              message: error?.message
          })
      }
    })
  }


  // ====== VERIFICATION =======

  export function useVerification() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data:Verification) => verification(data),
        onSuccess:(response) =>{
          // console.log(response,"res");
          // const { AccessToken } = response?.data;          
          // const { id } = response?.data;
          // saveData("access_token", AccessToken);
          // saveData("id", id);
          Notification({
            type: "success",
            message: response?.data
          })
          navigate("/main");
          console.log(response);
          
        },
        onError: (error) => {
          Notification({
              type: "error",
              message: error?.message
          })
      }
    })
  }

