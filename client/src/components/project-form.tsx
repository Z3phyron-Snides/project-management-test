import React, { useState } from "react";
import { Form, Input, Button, Modal, DatePicker, FloatButton } from "antd";
import { useDispatch } from "react-redux";
import { addProject } from "../features/projectSlice";
import { PlusOutlined } from "@ant-design/icons";
import { AppDispatch } from "../store/store";

const ProjectForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(addProject({ name, description, dueDate }));
    handleOk();
  };

  return (
    <div className="ccontainer">
      <FloatButton
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 94 }}
        icon={<PlusOutlined />}
        onClick={showModal}
      />
      <Modal
        open={open}
        title="Title"
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Project Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              onChange={(date) => setDueDate(date?.format("YYYY-MM-DD") || "")}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Project
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectForm;
