import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Hotel } from "../Types/interfaces";
interface Search {
    location: string;
    locationArray: Hotel[];
    isLoading: boolean;
}
const isSearchedInital: Search = {
    location: '',
    locationArray: [],
    isLoading: true
}
const isSearchedSlice = createSlice({
    name: 'isSearched',
    initialState: isSearchedInital,
    reducers: {
        selectedLocation: (state, actions: PayloadAction<string>) => {
            const currentValue = actions.payload
            state.location = currentValue
        },
        selectedArray: (state, actions: PayloadAction<Hotel[]>) => {
            const currentValue = actions.payload
            state.locationArray = currentValue
        },
        offLoading: (state, actions: PayloadAction<boolean>) => {
            const currentValue = actions.payload
            state.isLoading = currentValue
        }
    }
})
export const { selectedLocation, offLoading, selectedArray } = isSearchedSlice.actions
export default isSearchedSlice.reducer