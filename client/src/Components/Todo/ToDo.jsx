import { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import { Card, Button, Select } from "flowbite-react";
import "./todo.css";

const ToDo = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    when: "Today",
  });

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };

  const handleContentChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: value,
    }));
  };

  const handleWhenChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      when: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const serializedBody = JSON.stringify(formData);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: serializedBody,
    };

    fetch(
      "https://my-tracker-v2-server.vercel.app/registerNewTask",
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    setFormData({
      title: "",
      content: "",
      when: "Today",
    });
    setExpanded(false);
  };

  function expand() {
    if (!isExpanded) {
      setExpanded(true);
    }
  }

  const handleCardStyle = () => {
    return window.innerWidth <= 768
      ? { flexDirection: "column" }
      : { flexDirection: "row" };
  };

  const handleDeleteTask = (taskId) => {
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      `https://my-tracker-v2-server.vercel.app/deleteTask/${taskId}`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchTasks();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("https://my-tracker-v2-server.vercel.app/getTasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const fetchTasks = () => {
    fetch("https://my-tracker-v2-server.vercel.app/getTasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ marginTop: "50px", marginBottom: "250px" }}
    >
      <Card
        className="max-w-sm backdrop-blur-xl bg-transparent"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h1 className="text-white header">ToDo List</h1>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label className="text-white" htmlFor="Task" value="Task" />
            </div>
            <TextInput
              id="Task"
              type="text"
              sizing="sm"
              onClick={expand}
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label className="text-white" htmlFor="large" value="Content" />
              </div>
              <TextInput
                id="large"
                type="text"
                sizing="lg"
                value={formData.content}
                onChange={handleContentChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="When"
                  value="When do you want to do this?"
                />
              </div>
              <Select
                id="When"
                required
                value={formData.when}
                onChange={handleWhenChange}
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
                <option>This Month</option>
              </Select>
            </div>
          )}
          {isExpanded && (
            <div className="flex flex-col gap-4">
              <Button type="submit">Add Task</Button>
            </div>
          )}
        </form>
      </Card>
      <div
        className="flex flex-container space-y-4"
        style={{ marginTop: "50px" }}
      >
        <div className="flex space-y-4">
          <div className="flex" style={handleCardStyle()}>
            <Card
              className="max-w-sm backdrop-blur-xl bg-transparent"
              style={{ marginRight: "50px" }}
            >
              <div className="flex flex-col justify-end items-right">
                <h1 className="text-white header">Today's Tasks</h1>
                <div
                  className="flex flex-col gap-4"
                  style={{ minHeight: "80px" }}
                >
                  {tasks
                    .filter((task) => task.priority == "Today")
                    .map((task) => (
                      <div className="flex flex-col gap-4" key={task.id}>
                        <div className="flex items-center">
                          <h2 className="text-white">Title: {task.title}</h2>
                          <span
                            className="cursor-pointer ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            🗑️
                          </span>
                        </div>
                        <p className="text-white">
                          Description: {task.content}
                        </p>
                        <hr className="my-2 border-gray-300" />
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            <Card
              className="max-w-sm backdrop-blur-xl bg-transparent"
              style={{ marginRight: "50px", minHeight: "50px" }}
            >
              <div className="flex flex-col justify-end items-right">
                <h1 className="text-white header">Tomorrow's Tasks</h1>
                <div
                  className="flex flex-col gap-4"
                  style={{ minHeight: "80px" }}
                >
                  {tasks
                    .filter((task) => task.priority == "Tomorrow")
                    .map((task) => (
                      <div className="flex flex-col gap-4" key={task.id}>
                        <div className="flex items-center">
                          <h2 className="text-white">Title: {task.title}</h2>
                          <span
                            className="cursor-pointer ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            🗑️
                          </span>
                        </div>
                        <p className="text-white">
                          Description: {task.content}
                        </p>
                        <hr className="my-2 border-gray-300" />
                      </div>
                    ))}
                </div>
              </div>
            </Card>
            <Card
              className="max-w-sm backdrop-blur-xl bg-transparent"
              style={{ marginRight: "50px" }}
            >
              <div className="flex flex-col justify-end items-right">
                <h1 className="text-white header">This Week's Tasks</h1>
                <div
                  className="flex flex-col gap-4"
                  style={{ minHeight: "80px" }}
                >
                  {tasks
                    .filter((task) => task.priority == "This Week")
                    .map((task) => (
                      <div className="flex flex-col gap-4" key={task.id}>
                        <div className="flex items-center">
                          <h2 className="text-white">Title: {task.title}</h2>
                          <span
                            className="cursor-pointer ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            🗑️
                          </span>
                        </div>
                        <p className="text-white">
                          Description: {task.content}
                        </p>
                        <hr className="my-2 border-gray-300" />
                      </div>
                    ))}
                </div>
              </div>
            </Card>
            <Card
              className="max-w-sm backdrop-blur-xl bg-transparent"
              style={{ marginRight: "50px" }}
            >
              <div className="flex flex-col justify-end items-right">
                <h1 className="text-white header">This Month's Tasks</h1>
                <div
                  className="flex flex-col gap-4"
                  style={{ minHeight: "80px" }}
                >
                  {tasks
                    .filter((task) => task.priority == "This Month")
                    .map((task) => (
                      <div className="flex flex-col gap-4" key={task.id}>
                        <div className="flex items-center">
                          <h2 className="text-white">Title: {task.title}</h2>
                          <span
                            className="cursor-pointer ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            🗑️
                          </span>
                        </div>
                        <p className="text-white">
                          Description: {task.content}
                        </p>
                        <hr className="my-2 border-gray-300" />
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
