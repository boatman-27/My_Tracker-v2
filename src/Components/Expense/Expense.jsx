import { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import { Card, Button, Select } from "flowbite-react";

const Expense = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expensesData, setExpensesData] = useState({
    title: "",
    content: "",
    amount: 0,
    status: "",
  });

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setExpensesData((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };

  const handleContentChange = (event) => {
    const { value } = event.target;
    setExpensesData((prevFormData) => ({
      ...prevFormData,
      content: value,
    }));
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    setExpensesData((prevFormData) => ({
      ...prevFormData,
      amount: value,
    }));
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setExpensesData((prevFormData) => ({
      ...prevFormData,
      status: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const serializedBody = JSON.stringify(expensesData);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: serializedBody,
    };

    fetch(
      "https://my-tracker-v2-server.vercel.app/registerNewExpense",
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    setExpensesData({
      title: "",
      content: "",
      amount: 0,
      status: "Pending",
    });
    setExpanded(false);
  };

  useEffect(() => {
    fetch("https://my-tracker-v2-server.vercel.app/getExpenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  }, []);

  function expand() {
    if (!isExpanded) {
      setExpanded(true);
    }
  }

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
        <h1 className="text-white header">Expenses</h1>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="ETitle"
                value="Expense Title"
              />
            </div>
            <TextInput
              id="ETitle"
              type="text"
              sizing="sm"
              onClick={expand}
              value={expensesData.title}
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
                value={expensesData.content}
                onChange={handleContentChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label className="text-white" htmlFor="Amount" value="Amount" />
              </div>
              <TextInput
                id="Amount"
                type="number"
                sizing="sm"
                value={expensesData.amount}
                onChange={handleAmountChange}
              />
            </div>
          )}
          {isExpanded && (
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="Status"
                  value="Paid or Received?"
                />
              </div>
              <Select
                id="Status"
                required
                value={expensesData.status}
                onChange={handleStatusChange}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Select>
            </div>
          )}
          {isExpanded && (
            <div className="flex flex-col gap-4">
              <Button type="submit">Add Expense</Button>
            </div>
          )}
        </form>
      </Card>

      <div className="flex flex-row gap-4" style={{ marginTop: "50px" }}>
        <Card
          className="max-w-sm backdrop-blur-xl bg-transparent"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            padding: "10px",
            minWidth: "500px",
          }}
        >
          <h2 className="text-white text-center">Income</h2>
          {expenses
            .filter((expense) => expense.status === "Income")
            .map((incomeItem) => (
              <Card
                key={incomeItem.id}
                className="max-w-sm backdrop-blur-xl bg-transparent self-center text-center"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2 className="text-white">Title: {incomeItem.title}</h2>
                <p className="text-white">Description: {incomeItem.content}</p>
                <p className="text-white">Amount: {incomeItem.amount}</p>
              </Card>
            ))}
        </Card>
        <Card
          className="max-w-sm backdrop-blur-xl bg-transparent"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            padding: "10px",
            minWidth: "500px",
          }}
        >
          <h2 className="text-white text-center">Expenses</h2>
          {expenses
            .filter((expense) => expense.status === "Expense")
            .map((expenseItem) => (
              <Card
                key={expenseItem.id}
                className="max-w-sm backdrop-blur-xl bg-transparent self-center text-center"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2 className="text-white">Title: {expenseItem.title}</h2>
                <p className="text-white">Description: {expenseItem.content}</p>
                <p className="text-white">Amount: {expenseItem.amount}</p>
              </Card>
            ))}
        </Card>
      </div>
    </div>
  );
};

export default Expense;
