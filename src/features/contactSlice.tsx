import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  feedback: "",
};

const initialState: ContactState = {
  form: initialFormState,
  loading: false,
  error: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setContactFormField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      state.form[action.payload.field as keyof ContactFormState] =
        action.payload.value;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    resetContactForm: () => initialState,
  },
});

export const { fetchStart, setContactFormField, fetchFail, resetContactForm } =
  contactSlice.actions;

export default contactSlice.reducer;
