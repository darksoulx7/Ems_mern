import * as Yup from "yup";

export const employeeValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  salary: Yup.number()
    .required("Salary is required")
    .positive("Salary must be positive"),
  dob: Yup.date().required("Date of Birth is required"),
  department_id: Yup.number().required("Department is required"),
});
