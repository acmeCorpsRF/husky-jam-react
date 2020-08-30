import './Maps.scss'
import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Maps extends Component {

    static propTypes = {
        coordCityForMap: PropTypes.object.isRequired
    };

    state = {
        infoHidden: true
    };

    showInfo() {
        this.setState({
            infoHidden: false
        });
    }

    hideInfo() {
        this.setState({
            infoHidden: true
        });
    }

    render() {
        const {coordCityForMap} = this.props;
        const mapStyles = {
            width: "100%",
            height: "389px",
        };
        let classes = classNames('city-info', {
            'hidden': this.state.infoHidden
        });
        return (
            <>
            <Map
                google={this.props.google}
                center={this.props.centerLatLng}
                zoom={8}
                style={mapStyles}
                initialCenter={{lat: coordCityForMap.lat, lng: coordCityForMap.lon}}
                onClick={() => this.hideInfo()}
            >
                <Marker position={{lat: coordCityForMap.lat, lng: coordCityForMap.lon}}
                        onClick={() => this.showInfo()}/>
            </Map>
            <div className={classes}>
                <div className="city-info__block">
                    <div className="selected-city__temperature">
                        {coordCityForMap.temp} &deg;C
                    </div>
                    <div className="selected-city__location">
                        <span className="selected-city__location-city-name">{coordCityForMap.name},</span>
                        <span className="selected-city__location-country">{coordCityForMap.country}</span>
                    </div>
                    <div className="selected-city__location-additional">
                        {coordCityForMap.weather}, Wind
                        - {coordCityForMap.wind} meter per second
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCBIUk1PgxRtxBC3eaXf_wXYT5nx3814Wo'
})(Maps);