import React from "react";
import { useParams } from 'react-router-dom'

type MatchParams = {
    touristRouteId : string,
    other: string
}

interface MatchParams2 {
    touristRouteId : string,
    other: string
}

export const DetailPage: React.FC = () => {
    var params = useParams<keyof MatchParams2>();
    return <h1>Detail, routes id: {params.touristRouteId} {params.other}</h1>;
};