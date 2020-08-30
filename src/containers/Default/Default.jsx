import './Default.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {setViewedPlace} from '../../actions/citiesAction'

class Default extends Component {

    static propTypes = {
        savedCities: PropTypes.array.isRequired,
        setViewedPlace: PropTypes.func.isRequired
    };

    render() {
        const {savedCities, setViewedPlace} = this.props;
        const savedCitiesList = savedCities.map((item, index) => {
            return (
                <li className="default__list-item" key={index}>
                    <Link className="default__list-item-link" to={"/saved_cities/" + item.name}
                          onClick={() => setViewedPlace(item.name)}>
                        <div className="selected-city__temperature">{item.list[0].main.temp} &deg;C</div>
                        <div className="selected-city__location">
                            <span className="selected-city__location-city-name">{item.name},</span>
                            <span className="selected-city__location-country">{item.country}</span>
                        </div>
                        <div className="selected-city__location-additional">
                            {item.list[0].weather[0].main} Wind - {item.list[0].wind.speed} meter per second
                        </div>
                    </Link>
                </li>
            )
        });
        return (
            <div className="default">
                <div className="wrapper">
                    <div className="default__block">
                        <h1 className="default__title">Saved cities</h1>
                        <ul className="default__list">
                            {savedCitiesList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    savedCities: citiesReducer.savedCities
});
const mapDispatchToProps = dispatch => bindActionCreators({setViewedPlace}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Default);