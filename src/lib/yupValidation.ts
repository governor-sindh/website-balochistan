import * as yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const otpRegex = /^\d{6}$/;
const regNoRegex = /^\d{1,9}$/;
const cnicRegex = /^\d{13}$/;

export const mainFormSchema = yup.object({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Please enter more then 3 characters")
    .max(100, "Character limit reached, maximum allowed characters is 100."),
  fatherName: yup
    .string()
    .required("Father Name is required")
    .min(3, "Please enter more then 3 characters")
    .max(100, "Character limit reached, maximum allowed characters is 100."),
  cnic: yup
    .string()
    .required("CNIC Number is required without -")
    .min(13, "CNIC must be 13 characters.")
    .max(13, "CNIC must be 13 characters."),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Please enter more then 10 characters")
    .max(10, "Character limit reached, maximum allowed characters is 10."),
  city: yup
    .string()
    .required("City is required")
    .min(2, "Please select your City")
    .max(45, "Character limit reached, maximum allowed characters is 45."),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required")
    .max(55, "Character limit reached, maximum allowed characters is 55.")
    .matches(emailRegex, "Email is not valid"),
  otp: yup
    .string()
    .matches(otpRegex, "OTP must be 6 characters")
    .required("Please confirm the one time password sent to your email.")
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "Invalid date of birth")
    .test("dateOfBirth", "You must be at least 12 years old", (value: any) => {
      const currentDate = new Date();
      const userDate = new Date(value);
      const age = currentDate.getFullYear() - userDate.getFullYear();
      if (age > 12) return true;
      return false;
    })
    .typeError("Date of Birth is Required")
    .required("Date of Birth is Required"),

  gender: yup.string().required("Gender is required"),
  highestQualification: yup
    .string()
    .required("Qualification is required")
    .min(2, "Qualification is required"),
});

export const admitCardRequirementsSchema = yup.object({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required")
    .max(55, "Character limit reached, maximum allowed characters is 55.")
    .matches(emailRegex, "Email is not valid"),
  otp: yup
    .string()
    .matches(otpRegex, "OTP must be 6 characters")
    .required("Please confirm the one time password sent to your email.")
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters"),
});

export const regNoRequirementsSchema = yup.object({
  regNo: yup
    .string()
    .required("Registration Number is required")
    .matches(regNoRegex, "Registration Number is not valid"),
  cnic: yup
    .string()
    .required("CNIC Number is required without -")
    .min(13, "CNIC must be 13 characters.")
    .max(13, "CNIC must be 13 characters."),
});
