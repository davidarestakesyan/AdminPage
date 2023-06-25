import React from 'react'
import { Table, Typography , Space, Button, Form,Input} from 'antd';
import { useState , useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import Item from 'antd/es/list/Item';

const Allproductsf = () => {
  
  const [products, setProducts] = useState([]);
  const [editRow, setEditRow] = useState(null)
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const token = localStorage.getItem('token')
  // const parsedToken = JSON.parse(token) 
  // console.log(parsedToken);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/allusers',{
            headers: {
            "Authorization": token,
            "Content-Type":"application/json"
        }
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    // if (formSubmitted) {
    //   fetchproducts();
    //   setFormSubmitted(false);
    //}
    fetchproducts()
  }, []);
  

  // useEffect(() => {
  //   const fetchproducts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/allusers');
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchproducts();
  // }, []);

  
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteuser/${productId}`,
  
      {  
        method: 'DELETE',
        headers: {
          "Authorization": token,
          "Content-Type":"application/json"
      }
      });
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        console.error(response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

   const successDelete = (productId)=> {
    const index = products.findIndex((Item )=>Item.id === productId )
    const newData = [...products]
    newData.splice(index,1)
    setProducts(newData)
    handleDelete(productId)
    
  }

  const onFinish = async (values) =>{
    const updatedDataSource =[...products]
    const index = updatedDataSource.findIndex((user) => user.id === editRow)
    updatedDataSource.splice(index,1,{...values, key: editRow})
    setProducts(updatedDataSource)
    setEditRow(null)}
  console.log(products)

  return (
      <div className='center'>
        <Form form={form} onFinish={onFinish}>
        <Space size={20}>
          <Typography.Title level={4} >Inventory</Typography.Title>
          <Table  columns={[
            {title : "UserName",
             dataIndex: "username",
             render:(text, record)=>{
              if(editRow === record.key){
               return (
               <Form.Item 
               name="username"
               rules = {[{
                required: true,
                message: "Please enter product name",
               }]}
               >
                <Input/>
                </Form.Item>
               )
              }else{
                return <p>{text}</p>
              }
             }
            },
            {title : "role",
             dataIndex: "role",
             render:(text, record)=>{
              if(editRow === record.key){
               return (
               <Form.Item 
               name="role"
               rules = {[{
                required: true,
                message: "Please enter role",
               }]}
               >
                <Input/>
                </Form.Item>
               )
              }else{
                return <p>{text}</p>
              }
             }
            },
            {title : "Actions",
             render:(_,record)=>{
              return <>
              <Button type='link' onClick={() => {
                setEditRow(record.key);
                form.setFieldsValue({
                  username:record.username,
                role:record.role
                })
                {console.log(products.username)};
              }}
              
              ><AiOutlineEdit/></Button>
              <Button type='link' htmlType='submit'><AiOutlineSave/></Button>
              <Button 
              type='link'
              onClick={() => successDelete(record.id)}
              ><AiOutlineDelete/></Button>
              </>
             }
            },
          ]}
          dataSource={products.map(product => ({ ...product, key: product.id }))}
          >
          </Table>
        </Space>
        </Form>
     </div>
  )
}

export default Allproductsf