import * as Yup from 'yup';
export const kycDetailSchema = Yup.object().shape({
  fatherName: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  address: Yup.string()
    .required('Address is required')
    .min(3, 'Address must be at least 3 characters'),
  occupation: Yup.string()
    .required('Occupation is required')
    .min(3, 'Address must be at least 3 characters'),
  department: Yup.string()
    .required('Department is required')
    .min(3, 'department must be at least 6 characters'),
  familyPhone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid mobile number')
    .required('Mobile number is required'),
});
