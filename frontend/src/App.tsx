import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeForm from "./components/Employee/EmployeeForm";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./components/Dashboard/Dashboard";
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route
              path="/add-employee"
              element={<EmployeeForm />}
            />
            <Route
              path="/edit-employee/:employeeId"
              element={<EmployeeForm />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
