import React from "react";
import { Typography,} from "antd";
import "../styles/home-page.scss";
import ProjectForm from "../components/project-form";
import ProjectList from "../components/project-list";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <header>
        <Title>Welcome to the Project Management App</Title>
        <Paragraph>
          Manage your projects and tasks efficiently with our simple and
          intuitive application. Create, track, and complete tasks with ease.
        </Paragraph>
      </header>

      <ProjectList />

      <ProjectForm />
    </div>
  );
};

export default HomePage;
