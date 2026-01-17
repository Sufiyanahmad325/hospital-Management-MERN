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
            return rejectWithValue(res.data.data.error.message || 'something went wrong')
        }
    }
)





const initialState = {
    upComingAppointment: [],
    completedAppointment: [],
    userDetails: null,
    cancelledAppointment: [],

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


    }
})



export const patientControlReducer = patientControlSlice.reducer