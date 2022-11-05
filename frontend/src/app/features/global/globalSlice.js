const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        // baseUrl: 'http://localhost:5000'
        baseUrl: 'http://192.168.18.89:5000'
    }
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        
    }
})

export const { } = globalSlice.actions

export default globalSlice.reducer;