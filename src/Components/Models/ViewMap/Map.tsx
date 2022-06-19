import React from 'react';
import { Circle, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { LatLongComp } from '../../Types/interfaces';
import Loading3 from '../../Utility/Loading3';
const Map = ({ cordinate, clicked, popUp, loading }: LatLongComp): JSX.Element => {
    console.log(cordinate, clicked);
    if (clicked || loading) {
        return <Loading3></Loading3>
    }
    return (
        <MapContainer center={cordinate} zoom={16} scrollWheelZoom={true} className="w-100 h-100">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={cordinate}>
                <Tooltip>{popUp}</Tooltip>
            </Marker>
            <Circle center={cordinate}></Circle>
        </MapContainer>
    );
};

export default Map;