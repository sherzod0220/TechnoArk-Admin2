import {
    AppstoreOutlined,
    TagsOutlined,
    ProductOutlined,
    SettingOutlined,
    // KubernetesOutlined,
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
      icon: <AppstoreOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "User",
      path: "/main/users",
      icon: <TagsOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Setting",
      path: "/main/setting",
      icon: <SettingOutlined style={{fontSize: "22px"}}/>,
    },
  ];