
import { Button, Modal } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { getToDo } from './api/getToDo';
import './App.css';
import TableMap from './Components/TableMapper';
import { toDoListObject, toDoListType } from './types/todoType';

function App() {

  const [toDoList, setToDoList] = useState<toDoListType>([])
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: '',
    title: '',
    description: '',
    due_date: '',
    tag: '',
    status: ''
  });

  useEffect(() => {
    getToDoxhr();
  }, [])

  const getToDoxhr = () => {
    const params = {
      onSuccess,
      page: page
    }
    getToDo(params);
  }

  const addATask = () => {
    setToDoList((curList) => {
      let newTask = {
        createdAt: new Date().toDateString(),
        title: 'add new task',
        description: 'add new description',
        tag: [],
        status: 'OPEN',
        id: (Math.random() * 1000).toString(),
        due_date: new Date().setDate((new Date().getDate() + 1)).toString()
      };
      return [newTask,...curList]
    })
  }

  const deleteTask = (record: toDoListObject) => {
    Modal.confirm({
      title: "Please Confirm if you want to delete this task",
      okText: "Yes, confirm",
      onOk: () => {
        setToDoList((curList) => curList.filter(item => item.id !== record.id))
      },
    })
  }

  const editTask = (record: toDoListObject) => {
    setEditedTask({
      id: record.id,
      title: record.title,
      description: record.description,
      due_date: record.due_date,
      tag: record.tag.toString(),
      status: record.status
    });
    setIsEdit(true);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>, identifier: string)=>{
    setEditedTask(()=>{
      return {
      ...editedTask,
        [identifier]: e.target.value
      }
    })
  }

  const saveEdit= ()=>{
    if(new Date(editedTask.due_date) < new Date()){
      Modal.error({
        title: 'Error',
        content: 'Due date cannot be less than today'
      })
      return
    }
    const tempToDo = toDoList.filter((list)=>editedTask.id!== list.id);
    setToDoList(()=>{
      return [ 
      {
        createdAt: new Date().toDateString(),
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
        due_date: new Date(editedTask.due_date).toString(),
        tag: editedTask.tag.split(','),
        status: editedTask.status
      },
    ...tempToDo];
    });
    setIsEdit(false);
  }

  const onSuccess = (data: toDoListType) => {
    setToDoList(data);
  }

  return (
    <div className="flex justify-center item">
      <div>
        <h1 className='text-3xl my-10 text-blue-500'>TO DO TASK</h1>
        <Button className='mx-auto block' onClick={addATask}>Initialize a Task</Button>
        <Modal
          title="Edit Task"
          visible={isEdit}
          onCancel={() => setIsEdit(false)}
          onOk={() => saveEdit()}
        >
          <div className='flex flex-col gap-2 items-center justify-center'>
            <input className='p-1 border w-full' value={editedTask.title} onChange={(e)=>{handleChange(e,'title')}} type="text" placeholder='Assign task' />
            <input className='p-1 border w-full' value={editedTask.tag} onChange={(e)=>{handleChange(e,'tag')}} type="text" placeholder='add tags' />
            <textarea className='p-1 border block w-full h-[100px]'  value={editedTask.description} onChange={(e)=>{handleChange(e,'description')}} placeholder="Add space seprated tags" />
            <input className='p-1 border block w-full' type="date"  onChange={(e)=>{handleChange(e,'due_date')}}/>
            <select className='p-1 border block w-full' value={editedTask?.status} onChange={(e)=>{handleChange(e,'status')}} name="Status" id="Task">
              <option value="OPEN">OPEN</option>
              <option value="OVERDUE">OVERDUE</option>
              <option value="DONE">DONE</option>
              <option value="WORKING">WORKING</option>
            </select>
          </div>
        </Modal>
        {
          !toDoList ? <h1>Loading...</h1>
            : <TableMap
              addATask={addATask}
              todoList={toDoList}
              deleteTask={deleteTask}
              editTask={editTask}
            />
        }

      </div>
    </div>
  );
}

export default App;

