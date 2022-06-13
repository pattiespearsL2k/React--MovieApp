import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('First Name is required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .min(4, 'Name must be at least 6 characters'),
    email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be a valid email"),
    phone: Yup.string()
        .required('Phone is required')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Number phone must be a valid number"),
    address: Yup.string()
        .required('Address is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must be maximum 12 characters')
        .required('Password is required'),
    cfpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm Password is required')
});