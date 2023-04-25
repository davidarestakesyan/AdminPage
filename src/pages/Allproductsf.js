import { Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
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
   title:'CreatedAt',
   dataIndex:'createdAt',
 },
 {
   title:'UpdatedAt',
   dataIndex:'updatedAt',
 }
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