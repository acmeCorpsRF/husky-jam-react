import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Router from './Router';
import Header from '../regions/header/Header';
import SelectedCity from '../components/SelectedCity/SelectedCity';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {sendCurrentCityData} from '../actions/citiesAction'

class Layout extends Component {

    static propTypes = {
        sendCurrentCityData: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {sendCurrentCityData} = this.props;
        if (navigator.geolocation) {
            let geoSuccess = function (position) {
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=ecea112d8ce63958d041afca1667c087&units=metric`)
                    .then(response => response.json())
                    .then(response => {
                        sendCurrentCityData(response);
                    });
            };
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
        else {
            console.log('Geolocation is not supported for this Browser/OS version yet.');
        }
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <SelectedCity/>
                <Router/>
            </div>
        )
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({sendCurrentCityData}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);