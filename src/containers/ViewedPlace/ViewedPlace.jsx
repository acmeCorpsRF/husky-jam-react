import './ViewedPlace.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';

class ViewedPlace extends Component {

    static propTypes = {
        viewedPlace: PropTypes.object.isRequired
    };

    render() {
        const {viewedPlace} = this.props;
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const listOfTimes = viewedPlace.list.map((item, index) => {
            if (index < 9) {
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
            <div className="viewed-place">
                <div className="wrapper">
                    <div className="viewed-place__block">
                        <div className="viewed-place__info">
                            <h1 className="viewed-place__title">Next 24 hours in {viewedPlace.name}</h1>
                            <span
                                className="viewed-place__date">{months[new Date().getMonth()]}, {new Date().getDate()}</span>
                            <div className="viewed-place__table">
                                <div className="viewed-place__table-thead">
                                    <span className="viewed-place__table-thead-time">Time</span>
                                    <span className="viewed-place__table-thead-weather">Weather</span>
                                </div>
                                <div className="viewed-place__table-tbody">
                                    <ul className="viewed-place__table-list">
                                        {listOfTimes}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    viewedPlace: citiesReducer.viewedPlace
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ViewedPlace);