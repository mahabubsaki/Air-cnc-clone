import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmOrder, Hotel } from "../Types/interfaces";

const confirmInitalState: ConfirmOrder = {
    cost: 0,
    orderedHotel: null,
}
const confirmSlice = createSlice({
    name: 'confirmation',
    initialState: confirmInitalState,
    reducers: {
        setOrderInfo: (state, actions: PayloadAction<number>) => {
            const price = actions.payload;
            state.cost = price;
        },
        setHotelInfo: (state, actions: PayloadAction<Hotel | null>) => {
            const hotel = actions.payload
            state.orderedHotel = hotel;
        }
    }
})
export const { setOrderInfo, setHotelInfo } = confirmSlice.actions
export default confirmSlice.reducer