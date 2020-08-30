import './Today.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Map from '../../components/Maps/Map';

class Today extends Component {

    static propTypes = {
        currentCityData: PropTypes.object.isRequired,
        coordCityForMap: PropTypes.object.isRequired
    };

    render() {
        const {currentCityData, coordCityForMap} = this.props;
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const listOfTimes = currentCityData.list.map((item, index) => {
            if (Number(item.dt_txt.slice(8, 10)) === new Date().getDate()) {
                return (
                    <li className="today__table-list-item" key={index}>
                        <span className="today__table-list-item-time">{item.dt_txt.slice(11, 16)}</span>
                        {item.main.temp} &deg;C &nbsp;
                        {item.weather[0].main}, Wind - {item.wind.speed} meter per second
                    </li>
                );
            }
        });
        return (
            <div className="today">
                <div className="wrapper">
                    <div className="today__block">
                        <div className="today__info">
                            <h1 className="today__title">Today</h1>
                            <span
                                className="today__date">{months[new Date().getMonth()]}, {new Date().getDate()}</span>
                            <div className="today__table">
                                <div className="today__table-thead">
                                    <span className="today__table-thead-time">Time</span>
                                    <span className="today__table-thead-weather">Weather</span>
                                </div>
                                <div className="today__table-tbody">
                                    <ul className="today__table-list">
                                        {listOfTimes}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="today__map">
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
export default connect(mapStateToProps, mapDispatchToProps)(Today);