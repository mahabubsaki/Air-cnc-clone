import { LatLngTuple } from "leaflet";
import { Dispatch, SetStateAction } from "react";

// all state interface
export interface FilterInput {
    locations: string[];
    setHotels: Dispatch<SetStateAction<Hotel[]>>;
}
export interface ReviewState {
    setReview: Dispatch<SetStateAction<boolean>>;
    setMessage: Dispatch<SetStateAction<boolean>>;
}
export interface ReviewState2 {
    setMessage: Dispatch<SetStateAction<boolean>>;
    setPay: Dispatch<SetStateAction<boolean>>
}
export interface GuestState {
    guests: GuestInput;
    setGuests: Dispatch<SetStateAction<GuestInput>>
}
export interface LoadingState {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}
export interface StartDateState {
    start: Date;
    onStartChange: Dispatch<SetStateAction<Date>>
}
export interface EndDateState {
    end: Date;
    onEndChange: Dispatch<SetStateAction<Date>>
}
export interface HotelState {
    hotels: Hotel[];
    setHotels: Dispatch<SetStateAction<Hotel[]>>
}

// others

export interface SearchQuery {
    arrival: string;
    departure: string;
    days: number;
}
export interface GuestInput {
    adults: number;
    childs: number;
    babies: number;
}

export interface HotelComp {
    hotel: Hotel
}
export interface LocationComp {
    location: Hotel;
    currentHotel?: number;
    setCurrentHotel?: Dispatch<SetStateAction<number>>;
    handleChangeHotel: (location: Hotel, position: LatLngTuple) => void;
    allLocations: Hotel[];
    loading: boolean;
}
export interface ConfirmOrder {
    cost: number;
    orderedHotel: Hotel | null;
}
export interface LatLongComp {
    cordinate: LatLngTuple;
    clicked: boolean;
    popUp: string;
    loading: boolean;
}
export interface Hotel {
    _id: string;
    ac: boolean;
    adults: number;
    childs: number;
    babies: number;
    cancel: boolean;
    clean: boolean;
    description: string;
    kitchen: boolean;
    img: string;
    name: string;
    location: string;
    ownerimg: string;
    owner: string;
    party: boolean;
    pet: boolean;
    position: LatLngTuple;
    rating: number;
    reviews: number;
    service: number;
    smoking: boolean;
    hotelId: string;
    wifi: true;
    pernight: number;
    parking: boolean;
    pool: boolean;
    spa: boolean;
}