import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchQuery } from "../Types/interfaces";

const filterInitialState: SearchQuery = {
    arrival: '',
    departure: '',
    days: 0
}
const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        changeOnSearch: (state, actions: PayloadAction<SearchQuery>) => {
            const { arrival, departure, days } = actions.payload
            state.arrival = arrival;
            state.departure = departure;
            state.days = days;
        }
    }
})

export const { changeOnSearch } = filterSlice.actions
export default filterSlice.reducer
