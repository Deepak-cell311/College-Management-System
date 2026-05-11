import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";

const store = configureStore({
    reducer: {
        admin: adminReducer
    }
});

export default store;
