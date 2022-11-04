const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: {
        data: []
    }
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action) =>{
            console.log(action)
            state.value.data = action.payload
        }
    }
})

export const { setProject } = projectSlice.actions

export default projectSlice.reducer;