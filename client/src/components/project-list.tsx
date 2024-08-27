import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Card, Input, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { deleteProject, fetchProjects } from "../features/projectSlice";
import { AppDispatch, RootState } from "../store/store";
import "../styles/project-list.scss";
import moment from "moment";

const ProjectList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const status = useSelector((state: RootState) => state.projects.status);

  const [filters, setFilters] = useState<{
    name?: string;
    dueDate?: string;
    taskAmount?: number;
  }>({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  const handleDelete = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleDueDateChange = (date: moment.Moment | null) => {
    setFilters({
      ...filters,
      dueDate: date ? date.format("YYYY-MM-DD") : undefined,
    });
  };

  const handleTaskAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      taskAmount: e.target.value ? parseInt(e.target.value) : undefined,
    });
  };

  const handleApplyFilters = () => {
    // Filters are already set through state updates
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  // Filter projects based on the filters state
  const filteredProjects = projects.filter((project) => {
    const tasks = project.tasks || []; // Ensure tasks is defined, default to empty array
    const matchesName = filters.name
      ? project.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchesDueDate = filters.dueDate
      ? moment(project.dueDate).format("YYYY-MM-DD") === filters.dueDate
      : true;
    const matchesTaskAmount =
      filters.taskAmount !== undefined
        ? tasks.length == filters.taskAmount
        : true;

    return matchesName && matchesDueDate && matchesTaskAmount;
  });

  return (
    <div className="cont">
      <h3>Projects</h3>

      <div className="filter-controls">
        <Input
          placeholder="Project Name"
          onChange={handleNameChange}
          style={{ marginRight: "1rem" }}
        />
        <DatePicker
          onChange={handleDueDateChange}
          placeholder="Due Date"
          style={{ marginRight: "1rem" }}
        />
        <Input
          type="number"
          placeholder="Number of Tasks"
          onChange={handleTaskAmountChange}
          style={{ marginRight: "1rem" }}
        />
        <Button
          size="large"
          type="primary"
          onClick={handleApplyFilters}
          style={{ marginRight: "1rem" }}
        >
          Apply Filters
        </Button>
        <Button size="large" onClick={handleResetFilters} type="default">
          Reset Filters
        </Button>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={filteredProjects}
        renderItem={(item) => (
          <List.Item key={item?.id}>
            <Card bordered={false} className="project" key={item?.id}>
              <h3>{item?.name}</h3>
              <p>{item?.description}</p>
              <p>{item?.dueDate}</p>
              <div className="btn_grp">
                <Link to={`/projects/${item?.id}`}>View Details</Link>
                <Button
                  onClick={() => handleDelete(item?.id)}
                  danger
                  className="del_btn"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProjectList;
