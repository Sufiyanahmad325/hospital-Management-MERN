import { configureStore } from '@reduxjs/toolkit';
import { hospitalManagementSliceReducer } from './hospitalManagementSlice';
import { doctorControlReducer } from './doctorControlSlice';
import { patientControlReducer } from './patientControlSlice';


export const store = configureStore({
  reducer: {
    hospitalManagement: hospitalManagementSliceReducer,
    doctorControl:doctorControlReducer,
    patientControl:patientControlReducer
  },
});

