import { Dispatch, SetStateAction } from "react";

// all state interface
export interface FilterInput {
    locations: string[];
    setHotels: Dispatch<SetStateAction<Hotel[]>>;
}

export interface GuestState {
    guests: GuestInput;
    setGuests: Dispatch<SetStateAction<GuestInput>>
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
    min: number;
    img: string;
    name: string;
    location: string;
    max: number;
    oavatar: string;
    owner: string;
    party: boolean;
    pet: boolean;
    position: number[];
    rating: number;
    reviews: number;
    service: number;
    smoking: boolean;
    wifi: true;
    pernight: number;
    parking: boolean;
    pool: boolean;
    spa: boolean
}