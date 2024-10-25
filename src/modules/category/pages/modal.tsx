import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
// import {Notification} from "@notification";
// import { CategoryService } from "@service";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { CategoryType } from "../types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutation";

interface PropType {
  open: boolean,
  handleCancel:()=> void,
  category: any,
}
const UpdateCreateCategoryModal = ({ open, handleCancel, category }:PropType) => {

//   const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreateing } = useCreateCategory()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory()
//   console.log(category, 'category')
  useEffect(() => {
    if (category.name) {
      form.setFieldsValue({
        name: category.name,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleSubmit = async(values: CategoryType) => {
    // setLoading(true);
    // console.log(category.id,"id");
    // console.log(category.name,"categpry name");
    
    if (category.id) {
      // Update the category
      const payload = { ...values, id: category?.id }
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
        title={category.id ? "Edit category" : "Create category"}
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
            label="Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
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
              {category.id ? "Update" : "Add"}
            </Button>
            </HappyProvider>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateCreateCategoryModal;