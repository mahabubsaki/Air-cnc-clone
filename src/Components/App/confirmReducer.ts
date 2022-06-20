import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmOrder, Hotel } from "../Types/interfaces";

const confirmInitalState: ConfirmOrder = {
    cost: 0,
    orderedHotel: null,
    hotelId: '',
    message: ''
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
        },
        setHotelId: (state, actions: PayloadAction<string>) => {
            const hotelId = actions.payload
            state.hotelId = hotelId;
        },
        setMessageText: (state, actions: PayloadAction<string>) => {
            const message = actions.payload
            state.message = message;
        }
    }
})
export const { setOrderInfo, setHotelInfo, setHotelId, setMessageText } = confirmSlice.actions
export default confirmSlice.reducer