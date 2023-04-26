import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrRegistererCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrRegistererCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const LoginPagef = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  async function submitLogin(value) {
    console.log(value);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json ; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log(data)
    localStorage.setItem("token", data.jwt)
    if (data.status === "Logged in" && data.user.role === 1) {
 
      console.log(123)
      navigate('/AdminPage');
    } else if (
      data.status === "Logged in" &&
      data.role === 0 
    ) {
      navigate("/");
    }
  }

  return (
    <div className="registerCont">
      <div className="registerChild">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={submitLogin}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <h1>Username</h1>
          <Form.Item
            name="username"
            label="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Form.Item valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <p>Don't have an account?</p>
            <br /> <Link to={"/"}>register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginPagef;