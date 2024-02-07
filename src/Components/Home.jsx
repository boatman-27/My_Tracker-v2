import { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
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

    fetch(`http://localhost:7001/deleteTask/${taskId}`, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchTasks();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("http://localhost:7001/getTasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:7001/getTasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  };

  // Jobs
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7001/getJobs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const Accpeted = (jobID) => {
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:7001/jobAccepted/${jobID}`, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchJobs();
      })
      .catch((error) => console.error("Error:", error));
  };

  const Rejected = (jobID) => {
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:7001/jobRejected/${jobID}`, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchJobs();
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchJobs = () => {
    fetch("http://localhost:7001/getJobs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white header text-center">Current Tasks</h1>
      <div
        className="flex flex-container space-y-4"
        style={{ marginTop: "50px", marginBottom: "50px" }}
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
      <h1 className="text-white header text-center">Last Jobs I applied to</h1>
      {jobs.length > 0 && (
        <div className="grid" style={{ marginBottom: "90px" }}>
          {jobs.map((job) => (
            <Card
              className="max-w-sm backdrop-blur-xl bg-transparent"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "500px",
                marginTop: "50px",
              }}
              key={job.id}
            >
              <h1 className="text-white header">{job.job_title}</h1>
              <p className="text-white">{job.job_desc}</p>
              <p className="text-white">{job.comp_name}</p>
              <p className="text-white">{job.comp_location}</p>
              <p className="text-white">{job.link}</p>
              <p className="text-white text-center">{job.job_status}</p>
              <div
                className="flex flex-row justify-center items-center"
                style={{ gap: "20px" }}
              >
                <Button color="success" onClick={() => Accpeted(job.id)}>
                  Accepted
                </Button>
                <Button color="failure" onClick={() => Rejected(job.id)}>
                  Rejected
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
