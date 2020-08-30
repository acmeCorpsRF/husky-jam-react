import './Week.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {setViewedPlace} from '../../actions/citiesAction'

class Week extends Component {

    static propTypes = {
        currentCityData: PropTypes.object.isRequired,
        setViewedPlace: PropTypes.func.isRequired
    };

    render() {
        const {currentCityData, setViewedPlace} = this.props;
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const list5days = currentCityData.list.map((item, index) => {
            if (item.dt_txt.slice(11, 13) === '12' || index === 0) {
                return (
                    <li className="week__list-item" key={index}>
                        <Link className="week__list-item-link" to={"/cities/" + currentCityData.name}>
                            <span className="week__day-date">{item.dt_txt.slice(8, 10)}.{item.dt_txt.slice(5, 7)}</span>
                            <div className="selected-city__temperature">
                                {item.main.temp} &deg;C
                            </div>
                            <div className="selected-city__location">
                                <span className="selected-city__location-city-name">{currentCityData.name},</span>
                                <span className="selected-city__location-country">{currentCityData.country}</span>
                            </div>
                            <div className="selected-city__location-additional">
                                {item.weather[0].main}, Wind - {item.wind.speed} meter per second
                            </div>
                        </Link>
                    </li>
                )
            }
        });
        let nextMonth = (new Date().getMonth() === 11) ? nextMonth = 0 : nextMonth = new Date().getMonth() + 1;
        return (
            <div className="week">
                <div className="wrapper">
                    <div className="week__block">
                        <h1 className="week__title">Week</h1>
                        <div className="week__days-week">
                            <span
                                className="week__days-week-first">{months[new Date().getMonth()]}, {new Date().getDate()}</span>
                            &nbsp;-&nbsp;
                            <span
                                className="week__days-week-last">{months[nextMonth]}, {new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).getDate()}</span>
                        </div>
                        <ul className="week__list">
                            {list5days}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    currentCityData: citiesReducer.currentCityData
});
const mapDispatchToProps = dispatch => bindActionCreators({setViewedPlace}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Week);