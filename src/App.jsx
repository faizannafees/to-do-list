import React from "react";
import ReactDOM from "react-dom/client";
import UserTable from "./components/UserTable";
import ToDoList from "./components/ToDoList";
import { ConfigProvider } from "antd";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import './index.css'

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <ToDoList />
    },
    {
      path: "/users",
      element: <UserTable />
    }
  ])


  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#7d2c27",
              headerColor: "#fff",
            },
          },
        }}
      >
        <RouterProvider router={appRouter} />
      </ConfigProvider>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

