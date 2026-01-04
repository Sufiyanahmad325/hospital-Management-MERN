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




export const createDepartment = createAsyncThunk(
    'hospitalManagement/createDepartment',
    async (nameOfDepartment, description) => {
        // API call simulation
        const response = await axios.post('http://localhost:8000/hospital/admin/addDepartment', {
            nameOfDepartment,
            description,
        })
        return response.data;
    }
)

export const todayAllAppointments = createAsyncThunk(
    'hospitalManagement/todayAllAppointments',
    async () => {
        // API call simulation
        const response = await axios.get('http://localhost:8000/hospital/admin/getTodayAppointments',
            { withCredentials: true }
        )
        return response.data;
    }
)





const initialState = {

    // admin
    userDetails: [],
    totalTodayAppointments: [],
    todayPendingCompletedAppointments: [],
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



            // Today all appointments==================================

            .addCase(todayAllAppointments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(todayAllAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                action.payload.data.filter(appointment => {
                    if (appointment.status === 'pending' || appointment.status === 'completed') {
                        state.todayPendingCompletedAppointments.push(appointment);
                    }
                    state.totalTodayAppointments = action.payload.data;
                })
            })
            .addCase(todayAllAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export const { increment, decrement, reset } = hospitalManagementSlice.actions

export const hospitalManagementSliceReducer = hospitalManagementSlice.reducer


