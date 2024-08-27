import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: "pending"| "in-progress"| "completed";
}

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch tasks for a specific project
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (projectId: string) => {
    const response = await axiosInstance.get(`/tasks/${projectId}`);
    return response.data.tasks;
  }
);

// Async thunk to add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask: { projectId: string; name: string; description: string; status: "pending"| "in-progress"| "completed" }) => {
    const response = await axiosInstance.post(`/tasks/${newTask.projectId}/tasks`, newTask);
    return response.data.task;
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await axiosInstance.delete(`/tasks/${taskId}`);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add task';
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export default taskSlice.reducer;
