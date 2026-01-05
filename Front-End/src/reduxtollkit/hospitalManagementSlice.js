import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const loginAllUsers = createAsyncThunk(
    'hospitalManagement/loginAllUsers',
    async (userEmailPassword) => {
        // API call simulation
        const response = await axios.post('http://localhost:8000/hospital/auth/login', userEmailPassword, { withCredentials: true })
        localStorage.setItem("role", response.data.role);
        return response.data;
    }
)




export const createDepartment = createAsyncThunk(
    'hospitalManagement/createDepartment',
    async ({ nameOfDepartmentDescription }) => {
        // API call simulation
        const response = await axios.post('http://localhost:8000/hospital/admin/addDepartment', {
            nameOfDepartmentDescription
        },
            {
                withCredentials: true
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


export const getAllDoctors = createAsyncThunk(
    'hospitalManagement/getAllDoctors',
    async () => {
        // API call simulation
        const response = await axios.get('http://localhost:8000/hospital/admin/getAllDoctors',
            { withCredentials: true }
        )
        return response.data;
    }
)


export const getAllDoctorAppointments = createAsyncThunk(
    'hospitalManagement/getAllDoctorAppointments',
    async () => {
        // API call simulation
        const response = await axios.get('http://localhost:8000/hospital/admin/getAllDoctorAppointments',
            { withCredentials: true }
        )

        console.log('hello all doctor appointments ====> ', response.data)
        return response.data;
    }
)





const initialState = {

    // admin
    userDetails: [],
    totalTodayAppointments: [],
    todayPendingCompletedAppointments: [],
    totalDoctorsAppointments: [],
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

            //  admin get all doctors ===================================

            .addCase(getAllDoctors.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalDoctors = action.payload.doctors;   // array
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // admin Today all appointments==================================

            .addCase(todayAllAppointments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(todayAllAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalTodayAppointments = action.payload.data;

                state.todayPendingCompletedAppointments = action.payload.data.filter(appointment => {
                    if (appointment.status === 'pending' || appointment.status === 'completed') {
                        return appointment;
                    }
                });   // array

            })
            .addCase(todayAllAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // admin get all doctor appointments ================================
            .addCase(getAllDoctorAppointments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllDoctorAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalDoctorsAppointments = action.payload.data;   // array
            })
            .addCase(getAllDoctorAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

           
    }
})

export const { increment, decrement, reset } = hospitalManagementSlice.actions

export const hospitalManagementSliceReducer = hospitalManagementSlice.reducer


