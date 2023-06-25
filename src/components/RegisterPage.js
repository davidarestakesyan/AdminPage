import {

  Button,
  Checkbox,
  Form,
  Input
} from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
 wrregisterercol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
 wrregisterercol: {
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
const RegisterPagef = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate()

 
  async function submitRegister(value){
    console.log(value)
      const response = await fetch("http://localhost:5000/register" , {
        // mode:"no-cors",
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          "Content-Type":"application/json;charset=UTF-8",
         },
        
      })

      const data = await response.json();
      console.log(data)
      if(data.message === "Created"){
          navigate('/LoginPage')
      }
 
  }
  
  
  
  
  
  return (
    <div className="registerCont">
      
      <div className="registerChild">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={submitRegister}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <h1>Create Account</h1>
    <Form.Item
        name="username"
        label="Username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input/>
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

      <Form.Item
        
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <strong>agreement</strong>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <p>Have an Account?</p>
        <br/> <Link to={"/LoginPage"}>Login</Link>
      </Form.Item>
    </Form>
    </div>
  </div>
  );
};
export default RegisterPagef;