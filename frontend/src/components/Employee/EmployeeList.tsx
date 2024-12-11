import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  TablePagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getEmployees, getDepartments } from '../../services/api';
import { setDepartments } from '../../store/departmentSlice';
import { setEmployees, setPage, setPageSize } from '../../store/employeeSlice';

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const { employees, page, totalPages, pageSize } = useSelector(
    (state: any) => state.employee
  );

  const { isLoading, error } = useQuery(
    ['employees', page, pageSize],
    () => getEmployees(page, pageSize),
    {
      onSuccess: (data) => {
        dispatch(
          setEmployees({ employees: data.employees, totalPages: data.totalPages })
        );
      },
    }
  );

  useQuery('departments', getDepartments, {
    onSuccess: (data) => {
      dispatch(setDepartments(data));
    },
  });

  const handleChangePage = (event: unknown, selectedPage: number) => {
    dispatch(setPage(selectedPage + 1));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
    dispatch(setPage(1));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <Box>
      <Button
        component={Link}
        to="/add-employee"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-employee/${employee.id}`}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPages * pageSize}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EmployeeList;
