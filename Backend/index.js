import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
env.config();

const app = express();
const port = 7001;
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.DOMAIN_1],
  })
);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRESS_URL,
});

async function checkVisited() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT country_code FROM visited_countries"
    );
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    return countries;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

app.post("/registerNewTask", async (req, res) => {
  const client = await pool.connect();
  console.log(req.body);
  const { title, content, when } = req.body;
  res.json({ message: "Task registered successfully" });

  try {
    await client.query(
      "INSERT INTO tasks (title, content, priority) VALUES ($1, $2, $3)",
      [title, content, when]
    );
    res.json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.get("/getTasks", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.delete("/deleteTask/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM tasks WHERE id = $1", [taskId]);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

app.post("/registerNewTravel", async (req, res) => {
  const client = await pool.connect();
  const name = req.body.countryName;
  try {
    const result = await client.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [name.toLowerCase()]
    );
    try {
      const country_code = result.rows[0].country_code;
      await client.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [country_code]
      );
    } catch (error) {
      console.log(error);
      const countries = await checkVisited();
      res.json({ countries: countries, error: "Already Visited" });
    }
  } catch (error) {
    console.log(error);
    const countries = await checkVisited();
    res.json({ countries: countries, error: "Country not found" });
  } finally {
    client.release();
  }
});

app.get("/visited", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM visited_countries");
    res.json({ result: result.rows });
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.post("/registerNewExpense", async (req, res) => {
  console.log(req.body);
  const client = await pool.connect();
  const { title, content, amount, status } = req.body;
  res.json({ message: "Task registered successfully" });

  try {
    await client.query(
      "INSERT INTO expenses (title, content, amount, status) VALUES ($1, $2, $3, $4)",
      [title, content, amount, status]
    );
    res.json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.get("/getExpenses", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM expenses");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.post("/registerNewJob", async (req, res) => {
  const { title, desc, company, location, link, status } = req.body;
  const client = await pool.connect();
  console.log(req.body);

  try {
    await client.query(
      "INSERT INTO jobs (job_title, job_desc, comp_name, comp_location, link, job_status) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, desc, company, location, link, status]
    );
    res.json({ message: "Job added successfully", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

app.get("/getJobs", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM jobs");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.patch("/jobAccepted/:jobId", async (req, res) => {
  const client = await pool.connect();
  const jobId = req.params.jobId;
  try {
    await client.query(
      "UPDATE jobs SET job_status = 'Accepted' WHERE id = ($1)",
      [jobId]
    );
    res.json({ message: "Job Accepted" });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.patch("/jobRejected/:jobId", async (req, res) => {
  const client = await pool.connect();
  const jobId = req.params.jobId;
  try {
    await client.query(
      "UPDATE jobs SET job_status = 'Rejected' WHERE id = ($1)",
      [jobId]
    );
    res.json({ message: "Job Rejected" });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
