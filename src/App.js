import React, { useState, useEffect } from "react";
import "./index.css";
import MaterialTable from "material-table";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: "never", // ID should not be editable
    },
    {
      title: "Name",
      field: "name",
      validate: (rowData) => {
        if (!rowData.name) {
          toast.error("Name is required");
          return "Name is required";
        }
        return true;
      },
    },
    {
      title: "Email",
      field: "email",
      validate: (rowData) => {
        if (!rowData.email) {
          toast.error("Email is required");
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(rowData.email)) {
          toast.error("Invalid email format");
          return "Invalid email format";
        }
        return true;
      },
    },
    {
      title: "Phone",
      field: "phone",
      validate: (rowData) => {
        if (!rowData.phone) {
          toast.error("Phone number is required");
          return "Phone number is required";
        }
        return true;
      },
    },
    {
      title: "Website",
      field: "website",
      validate: (rowData) => {
        if (!rowData.website) {
          toast.error("Website is required");
          return "Website is required";
        }
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(rowData.website)) {
        toast.error("Invalid URL format");
        return "Invalid URL format";
      }
        return true;
      },
    },
  ];

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users.splice(0, 5));
    };

    fetchUsersData();
  }, []);

  if (users.length === 0)
    return (
      <div className="loading">
        <p align="center">Loading...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>React-App</h1>
      <div className="inner-container">
        <span></span>
        <p>CRUD Operation with Material Table</p>
        <span></span>
      </div>
      <MaterialTable
        title="Users Informations"
        data={users}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const validationResults = columns.map((column) =>
                column.validate ? column.validate(newRow) : true
              );
              const hasError = validationResults.some(
                (result) => result !== true
              );
              if (!hasError) {
                const updatedRows = [
                  ...users,
                  { id: Math.floor(Math.random() * 100), ...newRow },
                ];
                setTimeout(() => {
                  setUsers(updatedRows);
                  toast.success("Row added successfully");
                  resolve();
                }, 1000);
              } else {
                reject();
              }
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...users];
              updatedRows.splice(index, 1);
              setTimeout(() => {
                setUsers(updatedRows);
                toast.success("Row deleted successfully");
                resolve();
              }, 1000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const validationResults = columns.map((column) =>
                column.validate ? column.validate(updatedRow) : true
              );
              const hasError = validationResults.some(
                (result) => result !== true
              );
              if (!hasError) {
                const index = oldRow.tableData.id;
                const updatedRows = [...users];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                  setUsers(updatedRows);
                  toast.success("Row updated successfully");
                  resolve();
                }, 1000);
              } else {
                reject();
              }
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
