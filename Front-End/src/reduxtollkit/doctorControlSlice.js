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


const initialState = {
    doctorTodayAllAppointments: [],
    doctorTodayPendingAppointments: [],
    doctorTodayCompleteAppointment: [],
    doctorAllDayTotalAppointments: [],
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
                state.doctorTodayPendingAppointments = action.payload
            })
            .addCase(getTodayAllPendingAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })


    }

})


export const doctorControlReducer = doctorControlSlice.reducer 