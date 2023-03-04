import * as yup from "yup";

export const reservationSchema = yup.object().shape({
  name: yup.string("Please enter your name").required("Required"),
  petType: yup.string("Please enter your pet type").required("Required"),
  phoneNumber: yup
    .number("Please Enter A Number")
    .positive()
    .integer()
    .required("Required"),
  reservedDate: yup.date().required("Required"),
  reservedTime: yup.string().required(),
  description: yup.string(),
});
