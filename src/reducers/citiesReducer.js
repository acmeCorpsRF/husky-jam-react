import update from 'react-addons-update';
import {
    SEND_CURRENT_CITY_DATA,
    ADD_CITY,
    SET_VIEWED_PLACE,
    INSTALL_FOUND_CITY,
    SET_COORD_CITY
} from '../actions/citiesAction';

const initialStore = {
    currentCityData: {
        name: 'Loading...',
        country: 'Loading...',
        list: [{
            dt_txt: 'Loading...',
            main: {temp: 'Loading...'},
            weather: ['Loading...'],
            wind: {speed: 'Loading...'}
        }]
    },
    savedCities: [],
    viewedPlace: {
        name: 'Loading...',
        country: 'Loading...',
        list: [{
            dt_txt: 'Loading...',
            main: {temp: 'Loading...'},
            weather: ['Loading...'],
            wind: {speed: 'Loading...'}
        }]
    },
    coordCityForMap: {
        name: 'Loading...',
        country: 'Loading...',
        weather: 'Loading...',
        wind: 'Loading...',
        temp: 'Loading...',
        lat: 'Loading...',
        lon: 'Loading...'
    }
};

export default function citiesReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_CURRENT_CITY_DATA: {
            const dayListInfo = [];
            Object.values(action.response.list).map(item => {
                dayListInfo.push(item);
            });
            return update(store, {
                currentCityData: {
                    $set: {
                        name: action.response.city.name,
                        country: action.response.city.country,
                        list: dayListInfo
                    }
                }
            });
        }
        case ADD_CITY: {
            let newSavedCities = store.savedCities;
            if (store.savedCities.length !== 0) {
                if (!(store.savedCities.some(item => item.name === action.cityName))) {
                    newSavedCities.push(store.currentCityData);
                }
            } else {
                newSavedCities.push(store.currentCityData);
            }
            return update(store, {
                savedCities: {
                    $merge: newSavedCities
                }
            });
        }
        case SET_VIEWED_PLACE: {
            let newViewedPlace;
            store.savedCities.forEach(item => {
                if (item.name === action.cityName) {
                    newViewedPlace = {
                        name: item.name,
                        country: item.country,
                        list: item.list
                    }
                }
            });
            return update(store, {
                viewedPlace: {
                    $set: newViewedPlace
                }
            });
        }
        case INSTALL_FOUND_CITY: {
            const dayListInfo = [];
            Object.values(action.response.list).map(item => {
                dayListInfo.push(item);
            });
            return update(store, {
                currentCityData: {
                    $set: {
                        name: action.response.city.name,
                        country: action.response.city.country,
                        list: dayListInfo
                    }
                }
            });
        }
        case SET_COORD_CITY: {
            return update(store, {
                coordCityForMap: {
                    $set: {
                        name: action.response.name,
                        country: action.response.sys.country,
                        weather: action.response.weather[0].main,
                        wind: action.response.wind.speed,
                        temp: action.response.main.temp,
                        lat: action.response.coord.lat,
                        lon: action.response.coord.lon
                    }
                }
            });
        }
        default:
            return store;
    }
}
