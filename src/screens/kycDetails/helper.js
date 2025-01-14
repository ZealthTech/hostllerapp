import * as Yup from 'yup';
export const kycDetailSchema = Yup.object().shape({
  fatherName: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  address: Yup.string()
    .required('Address is required')
    .min(3, 'Address must be at least 3 characters'),
  occupation: Yup.string(),
  bloodGroup: Yup.string(),
  department: Yup.string(),
  familyPhone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid mobile number')
    .required('Mobile number is required'),
});
export const occupationList = [
  {id: 0, name: 'Professional'},
  {id: 1, name: 'Student'},
  {id: 3, name: 'Others'},
];
export const departmentList = [
  {id: 0, name: 'Government sector'},
  {id: 1, name: 'Private sector'},
  {id: 3, name: 'Others'},
];
export const formatDate = date => {
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const bloodGroups = [
  {label: 'A+', name: 'A+'},
  {label: 'A-', name: 'A-'},
  {label: 'B+', name: 'B+'},
  {label: 'B-', name: 'B-'},
  {label: 'AB+', name: 'AB+'},
  {label: 'AB-', name: 'AB-'},
  {label: 'O+', name: 'O+'},
  {label: 'O-', name: 'O-'},
];
