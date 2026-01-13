import { configureStore } from '@reduxjs/toolkit';
import { hospitalManagementSliceReducer } from './hospitalManagementSlice';
import { doctorControlReducer } from './doctorControlSlice';


export const store = configureStore({
  reducer: {
    hospitalManagement: hospitalManagementSliceReducer,
    doctorControl:doctorControlReducer,
  },
});

