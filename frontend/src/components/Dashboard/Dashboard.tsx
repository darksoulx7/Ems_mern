import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  fetchDepartmentWiseSalary,
  fetchSalaryRanges,
  fetchYoungestEmployees,
} from "../../services/api";
import { motion } from "framer-motion";

const TABLE_HEAD_STYLE = { backgroundColor: "#3a6a47" };
const CELL_HEAD_STYLE = { color: "#ffffff" };
const CELL_BODY_STYLE_PRIMARY = { color: "#3a6a47" };
const CELL_BODY_STYLE_SECONDARY = { color: "#333333" };
const ODD_ROW_STYLE = { backgroundColor: "#f1a1a1" };
const HOVER_ROW_STYLE = { backgroundColor: "#6fa3d1" };
const DASHBOARD_TITLE_STYLE = {
  textAlign: "center",
  marginBottom: 4,
  fontWeight: 700,
  fontSize: "2.5rem",
  textTransform: "uppercase",
  letterSpacing: 2,
  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
  background: "linear-gradient(45deg, #3a6a47, #6fa3d1)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

interface DepartmentSalary {
  department_name: string;
  highest_salary: string;
}

interface SalaryRange {
  salary_range: string;
  employee_count: string;
}

interface YoungestEmployee {
  department_name: string;
  name: string;
  age: string;
}

const Dashboard: React.FC = () => {
  const [departmentWiseSalary, setDepartmentWiseSalary] = useState<
    DepartmentSalary[] | null
  >(null);
  const [salaryRanges, setSalaryRanges] = useState<SalaryRange[] | null>(null);
  const [youngestEmployees, setYoungestEmployees] = useState<
    YoungestEmployee[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatistics = async () => {
      setLoading(true);
      try {
        const [deptSalary, salaryRange, youngest] = await Promise.all([
          fetchDepartmentWiseSalary(),
          fetchSalaryRanges(),
          fetchYoungestEmployees(),
        ]);
        setDepartmentWiseSalary(deptSalary);
        setSalaryRanges(salaryRange);
        setYoungestEmployees(youngest);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4, backgroundColor: "#f8f8f8" }}>
      <Typography variant="h4" sx={DASHBOARD_TITLE_STYLE}>
        Employee Statistics Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper elevation={6} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: CELL_BODY_STYLE_PRIMARY.color }}>
                Department-wise Highest Salary
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={TABLE_HEAD_STYLE}>
                      <TableCell sx={CELL_HEAD_STYLE}>Department</TableCell>
                      <TableCell sx={CELL_HEAD_STYLE}>Highest Salary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentWiseSalary?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": ODD_ROW_STYLE,
                          "&:hover": HOVER_ROW_STYLE,
                        }}
                      >
                        <TableCell sx={CELL_BODY_STYLE_PRIMARY}>{item.department_name}</TableCell>
                        <TableCell sx={CELL_BODY_STYLE_SECONDARY}>${item.highest_salary}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper elevation={6} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: CELL_BODY_STYLE_PRIMARY.color }}>
                Salary Range Distribution
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={TABLE_HEAD_STYLE}>
                      <TableCell sx={CELL_HEAD_STYLE}>Salary Range</TableCell>
                      <TableCell sx={CELL_HEAD_STYLE}>Employee Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salaryRanges?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": ODD_ROW_STYLE,
                          "&:hover": HOVER_ROW_STYLE,
                        }}
                      >
                        <TableCell sx={CELL_BODY_STYLE_PRIMARY}>{item.salary_range}</TableCell>
                        <TableCell sx={CELL_BODY_STYLE_SECONDARY}>{item.employee_count} Employees</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper elevation={6} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: CELL_BODY_STYLE_PRIMARY.color }}>
                Youngest Employees by Department
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={TABLE_HEAD_STYLE}>
                      <TableCell sx={CELL_HEAD_STYLE}>Department</TableCell>
                      <TableCell sx={CELL_HEAD_STYLE}>Employee Name</TableCell>
                      <TableCell sx={CELL_HEAD_STYLE}>Age</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {youngestEmployees?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": ODD_ROW_STYLE,
                          "&:hover": HOVER_ROW_STYLE,
                        }}
                      >
                        <TableCell sx={CELL_BODY_STYLE_PRIMARY}>{item.department_name}</TableCell>
                        <TableCell sx={CELL_BODY_STYLE_SECONDARY}>{item.name}</TableCell>
                        <TableCell sx={CELL_BODY_STYLE_SECONDARY}>{item.age} years old</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
