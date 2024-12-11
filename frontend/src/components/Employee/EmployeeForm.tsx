import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Box,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Modal,
} from "@mui/material";
import { employeeValidationSchema } from "../../utils/validations";
import {
  updateEmployee,
  createEmployee,
  getEmployeeById,
  deleteEmployee,
} from "../../services/api";
import { omit } from "lodash";
import { useSelector } from "react-redux";

const DEFAULT_SALARY_AMOUNT = 30000;
interface EmployeeFormValues {
  name: string;
  phone: string;
  email: string;
  salary: number;
  dob: string;
  department_id: number;
  photo: string;
  status: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface Department {
  id: number;
  name: string;
  status: boolean;
}

const EmployeeForm: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { departments } = useSelector((state: any) => state.department);
  
  const navigate = useNavigate();
  const isEdit = Boolean(employeeId);

  const [formValues, setFormValues] = useState<EmployeeFormValues>({
    name: "",
    phone: "",
    email: "",
    salary: DEFAULT_SALARY_AMOUNT,
    dob: "",
    department_id: 1,
    photo: "",
    status: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [departMentValue, setDepartMentValue] = useState<string>(
    departments[0].name || ""
  );
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  console.log;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (isEdit) {
        setLoading(true);
        try {
          const data = await getEmployeeById(Number(employeeId));
          let formData = {
            ...data.employeeData,
            dob: data.employeeData.dob
              ? data.employeeData.dob.split("T")[0]
              : "",
          };
          formData = omit(formData, ["id", "created", "modified"]);
          setFormValues(formData);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch employee data", error);
          setLoading(false);
        }
      }
    };

    fetchEmployeeData();
  }, [employeeId, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDepartMentValue(value);
    console.log("value", value);
    const department = departments.find(
      (dept: Department) => dept.name === value
    );

    if (department) {
      setFormValues((prev) => ({
        ...prev,
        department_id: department.id,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    try {
      employeeValidationSchema.validateSync(formValues, { abortEarly: false });
    } catch (err: unknown) {
      if (err instanceof Error && (err as any).inner) {
        (err as any).inner.forEach(
          (error: { path: string; message: string }) => {
            newErrors[error.path] = error.message;
          }
        );
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isEdit) {
          await updateEmployee(Number(employeeId), formValues);
        } else {
          await createEmployee(formValues);
        }
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(Number(employeeId));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete employee", error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{ padding: 3, maxWidth: 600, margin: "auto", borderRadius: 2 }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            color: "#333",
            fontWeight: 600,
            fontSize: "2rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {isEdit ? "Update Employee Details" : "Add New Employee"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || ""}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-user" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || ""}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-phone" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || ""}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-envelope" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Salary"
                fullWidth
                type="number"
                name="salary"
                value={formValues.salary}
                onChange={handleChange}
                error={!!errors.salary}
                helperText={errors.salary || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                fullWidth
                type="date"
                name="dob"
                value={formValues.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob || ""}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Photo URL"
                fullWidth
                name="photo"
                value={formValues.photo}
                onChange={handleChange}
                error={!!errors.photo}
                helperText={errors.photo || ""}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Department"
                fullWidth
                select
                name="department"
                value={
                  isEdit
                    ? departments.find(
                        (dept: Department) =>
                          dept.id === formValues.department_id
                      )?.name || ""
                    : departMentValue
                }
                onChange={handleDepartmentChange}
                variant="outlined"
                helperText="Select a department"
              >
                {departments.map((department: Department) => (
                  <MenuItem key={department.id} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Status"
                select
                fullWidth
                name="status"
                value={String(formValues.status)}
                onChange={handleChange}
                variant="outlined"
                helperText="Select employee status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {isEdit ? "Update Employee" : "Add Employee"}
                </Button>
              </Box>
            </Grid>
            {isEdit && (
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    Delete Employee
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </CardContent>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: 3,
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this employee?
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              sx={{ flexGrow: 1 }}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenDeleteModal(false)}
              sx={{ flexGrow: 1, borderColor: "blue", color: "blue" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default EmployeeForm;
