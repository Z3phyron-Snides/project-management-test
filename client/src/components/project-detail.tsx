import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getProjectById } from "../features/projectSlice";
import { fetchTasks } from "../features/taskSlice";
import TaskForm from "./task-form";
import TaskList from "./task-list";
import "../styles/project-detail.scss";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const project = useSelector((state: RootState) => state.projects.project);

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
      dispatch(fetchTasks(id));
    }
  }, [dispatch, id]);

  return (
   id && project && (
      <div className="wrapper">
        <header>
          <h1> {project.name}</h1>
          <p>{project.description}</p>
          <p>{project.dueDate}</p>
        </header>

        <div className="content">
          <TaskForm projectId={id} />
          <TaskList projectId={id} />
        </div>
      </div>
    )
  );
};

export default ProjectDetails;
