import axios from 'axios';

const API_BASE_URL = '/dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});

export const getEmployees = async (page: number, pageSize: number) => {
  const response = await api.get('/employees', {
    params: { page, pageSize },
  });
  return response.data;
};

export const updateEmployee = async (id: number, data: any) => {
  const response = await api.put(`/employees/${id}`, data);
  return response.data;
};

export const createEmployee = async (data: any) => {
  const response = await api.post(`/employees`, data);
  return response.data;
};


export const deleteEmployee = async (id: number) => {
  const response = await api.delete(`/employee/${id}`);
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get(`/departments/get-all-departments`);
  return response.data;
};

export const getEmployeeById = async (id: number) => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};

export const fetchDepartmentWiseSalary = async () => {
  const response = await axios.get(`/dev/dashboard/department-wise-highest-salary`);
  return response.data;
};

export const fetchSalaryRanges = async () => {
  const response = await axios.get(`/dev/dashboard/salary-range-count`);
  return response.data;
};

export const fetchYoungestEmployees = async () => {
  const response = await axios.get(`/dev/dashboard/youngest-by-department`);
  return response.data;
};
