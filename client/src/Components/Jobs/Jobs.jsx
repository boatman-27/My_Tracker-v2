import { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import { Card, Button } from "flowbite-react";

const Jobs = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobsData, setJobsData] = useState({
    title: "",
    jobs_desc: "",
    company: "",
    location: "",
    link: "",
    status: "Pending",
  });

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setJobsData((companyData) => ({
      ...companyData,
      title: value,
    }));
  };

  const handleDescChange = (event) => {
    const { value } = event.target;
    setJobsData((companyData) => ({
      ...companyData,
      desc: value,
    }));
  };

  const handleCompanyChange = (event) => {
    const { value } = event.target;
    setJobsData((companyData) => ({
      ...companyData,
      company: value,
    }));
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setJobsData((companyData) => ({
      ...companyData,
      location: value,
    }));
  };

  const handleLinkChange = (event) => {
    const { value } = event.target;
    setJobsData((companyData) => ({
      ...companyData,
      link: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: jobsData.title,
        desc: jobsData.desc, // Update to match the expected field name on the server
        company: jobsData.company,
        location: jobsData.location,
        link: jobsData.link,
        status: jobsData.status,
      }),
    };

    fetch("/registerNewJob", fetchOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    setJobsData({
      title: "",
      desc: "",
      company: "",
      location: "",
      link: "",
      status: "Pending",
    });
    setExpanded(false);
  };

  useEffect(() => {
    fetch("/getJobs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  function expand() {
    if (!isExpanded) {
      setExpanded(true);
    }
  }

  const Accpeted = (jobID) => {
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`/jobAccepted/${jobID}`, fetchOptions)
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
    fetch(`/jobRejected/${jobID}`, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchJobs();
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchJobs = () => {
    fetch("/getJobs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
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
        <h1 className="text-white header">Jobs</h1>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="JTitle"
                value="Job Title"
              />
            </div>
            <TextInput
              id="JTitle"
              type="text"
              sizing="sm"
              onClick={expand}
              value={jobsData.title}
              onChange={handleTitleChange}
            />
          </div>
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="Description"
                  value="Description"
                />
              </div>
              <TextInput
                id="Description"
                type="text"
                sizing="lg"
                value={jobsData.desc}
                onChange={handleDescChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="Company"
                  value="Company"
                />
              </div>
              <TextInput
                id="Company"
                type="text"
                sizing="sm"
                value={jobsData.company}
                onChange={handleCompanyChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="Location"
                  value="Location"
                />
              </div>
              <TextInput
                id="Location"
                type="text"
                sizing="sm"
                value={jobsData.location}
                onChange={handleLocationChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label className="text-white" htmlFor="Link" value="Job Link" />
              </div>
              <TextInput
                id="Link"
                type="text"
                sizing="sm"
                value={jobsData.link}
                onChange={handleLinkChange}
              />
            </div>
          )}
          {isExpanded && (
            <div className="flex flex-col gap-4">
              <Button type="submit">Add Job</Button>
            </div>
          )}
        </form>
      </Card>
      {jobs.length > 0 && (
        <div className="grid">
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

export default Jobs;
