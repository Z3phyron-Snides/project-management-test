import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { Task } from "./taskSlice";

interface Project {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  tasks: Task[];
}

interface ProjectState {
  project: Project | null;
  projects: Project[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axiosInstance.get("/projects");
    // console.log({response})
    return response.data.projects;
  }
);

// Async thunk to add a new project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (newProject: {
    name: string;
    description: string;
    dueDate: string;
  }) => {
    const response = await axiosInstance.post("/projects", newProject);
    return response.data.project;
  }
);
export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (projectId: string) => {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data.project;
  }
);

// Async thunk to delete a project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string) => {
    await axiosInstance.delete(`/projects/${projectId}`);
    return projectId;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(addProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = [...state.projects, action.payload];
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add project";
      })
      .addCase(getProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload)
        state.project = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed fetch project";
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete project";
      });
  },
});

export default projectSlice.reducer;
