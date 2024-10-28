import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import taskReducer from "../slices/taskSlice";
const rootReducers = combineReducers({
    auth: userReducer,
    profile: profileReducer,
    tasks : taskReducer
})

export {rootReducers}