import React, { useState } from 'react'
import { toDoListObject, toDoListType } from '../../types/todoType';
import { Button, Table, Tag } from 'antd';
import { dateformatter } from '../../utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type propsType = {
  todoList: toDoListType;
  addATask: () => void;
  deleteTask: (arg: toDoListObject) => void
  editTask: (arg: toDoListObject) => void;
}



const TableMap = (props: propsType) => {
  const { todoList, deleteTask, editTask } = props
  const columns = [
    {
      title: 'Post',
      dataIndex: 'title',
      key: '1'
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: '2',
      render: (tags: string[]) => {
        let tagsArray: any = [];
        tags.map((tag: string, index: any) => {
          tag === "priority"
            ? tagsArray.push(<Tag color="yellow">{tag}</Tag>)
            : tag === "issue" ?
              tagsArray.push(<Tag color="red">{tag}</Tag>)
              : tagsArray.push(<Tag color="blue">{tag}</Tag>)
        })
        return tagsArray;
      }
    },
    {
      title: 'Due Date',
      dataIndex: 'createdAt',
      key: '3',
      sorter: (a: toDoListObject, b: toDoListObject) => parseInt(a.createdAt) - parseInt(b.createdAt),
      render: (text: any) => {
        return (
          <span>{dateformatter(text)}</span>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '4',
      filters: [
        { text: 'OPEN', value: 'OPEN' },
        { text: 'WORKING', value: 'WORKING' },
        { text: 'OVERDUE', value: 'OVERDUE' },
        { text: 'DONE', value: 'DONE' }
      ],
      onFilter: (value: any, record: toDoListObject) => {
        return record.status === value
      }
    },
    {
      key: '5',
      title: 'Action',
      render: (record: toDoListObject) => {
        return <div className='flex gap-2'>
          <EditOutlined  onClick={()=>{editTask(record)}}/>
          <DeleteOutlined onClick={() => { deleteTask(record) }} />
        </div>
      }
    }
  ]



  const [pageSize, setPageSize] = useState<any>(9)
  const [page, setPage] = useState<any>(1)



  return (
    <>
      <div>TableMap</div>

      <Table
        dataSource={todoList}
        columns={columns}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }
        }} />

    </>
  )
}

export default TableMap