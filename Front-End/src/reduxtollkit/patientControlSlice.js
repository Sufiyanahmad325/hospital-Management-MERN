import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



export const getMyProfile = createAsyncThunk(
    'patientControl/getMyProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8000/hospital/patient/getMyProfile',
                { withCredentials: true }
            )
            return res.data.data

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
)

// get upcoming appointment 

export const getUpComingAppointment = createAsyncThunk(
    'patientControl/getUpComingAppointment',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8000/hospital/appointments/getUpComingAppointment',
                { withCredentials: true }
            )
            console.log('i m redux=>>  ', res)
            return res.data.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
)


// get Completed Appointment
export const getCompletedAppointment = createAsyncThunk(
    "patientControl/getCompletedAppointment",
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get('http://localhost:8000/hospital/appointments/getCompleteAppointment',
                { withCredentials: true }
            )
            return res.data.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
)


// get cancell appointment

export const getAllCancelledAppointment = createAsyncThunk(
    'patientControl/getAllCancelledAppointment',
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get('http://localhost:8000/hospital/appointments/getAllCancelledAppointment',
                { withCredentials: true }
            )
            return res.data.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
)


// cancelled pending Appointment







const initialState = {
    upComingAppointment: [],
    completedAppointment: [],
    userDetails: null,
    cancelledAppointment: [],
    doctors:[]

}


const patientControlSlice = createSlice({
    name: 'patientControlSlice',
    initialState,
    reducers: () => {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userDetails = action.payload;
            }
            )
            .addCase(getMyProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            //get upcoming appointment 
            .addCase(getUpComingAppointment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getUpComingAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.upComingAppointment = action.payload;
            }
            )
            .addCase(getUpComingAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // get completed appointment 
            .addCase(getCompletedAppointment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCompletedAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.completedAppointment = action.payload;
            }
            )
            .addCase(getCompletedAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // get total cancelled appointment

            .addCase(getAllCancelledAppointment.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllCancelledAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cancelledAppointment = action.payload;
            }
            )
            .addCase(getAllCancelledAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })




    }
})



export const patientControlReducer = patientControlSlice.reducer