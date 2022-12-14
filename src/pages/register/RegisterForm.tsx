import { Form, Input, Button, Checkbox } from "antd";
import styles from "./RegisterForm.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

export const RegisterForm = () => {

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
            console.log("Success:", values);
        try {            
            await axios.post("http://123.56.149.216:8080/auth/register",   
                   
            {
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm,
            },
            {
                headers: {
                  "x-icode":"D860A132536E048B",
                }
              },  
            
            );
            navigate("/signIn/");
        } catch (error) {
            alert("Register fail!");
        }    
    };

    const onFinishFaied = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFaied}
          className={styles["register-form"]}
        >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          hasFeedback
          rules={[
            { required: true, message: "Please input your confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject("Your password is incorrect. Please try again.");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
};