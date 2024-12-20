import { useSignUpMutation } from "../hooks/mutations"
import type { FormProps } from "antd";
import { 
  Button, 
  Form, 
  Input,
 } from "antd";
import { useNavigate } from "react-router-dom";
// import img from "../../../assets/login.svg";
import { HappyProvider } from '@ant-design/happy-work-theme'
type FieldType = {
  username: string;
  password: string;
  address: string;
  email: string;
  full_name: string;
  phone_number: string;
};
import './signin.scss'
const Index = () => {
  const {mutate} = useSignUpMutation()
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
    navigate("/");

  };
  return (
    <>
      <div className="flex h-[100vh] justify-center items-center signin-box box">
          <div className="w-[50%] px-[50px] text-center flex flex-col justify-center items-center h-[100%] bg-[#40404074] backdrop-blur-[10px]">
            <h1 className="text-[56px] font-bold text-[white]">
              Hello, Friend!
            </h1>
            <h1 className="text-[32px] font-bold text-[white] ">
              Register with your personal details to use all of site features.
            </h1>
          </div>
        <div className="w-[50%] h-[100%] flex justify-center items-center gap-[20px] flex-col px-[50px] bg-[#00000074] backdrop-blur-[2px]">
          <div className="w-[700px] bg-sky-50 px-[50px] py-[50px] rounded-[30px]">
          <Form
            name="basic
            style={{  width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
            className="flex flex-col"
          >
            <label className="text-[35px] font-semibold ">Register</label>
            <Form.Item<FieldType>
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input className='py-[5px] text-[16px]'/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input className='py-[5px] text-[16px]'/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Full name"
                name="full_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input className='py-[5px] text-[16px]'/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Phone number"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input className='py-[5px] text-[16px]'/>
            </Form.Item>
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input type="text" className="py-[5px] text-[16px]" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="py-[5px] text-[16px]" />
            </Form.Item>

            <Form.Item className="">
              <HappyProvider>

              <Button
                type="primary"
                className="py-[20px] text-[18px]"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Registrate
              </Button>
              </HappyProvider>
            </Form.Item>
          </Form>
          <div className="flex gap-[20px] items-center">
            <p>You have an account</p>
            <button onClick={register} className="text-[20px] font-semibold">
              Login In
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;


