import './Tomorrow.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Map from '../../components/Maps/Map';

class Tomorrow extends Component {

    static propTypes = {
        currentCityData: PropTypes.object.isRequired,
        coordCityForMap: PropTypes.object.isRequired
    };

    render() {
        const {currentCityData, coordCityForMap} = this.props;
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24).getDate();
        const listOfTimes = currentCityData.list.map((item, index) => {
            if (tomorrow === Number(item.dt_txt.slice(8, 10))) {
                return (
                    <li className="tomorrow__table-list-item" key={index}>
                        <span className="tomorrow__table-list-item-time">{item.dt_txt.slice(11, 16)}</span>
                        {item.main.temp} &deg;C &nbsp;
                        {item.weather[0].main}, Wind - {item.wind.speed} meter per second
                    </li>
                );
            }
        });
        return (
            <div className="tomorrow">
                <div className="wrapper">
                    <div className="tomorrow__block">
                        <div className="tomorrow__info">
                            <h1 className="tomorrow__title">Tomorrow</h1>
                            <span
                                className="tomorrow__date">{months[new Date().getMonth()]}, {new Date(Date.now() + 1000 * 60 * 60 * 24).getDate()}</span>
                            <div className="tomorrow__table">
                                <div className="tomorrow__table-thead">
                                    <span className="tomorrow__table-thead-time">Time</span>
                                    <span className="tomorrow__table-thead-weather">Weather</span>
                                </div>
                                <div className="tomorrow__table-tbody">
                                    <ul className="tomorrow__table-list">
                                        {listOfTimes}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tomorrow__map">
                            <div id="map">
                                <Map coordCityForMap={coordCityForMap}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    currentCityData: citiesReducer.currentCityData,
    coordCityForMap: citiesReducer.coordCityForMap
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Tomorrow);