import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeState {
  employee: {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    position: string;
    phone: string;
    email: string;
    description: string;
  } | null;
}

const initialState: EmployeeState = {
  employee: JSON.parse(sessionStorage.getItem('employee') || 'null'),
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<EmployeeState['employee']>) => {
      state.employee = action.payload;
      sessionStorage.setItem('employee', JSON.stringify(action.payload));
    },
    clearEmployee: (state) => {
      state.employee = null;
      sessionStorage.removeItem('employee');
    },
  },
});

export const { setEmployee, clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
