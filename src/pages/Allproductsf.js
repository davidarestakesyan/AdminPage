import { Table,Button } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

import {FaEdit} from 'react-icons/fa';
import {MdOutlineCreateNewFolder} from 'react-icons/md';
import {RiDeleteBinFill} from 'react-icons/ri';






const columns = [
  {
    title:'Name',
    dataIndex:'name',
  },
  {
    title:'Image',
    dataIndex:'image',
  },
  {
    title:'Description',
    dataIndex:'description',
  },
  {
   title:'Price',
   dataIndex:'price',
 },
  {
   title:'CategoryName',
   dataIndex:'categoryId',
 },
 {
  title:'Action',
  dataIndex:'',
  render: (_, record) => (
    <>
      <Button type='link' onClick={() => console.log('Edit')}>
        <FaEdit />
      </Button>
      <Button type='link' onClick={() => console.log('Save')}>
        { <MdOutlineCreateNewFolder/> }
      </Button>
      <Button type='link' onClick={() => console.log('Delete')}>
        <RiDeleteBinFill />
      </Button>
    </>
  ),
},
//  ,
//  {title : "Actions",
//  render:(_,record)=>{
//   return <>
//   <Button type='link' onClick={() => {
//     setEditRow(record.key);
//     form.setFieldsValue({
//       name:record.name,
//       image:record.image,
//       description:record.description,
//       price:record.price,
//       categoryId:record.categoryId
//     })
//   }}
//   ><FaEdit/></Button>
//   <Button type='link' htmlType='submit'><IoSaveSharp/></Button>
//   <Button 
//   type='link'
//   onClick={() => handleDelete(record.id)}
//   ><RiDeleteBinFill/></Button>
//   </>
//  }
// }
];
 
const Allproductsf = () => {
  const [users,setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/allproducts');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token.jwt,'t');
    try {
      const response = await fetch(
        `http://localhost:5000/deleteproduct/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token.jwt
          },
        }
      );
      // if(response.status === 401 || response.status === 403){
      //   console.log(response.status);
      //   navigate('/');
      // }
      const data = await response.json();
      // setIsDel(!isDel);
    } catch (err) {
      console.log(err);
    }
  };


    fetchUsers();
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={users.map(product => ({ ...product, key:product.id }))} />;
};
export default Allproductsf;