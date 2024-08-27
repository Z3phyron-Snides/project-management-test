import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { List, Button } from 'antd';
import { AppDispatch, RootState } from '../store/store';
import { deleteTask, fetchTasks } from '../features/taskSlice';

interface TaskListProps {
  projectId: string;
}

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    if (projectId && status === 'idle') {
      dispatch(fetchTasks(projectId));
    }
  }, [dispatch, projectId, status]);

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <List
      bordered
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item>
          <div>{item.name}</div>
          <div>{item.description}</div>
          <div>{item.status}</div>
          <Button onClick={() => handleDelete(item.id)} danger>
            Delete
          </Button>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
