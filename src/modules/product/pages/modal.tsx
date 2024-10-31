import { useEffect } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
// import {Notification} from "@notification";
// import { CategoryService } from "@service";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { CategoryType } from "../types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutation";

interface PropType {
  open: boolean,
  handleCancel:()=> void,
  update: any,
}
const UpdateCreateCategoryModal = ({ open, handleCancel, update }:PropType) => {

//   const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreateing } = useCreateCategory()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory()
  useEffect(() => {
    if (update.name) {
      form.setFieldsValue({
        name: update.name,
        color: update.color,
        made_in: update.made_in,
        model: update.model,
        date_of_creation: update.date_of_creation
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);

  const handleSubmit = async(values: CategoryType) => {
    // setLoading(true);
    // console.log(category.id,"id");
    // console.log(category.name,"categpry name");
    
    if (update.id) {
      // Update the category
      const payload = { ...values, id: update?.id }
      updateMutate(payload, {
          onSuccess: () => {
              handleCancel()
          }
      })
    } else {
      // Create a new category
      createMutate(values, {
        onSuccess: () => {
            handleCancel();
        }
    });

    //   console.log("Creating category:", values);
    }
    // setLoading(false);
    handleCancel(); // Close the modal after submission
  };
  return (
    <>
      <Modal
        open={open}
        title={update.id ? "Edit category" : "Create category"}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Product name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Product Model"
            name="model"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Made in"
            name="made_in"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image_url"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" type="file"/>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date_of_creating"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <DatePicker
              style={{width:"100%"}}
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item>
            <HappyProvider>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={isCreateing || isUpdating}
            >
              {update.id ? "Update" : "Add"}
            </Button>
            </HappyProvider>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateCreateCategoryModal;