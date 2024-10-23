import { notification } from "antd";

type Notification = {
   type: "success" | "info" | "warning" | "error";
   message?: string;
   description?: string;
   placement?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
};

export const Notification = ({
   type,
   message,
   description,
}: Notification): void => {
   notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 2,
      showProgress: true,
   });
};