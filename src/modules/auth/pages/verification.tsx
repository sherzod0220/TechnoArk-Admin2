import { useVerification } from "../hooks/mutations"
import type { FormProps } from "antd";
import { 
  Button, 
  Form, 
  Input,
 } from "antd";
// import { useNavigate } from "react-router-dom";
import { HappyProvider } from '@ant-design/happy-work-theme'
type FieldType = {
  email: string;
  verifyToken: string;
};
import './signin.scss'
const Index = () => {
  const {mutate} = useVerification()
  // const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response: any = mutate(values)
    console.log(response);
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <>
      <div className="flex h-[100vh] justify-center items-center signin-box box">
        <div className="w-[100%] h-[100%] py-[50px] flex justify-center items-center gap-[20px] flex-col px-[50px] bg-[#0000008e] backdrop-blur-[4px]">
          <div className="w-[700px] bg-sky-50 px-[50px] py-[100px] rounded-[30px]">
          <Form
            name="basic"
            style={{  width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
            className="flex flex-col"
          >
            <label className="text-[35px] font-semibold ">Verification</label>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input type="text" className="py-[10px] text-[16px]" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Verification code"
              name="verifyToken"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input type="text" className="py-[10px] text-[16px]" />
            </Form.Item>

            <Form.Item className="">
              <HappyProvider>

              <Button
                type="primary"
                className="py-[20px] text-[18px]"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Send Verification
              </Button>
              </HappyProvider>
            </Form.Item>
          </Form>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;


