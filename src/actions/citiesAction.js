export const SEND_CURRENT_CITY_DATA = 'SEND_CURRENT_CITY_DATA';
export const ADD_CITY = 'ADD_CITY';
export const SET_VIEWED_PLACE = 'SET_VIEWED_PLACE';
export const INSTALL_FOUND_CITY = 'INSTALL_FOUND_CITY';
export const SET_COORD_CITY = 'SET_COORD_CITY';

export const sendCurrentCityData = (response) => ({
    type: SEND_CURRENT_CITY_DATA,
    response
});

export const addCity = (cityName) => ({
    type: ADD_CITY,
    cityName
});

export const setViewedPlace = (cityName) => ({
    type: SET_VIEWED_PLACE,
    cityName
});

export const installFoundCity = (response) => ({
    type: INSTALL_FOUND_CITY,
    response
});

export const sendCoordCity = (response) => ({
    type: SET_COORD_CITY,
    response
});