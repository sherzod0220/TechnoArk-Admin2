import { useSignInMutation } from "../hooks/mutations"
import type { FormProps } from "antd";
import { 
  Button, 
  Form, 
  Input,
 } from "antd";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/login.svg";
import { HappyProvider } from '@ant-design/happy-work-theme'
type FieldType = {
  phone_number: string;
  password: string;
};
const Index = () => {
  const {mutate} = useSignInMutation()
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response: any = mutate(values)
    console.log(response);
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const register = () => {
    navigate("/sign-up");
  };
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-[50%] flex justify-center items-center bg-[#fffef2]">
          <img src={img} alt="" className="w-[50%]" />
        </div>
        <div className="w-[50%] flex justify-center items-center gap-[20px] flex-col px-[50px]">
          <Form
            name="basic"
            style={{ maxWidth: 400, width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
            className="flex flex-col"
          >
            <label className="text-[35px] font-semibold ">Login</label>
            <Form.Item<FieldType>
              label="Phone number"
              name="phone_number"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input type="text" className="py-[10px] text-[16px]" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="py-[10px] text-[16px]" />
            </Form.Item>

            <Form.Item className="">
              <HappyProvider>

              <Button
                type="primary"
                className="py-[20px] text-[18px]"
                htmlType="submit"
                style={{ background: "#d55200", width: "100%" }}
              >
                Login
              </Button>
              </HappyProvider>
            </Form.Item>
          </Form>
          <div className="flex gap-[20px] items-center">
            <p>Don’t you have an account?</p>
            <button onClick={register} className="text-[20px] font-semibold">
              Registrate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;


