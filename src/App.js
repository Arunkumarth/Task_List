
import 'antd/dist/reset.css';
import { Button, Table, Tag, Modal, Input, DatePicker, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDataStart,addData, editData, deleteData } from './dataSlice';
// import dayjs from 'dayjs';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskname, settaskname] = useState('');
  const [taskcomment, settaskcomment] = useState('');
  const [taskdue, settaskdue] = useState('');
  const [taskstatus, settaskstatus] = useState('');
  const tasks = useSelector(state => state.data.data);
  const dispatch = useDispatch();
  const [isEdting, setisEditing] = useState(false);
  const [row, setrow] = useState('');

  useEffect(() => {
    dispatch(fetchDataStart());
  }, [tasks,dispatch]);






  const { TextArea } = Input;

  function addname(e) {
    settaskname(e.target.value);

  }
  function addtaskcomment(e) {
    settaskcomment(e.target.value);

  }


  const onChange = (value) => {
    settaskstatus(value);

  };

  const onSearch = (value) => {
  };

  const hanleDate = (date, dateString) => {

    // const date = value.toLocaleString("en-IN")
    // const options = { dateStyle: 'short', timeStyle: 'short',timeZoneName:"short" };
    // const formattedDate = dateString.toLocaleString('en-IN', options);
    const datejson = JSON.stringify(dateString);
    console.log(datejson);
    settaskdue(datejson);


  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  var handleOk = () => {
    if (isEdting) {
      console.log('EDITING PROGRESS');



      dispatch(editData({
        _id: row,
        name: taskname,
        comment: taskcomment,
        due_date: taskdue,
        status: taskstatus
      }))
      settaskname('');
      settaskcomment('');
      settaskdue('');
      settaskstatus('');
      setIsModalOpen(false);
      setrow('');
      setisEditing(false);
    }

    else {
      console.log('ADDING PROGRESS');



      dispatch(addData({
        name: taskname,
        comment: taskcomment,
        due_date: taskdue,
        status: taskstatus
      }))
      settaskname('');
      settaskcomment('');
      settaskdue('');
      settaskstatus('');
      setIsModalOpen(false);


    }

  };

  const handleCancel = () => {
    settaskname('');
    settaskcomment('');
    settaskdue('');
    settaskstatus('');
    setIsModalOpen(false);
  };

  const handleedit = (rowid) => {
    settaskname(rowid.name);
    settaskcomment(rowid.comment);
    settaskdue(rowid.due_date);
    settaskstatus(rowid.status);

    setrow(rowid._id);
    setisEditing(true);



    //  }} );


    setIsModalOpen(true);
  }

  const handledelete = (rowid) => {
    dispatch(deleteData(rowid));


  }



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Tasks',
      dataIndex: 'comment',
    },
    {
      title: 'Due date',
      dataIndex: 'due_date',
      key: 'due',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'tags',
      render: (text) => {
        if (text === 'COMPLETED') {
          var color = 'green';
        }
        else if (text === 'IN-PROGRESS') {
          color = 'geekblue';
        }
        else {
          color = 'volcano';
        }

        return (<Tag color={color} key={text}>{text.toUpperCase()}</Tag>)

      }
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <Button type='link' onClick={() => handleedit(record)}><EditOutlined style={{ fontSize: '16px', color: '#08c', marginLeft: '-15px' }} theme="outlined" /></Button>
            <Button type='link' onClick={() => handledelete(record)} ><DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} theme="outlined" /></Button>

          </>

        )
      }

    },

  ];


  return (
    <>
      <div className="App">
        <h1>Task list</h1>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>

      </div>

      <Table dataSource={tasks} columns={columns} />

      <Modal title="Your Task list" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
        <Input placeholder="Name" onChange={addname} value={taskname} />
        <br />
        <br />
        <TextArea rows={6} placeholder="Your tasks" maxLength={16} value={taskcomment} onChange={addtaskcomment} />
        <br />
        <br />
        <DatePicker onChange={hanleDate} placeholder="Select due date" />

        <br />
        <br />
        <Select

          showSearch
          placeholder="Select Task status"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          // defaultValue={taskstatus}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'COMPLETED',
              label: 'COMPLETED',
            },
            {
              value: 'IN-PROGRESS',
              label: 'IN-PROGRESS',
            },
            {
              value: 'NOT STARTED',
              label: 'NOT STARTED',
            },
          ]}
        />


      </Modal>


    </>
  );



}


export default App;