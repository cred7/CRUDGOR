import * as Yup from "yup";

export const purchaseSchema = Yup.object().shape({
  purchaseQty: Yup.number()
    .required("Quantity is required")
    .min(1, "Minimum is 1")
    .max(10, "Maximum is 10"),
});

export const palyerDataSchema = Yup.object().shape({
  number: Yup.number()
    .required("Number is required")
    .min(1, "Minimum is 1")
    .max(10, "Maximum is 10"),
  name: Yup.string().required("Name is required"),
  pos: Yup.string().required("Position is required"),
  position: Yup.string().required("Position is required"),
  nickname: Yup.string().required("Nickname is required"),
  bio: Yup.string().required("Bio is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  nationality: Yup.string().required("Nationality is required"),
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
  imageUrl: Yup.string().required("Image URL is required"),
});

// ---------------------------
// ✅ Validation Schemas
// ---------------------------
export const playerSchema = Yup.object().shape({
  number: Yup.number()
    .required("Player number is required")
    .min(1, "Number must be positive"),
  name: Yup.string().required("Full name is required"),
  nickname: Yup.string().optional(),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  nationality: Yup.string().required("Nationality is required"),
  pos: Yup.string().required("Select a position"),
  position: Yup.string().required("Select a position"),
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
  bio: Yup.string().required("Biography is required"),
  imageUrl: Yup.string().required("Image URL required"),
  social: Yup.string().nullable(),
});

export const newsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  date: Yup.date().required("Date is required"),
  excerpt: Yup.string().required("Excerpt is required"),
  imageUrl:
    Yup.string()
    .required("Image URL required"),
  content: Yup.string().required("Content is required"),
});

export const ticketSchema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  date: Yup.date().required("Date is required"),
  competition: Yup.string().required("Competition is required"),
  venue: Yup.string().required("Venue is required"),
  thumbnail: Yup.string()
  .required("Thumbnail is required"),
  description: Yup.string().required("Description is required"),
});
