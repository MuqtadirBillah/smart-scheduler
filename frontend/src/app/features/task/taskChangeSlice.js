const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: true
}

export const taskChangeSlice = createSlice({
    name: 'taskChange',
    initialState,
    reducers: {
        setTaskChange: (state) =>{
            state.value = !state.value
        }
    }
})

export const { setTaskChange } = taskChangeSlice.actions

export default taskChangeSlice.reducer;