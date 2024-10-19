import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service";
import { SignIn } from "../types";
import Notification from "@notification";
import { useNavigate } from "react-router-dom";
export function useSignInMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data:SignIn) => signIn(data),
        onSuccess:(response) =>{
            // if (response && response.status === 201) {     
            //     Notification({
            //         type: "success",
            //         title:"Chotki"
            //     });
            //     navigate("/main");
            // }
            if (response && response.status === 201) {
                Notification({
                  title: "Login successfully!",
                  type: "success",
                });
                const data = response.data?.data;
                if (data && data.tokens && data.tokens.access_token) {
                  const {
                    tokens: { access_token },
                  } = data;
                //   saveData("access_token", access_token);
                //   saveData("id", data?.data?.id);
                  navigate("/main");
                  console.log(response,"response");
                  console.log(data.data.id, "tokedata");
                } else {
                  console.error(
                    "Tokens or access_token is missing in the response data"
                  );
                  Notification({
                    type: "error",
                    title: 'Tokens or access_token is missing in the response data'
                  })
                }
              } else {
                console.error(`Unexpected response status: ${response?.status}`);
                Notification({type: "error",title: `Erro!  Unexpected response status: ${response?.status}`})
              }
        }
    })
}