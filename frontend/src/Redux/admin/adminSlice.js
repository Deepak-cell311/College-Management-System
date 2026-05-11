import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    // Auth state
    username: null,
    token: null,
    isAuthenticated: false,

    // Data state
    courses: [],
    subjects: [],
    teachers: [],
    students: [],
    notices: [],
    profile: [],

    selectedCourseId: null,
    selectedSubjectId: null,
    selectedTeacherId: null,

    loading: false,
    error: null
};

// Async Thunk for Admin Login
export const adminLogin = createAsyncThunk(
    "admin/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://college-management-system-s6xa.onrender.com/Admin/AdminLogin", credentials);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        // Synchronous reducers if needed
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.profile = [];
            localStorage.removeItem("Admin");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Pending
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Login Fulfilled
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                // Assuming the response structure based on AdminLogin.jsx logic
                // response.data has user details, sometimes nested in response.data.user

                // Adjusting based on common patterns, but trusting payload directly first
                // If API returns { user: {...}, ... }

                if (action.payload.user) {
                    state.profile = action.payload.user;
                    state.username = action.payload.user.adminName || action.payload.user.email; // Fallback
                } else {
                    state.profile = action.payload;
                }

                // If token is returned
                if (action.payload.token) {
                    state.token = action.payload.token;
                }
            })
            // Login Rejected
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    }
});

export const { logout, clearError } = adminSlice.actions;

export default adminSlice.reducer;