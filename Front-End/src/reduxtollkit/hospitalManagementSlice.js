import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const loginAllUsers = createAsyncThunk(
    'hospitalManagement/loginAllUsers',
    async (userEmailPassword) => {
        // API call simulation
        const response = await axios.post('http://localhost:8000/hospital/auth/login', userEmailPassword)
        localStorage.setItem("role", response.data.role);
        return response.data;
    }
)






export const todayAppointments = createAsyncThunk(
)




const initialState = {

    // admin
    userDetails: [],
    todayAppointments: [],
    totalAppointments: [],
    totalDoctors: [],
    totalPatients: [],
    totalDepartments: [],
    isLoading: false,
}





const hospitalManagementSlice = createSlice({
    name: 'hospitalManagement',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //  login all users
        builder
            .addCase(loginAllUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userDetails = action.payload.data;
            }
            )
            .addCase(loginAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //  admin get all doctors
            
            //
    }
})

export const { increment, decrement, reset } = hospitalManagementSlice.actions

export const hospitalManagementSliceReducer = hospitalManagementSlice.reducer


