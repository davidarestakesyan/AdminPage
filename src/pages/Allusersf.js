import { Table,Button } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBinFill} from 'react-icons/ri';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title:'Action',
    dataIndex:'',
    render: (_, record) => (
      <>
        <Button type='link' onClick={() => console.log('Edit')}>
          <FaEdit />
        </Button>
        <Button type='link' 
        // onClick={() =>deleteProduct(record.id)}
         >
          <RiDeleteBinFill />
        </Button>
      </>
    ),
  },
];




const Allusersf = () => {
  const [users,setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/allusers');
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
  return <Table rowSelection={rowSelection} columns={columns} dataSource={users.map(user => ({ ...user, key: user.id }))} />;
};
export default Allusersf;