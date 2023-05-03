import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
 } from '@ant-design/icons';
 import {FaProductHunt} from 'react-icons/fa';
 import {HiUsers} from 'react-icons/hi';
 import {BiCategoryAlt} from 'react-icons/bi'
 import {CgProductHunt} from 'react-icons/cg'
 import {MdCategory} from 'react-icons/md'
 import { Button, Layout, Menu, theme } from 'antd';
 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Outlet } from 'react-router-dom';
 const { Header, Sider, Content } = Layout;
 const AdminPagef = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
     token: { colorBgContainer },
   } = theme.useToken();
   const navigate = useNavigate()
   return (
     <Layout>
       <Sider trigger={null} collapsible collapsed={collapsed}>
         <div className="logo" />
         <Menu
         onClick= {({key}) =>{
            if(key === "signout"){

            }else{
              navigate(key)
            }
          }}
           theme="dark"
           mode="inline"
           defaultSelectedKeys={['1']}
           items={[
            {
               key: 'allusers',
               icon: <HiUsers />,
               label: 'Users',
             },
             {
               key: 'allproducts',
               icon: <FaProductHunt />,
               label: 'Products',
             },
         
             {
               key: 'allcategorys',
               icon: <BiCategoryAlt />,
               label: 'Categorys',
             },
             {
              key: 'createcategorys',
              icon: <MdCategory />,
              label: 'Create Categorys',
            },
            {
              key: 'createproducts',
              icon: <CgProductHunt />,
              label: 'Create Products',
            }
           ]}
         />
       </Sider>
       <Layout>
         <Header
           style={{
             padding: 0,
             background: colorBgContainer,
           }}
         >
           <Button
             type="text"
             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
             onClick={() => setCollapsed(!collapsed)}
             style={{
               fontSize: '16px',
               width: 64,
               height: 64,
             }}
           />
         </Header>
         <Content
           style={{
             margin: '24px 16px',
             padding: 24,
             minHeight: 280,
             background: colorBgContainer,
           }}
         >
           Content
           <Outlet/>
         </Content>
       </Layout>
     </Layout>
   );
 };
 export default AdminPagef;