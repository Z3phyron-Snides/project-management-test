import React, { useState } from "react";
import { Form, Input, Button, Select, FloatButton, Modal } from "antd";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { PlusOutlined } from "@ant-design/icons";
import { AppDispatch } from "../store/store";

interface TaskFormProps {
  projectId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );

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
    dispatch(addTask({ projectId, name, description, status }));
    handleOk();
  };

  return (
    <>
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
          <Form.Item label="Task Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select value={status} onChange={(value) => setStatus(value)}>
              <Select.Option value="pending">To Do</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="completed">Done</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default TaskForm;
