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
        console.log('hahahahhahahaha====> ', response.data.data)
        return response.data.data;
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

export const getAllPatients = createAsyncThunk(
    'hospitalManagement/getAllPatients',
    async () => {
        // API call simulation
        const response = await axios.get('http://localhost:8000/hospital/admin/getAllPatients',
            { withCredentials: true }
        )
        return response.data;
    }
)


export const getAllDepartments = createAsyncThunk(
    'hospitalManagement/getAllDepartments',
    async () => {
        // API call simulation
        const response = await axios.get('http://localhost:8000/hospital/admin/getAllDepartments',
            { withCredentials: true }
        )
        return response.data;
    }
)


export const addDoctor = createAsyncThunk(
    "hospitalManagement/addDoctor",
    async (doctorDetails, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/hospital/admin/addDoctor",
                doctorDetails,
                { withCredentials: true }
            );

            return response.data; // ✅ success
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);


export const addDepartment = createAsyncThunk(
    "hospitalMangement/addDepartment",
    async (departmentDetails, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/hospital/admin/addDepartment', departmentDetails,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "something went wrong")
        }
    }
)

export const editDepartment = createAsyncThunk(
    "hospitalMangement/editDepartment",
    async (departmentDetails, { rejectWithValue }) => {
        try {
            const response = await axios.put('http://localhost:8000/hospital/admin/editDepartmentDetails',
                departmentDetails,
                { withCredentials: true }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "something went wrong")
        }
    }
)

export const deletePatientFromUser = createAsyncThunk(
    'hospitalMangement/deletePatientFromUser',
    async (id, { rejectWithValue }) => {
        console.log('first', id)
        try {
            const response = await axios.post('http://localhost:8000/hospital/admin/deletePatientWithUser',
                id,
                { withCredentials: true }
            )

            return response.data

        } catch (error) {
            return rejectWithValue(error.response?.message || 'something went wronge')
        }
    }
)

export const cancelledAppointmentByAdmin = createAsyncThunk(
    'hospitalMangement/cancelledAppointmentByAdmin',
    async (appointmentId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/hospital/admin/cancelAppointmentByAdmin/${appointmentId}`,
                {},
                { withCredentials: true }
            )
            console.log(response.data, "================>")
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.message || 'something went wrong')
        }
    }
)


export const logoutUser = createAsyncThunk(
    'patientControl/logoutPatient',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8000/hospital/auth/logoutUser',
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
)


export const editDoctorDetailsByAdmin = createAsyncThunk(
    'hospitalMangement/editDoctorDetailsByAdmin',
    async ( {doctorId, doctorDetails} , { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/hospital/admin/editDoctorDetailsByAdmin/${doctorId}`,
                doctorDetails,
                { withCredentials: true }
            )
            return response.data
        }

        catch (error) {
            return rejectWithValue(error.response?.message || 'something went wrong')
        }
    }
)


export const getDoctorDetailsByAdmin = createAsyncThunk(
    'hospitalMangement/getDoctorDetailsByAdmin',
    async ( doctorId , { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/hospital/admin/getDoctorDetailsByAdmin/${doctorId}`,
                { withCredentials: true }
            )
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response?.message || 'something went wrong')
        }
    }
)   


export const changeDoctorPasswordByAdmin = createAsyncThunk(
    'hospitalMangement/changeDoctorPasswordByAdmin',
    async({doctorId , newPassword} , {rejectWithValue})=>{
        console.log(doctorId , newPassword)
        try {
            const res = await axios.put(`http://localhost:8000/hospital/admin/ChangeDoctorPasswordByAdmin/${doctorId}`,
                    {newPassword},
                    {withCredentials:true}
            )

            return res.data

        } catch (error) {
            return rejectWithValue(error.response?.message || 'something went wrong')
        }
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
    isEditDepartment: null
}





const hospitalManagementSlice = createSlice({
    name: 'hospitalManagement',
    initialState,
    reducers: {
        setEditDepartment: (state, action) => {
            state.isEditDepartment = action.payload
        },
        clearSetEditDepartment: (state, action) => {
            state.isEditDepartment = null
        }
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

            // admin get all patients ================================

            .addCase(getAllPatients.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllPatients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalPatients = action.payload.patients;   // array
            })
            .addCase(getAllPatients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // admin get all departments ================================
            .addCase(getAllDepartments.pending, (state, action) => {
                state.isLoading = true;
            })

            .addCase(getAllDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalDepartments = action.payload.data;   // array
            })
            .addCase(getAllDepartments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // admin add doctor

            .addCase(addDoctor.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // admin add departments

            .addCase(addDepartment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.totalDepartments.push(action.payload.department)
                state.isLoading = false;
            })
            .addCase(addDepartment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message;
            })


            // admin  edit department

            .addCase(editDepartment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(editDepartment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isEditDepartment = null
            })
            .addCase(editDepartment.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message;
            })


            // deletePatientFromUser

            .addCase(deletePatientFromUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deletePatientFromUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.totalPatients = action.payload.patients
            })
            .addCase(deletePatientFromUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message;
            })


            // cancelled appointment by user
            .addCase(cancelledAppointmentByAdmin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(cancelledAppointmentByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(cancelledAppointmentByAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message;
            })


            // logout user

            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // edit doctor details by admin

            .addCase(editDoctorDetailsByAdmin.pending, (state, action) => { 
                state.isLoading = true
            }
            )
            .addCase(editDoctorDetailsByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(editDoctorDetailsByAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // get doctor details by admin

            .addCase(getDoctorDetailsByAdmin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getDoctorDetailsByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(getDoctorDetailsByAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            // change doctor password by admin

            .addCase(changeDoctorPasswordByAdmin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(changeDoctorPasswordByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(changeDoctorPasswordByAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

    }
})

export const { setEditDepartment, clearSetEditDepartment } = hospitalManagementSlice.actions

export const hospitalManagementSliceReducer = hospitalManagementSlice.reducer


