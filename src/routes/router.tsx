import {
    ProductOutlined,
    SettingOutlined,
    SnippetsOutlined,
    UserOutlined,
    StockOutlined
  } from "@ant-design/icons";

  export const routes = [
    {
      title: "Charts",
      path: "/main/chart",
      icon: <StockOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Products",
      path: "/main",
      icon: <ProductOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Contracts",
      path: "/main/contract",
      icon: <SnippetsOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "User",
      path: "/main/users",
      icon: <UserOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Setting",
      path: "/main/setting",
      icon: <SettingOutlined style={{fontSize: "22px"}}/>,
    },
  ];