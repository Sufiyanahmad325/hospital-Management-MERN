import { configureStore } from '@reduxjs/toolkit';
import { hospitalManagementSliceReducer } from './hospitalManagementSlice';

export const store = configureStore({
  reducer: {
    hospitalManagement: hospitalManagementSliceReducer,
  },
});

