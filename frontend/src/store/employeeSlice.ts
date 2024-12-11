import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  department_id: number;
  name: string;
  dob: string;
  phone: string;
  email: string;
  salary: number;
  status: string;
  photo: string;
}

interface EmployeeState {
  employees: Employee[];
  page: number;
  totalPages: number;
  pageSize: number;
}

const initialState: EmployeeState = {
  employees: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<{ employees: Employee[], totalPages: number }>) => {
      state.employees = action.payload.employees;
      state.totalPages = action.payload.totalPages;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setEmployees, setPage, setPageSize } = employeeSlice.actions;
export default employeeSlice.reducer;
