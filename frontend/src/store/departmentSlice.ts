import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Department {
  id: number;
  name: string;
  status: boolean;
}

interface DepartmentState {
  departments: Department[];
}

const initialState: DepartmentState = {
  departments: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<Department[]>) => {
      state.departments = action.payload;
    },
  },
});

export const { setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
