import './SelectedCity.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {addCity,sendCoordCity} from '../../actions/citiesAction.js'

class SelectedCity extends Component {

    static propTypes = {
        currentCityData: PropTypes.object.isRequired
    };

    componentDidUpdate() {
        const {currentCityData,sendCoordCity} = this.props;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCityData.name}&APPID=ecea112d8ce63958d041afca1667c087&units=metric`)
            .then(response => response.json())
            .then(response => {
                sendCoordCity(response);
            });
    }

    render() {
        const {currentCityData, addCity} = this.props;
        return (
            <div className="selected-city">
                <div className="wrapper">
                    <div className="selected-city__block">
                        <div className="selected-city__temperature">
                            {currentCityData.list[0].main.temp} &deg;C
                        </div>
                        <div className="selected-city__location">
                            <span className="selected-city__location-city-name">{currentCityData.name},</span>
                            <span className="selected-city__location-country">{currentCityData.country}</span>
                        </div>
                        <div className="selected-city__location-additional">
                            {currentCityData.list[0].weather[0].main}, Wind
                            - {currentCityData.list[0].wind.speed} meter per second
                        </div>
                    </div>
                    <button className="selected-city__add-button" onClick={() => addCity(currentCityData.name)}>+
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    currentCityData: citiesReducer.currentCityData
});
const mapDispatchToProps = dispatch => bindActionCreators({addCity,sendCoordCity}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SelectedCity);