import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllTodayAppointments = createAsyncThunk(
    'doctorControl/getAllTodayAppointments',
    async (_, { rejectWithValue }) => {
        try {
            let response = await axios.get("http://localhost:8000/hospital/doctor/getTodayappointments",
                { withCredentials: true }
            )
            return response.data.data
        } catch (error) {
            rejectWithValue(error.data?.data?.message || 'something went wronge')
        }
    }
)

export const getTodayAllPendingAppointment = createAsyncThunk(
    'doctorControl/getTodayAllPendingAppointment',
    async (_, { rejectWithValue }) => {
        try {
            let response = await axios.get('http://localhost:8000/hospital/doctor/getTodayPendingappointments',
                { withCredentials: true }
            )
            return response.data.data
        } catch (error) {
            rejectWithValue(error.data?.data?.message || 'something went wronge')
        }
    }
)

export const getAllDayAppointment = createAsyncThunk(
    'doctorControl/getAllDayAppointment',
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios("http://localhost:8000/hospital/doctor/getAllDayAppointment", { withCredentials: true })
            console.log(res.data.data , "slice one")
            return res.data.data
        } catch (error) {
            rejectWithValue(error.data?.data?.message || 'something went wrong')
        }
    }
)



export const completeAppointment = createAsyncThunk(
    'doctorControl/completeAppointment',
    async (id, { rejectWithValue }) => {
        try {
            let response = await axios.put("http://localhost:8000/hospital/doctor/completeAppointmentByDoctor",
                { appointmentId: id },
                { withCredentials: true }
            )

            return response.data
        } catch (error) {
            rejectWithValue(error.data?.data?.message || 'something went wrong')
        }
    }
)

export const getDoctorDetails = createAsyncThunk(
    'doctorControl/getDoctorDetails',
    async (_, { rejectWithValue }) => {
        try {
            let response = await axios.get("http://localhost:8000/hospital/doctor/getDoctorDetails",
                { withCredentials: true }
            )

            console.log('i am slice ===> ' , response.data.data)
            return response.data.data

        } catch (error) {
            rejectWithValue(error.data?.data?.message || 'something went wrong')
        }
    }
)


const initialState = {
    doctorTodayAllAppointments: [],
    doctorTodayPendingAppointments: [],
    doctorAllDayTotalAppointments: [],
    doctorsDetails: {},
    isLoading: false
}




const doctorControlSlice = createSlice({
    name: 'doctorControl',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // getAllTodayAppointments by the Doctor
            .addCase(getAllTodayAppointments.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllTodayAppointments.fulfilled, (state, action) => {
                state.doctorTodayAllAppointments = action.payload
            })
            .addCase(getAllTodayAppointments.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            //get all today pending appointment

            .addCase(getTodayAllPendingAppointment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getTodayAllPendingAppointment.fulfilled, (state, action) => {
                state.isLoading = false
                state.doctorTodayPendingAppointments = action.payload
            })
            .addCase(getTodayAllPendingAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })


            // get all day appointment

            .addCase(getAllDayAppointment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllDayAppointment.fulfilled, (state, action) => {
                state.isLoading = false
                state.doctorAllDayTotalAppointments = action.payload
            })
            .addCase(getAllDayAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })


            // complete appointment by doctor

            .addCase(completeAppointment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(completeAppointment.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(completeAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })


            // get Doctors details

            .addCase(getDoctorDetails.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getDoctorDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.doctorsDetails = action.payload
            })
            .addCase(getDoctorDetails.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }

})


export const doctorControlReducer = doctorControlSlice.reducer 