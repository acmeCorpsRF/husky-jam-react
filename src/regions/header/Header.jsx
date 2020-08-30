import './Header.scss'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import {installFoundCity} from '../../actions/citiesAction'
import classNames from 'classnames';

class Header extends Component {

    state = {
        inputStateWhenSearchingError: false,
        inputStateWhenSearchingFound: false,
        showMessage: false,
        textMessage: '',
        messageStateWhenSearchingHidden: true,
        messageStateWhenSearchingVisible: false,
        inputValue: '',
        responseValue: {}
    };

    static propTypes = {
        installFoundCity: PropTypes.func.isRequired
    };

    sendTextValueForCity = (value) => {
        this.setState({
            inputValue: value
        });
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=ecea112d8ce63958d041afca1667c087&units=metric`)
            .then(response => response.json())
            .then(response => {
                if (response.hasOwnProperty('city')) {
                    this.setState({
                        inputStateWhenSearchingError: false,
                        inputStateWhenSearchingFound: true,
                        showMessage: true,
                        textMessage: response.city.name,
                        messageStateWhenSearchingHidden: false,
                        messageStateWhenSearchingVisible: true,
                        responseValue: response
                    });
                } else {
                    this.setState({
                        inputStateWhenSearchingError: true,
                        inputStateWhenSearchingFound: false,
                        showMessage: true,
                        textMessage: response.message,
                        messageStateWhenSearchingHidden: false,
                        messageStateWhenSearchingVisible: true
                    });
                }
            })
    };

    checkResult = (value) => {
        if (this.state.inputStateWhenSearchingFound === true) {
            this.props.installFoundCity(value);
            this.setState({
                inputStateWhenSearchingError: false,
                inputStateWhenSearchingFound: false,
                messageStateWhenSearchingHidden: true,
                messageStateWhenSearchingVisible: false,
                inputValue: ''
            });
        }
    };

    render() {
        let classesInput = classNames('header__form-input', {
                'error': this.state.inputStateWhenSearchingError,
                'found': this.state.inputStateWhenSearchingFound
            }),
            classesMessage = classNames('header__form-show-message', {
                'hidden': this.state.messageStateWhenSearchingHidden,
                'visible': this.state.messageStateWhenSearchingVisible
            });
        return (
            <header className="header">
                <div className="wrapper">
                    <Link className="header__link" to="/today/">Today</Link>
                    <Link className="header__link" to="/tomorrow/">Tomorrow</Link>
                    <Link className="header__link" to="/week/">Week</Link>
                    <form className="header__form">
                        <input
                            className={classesInput}
                            type="text"
                            placeholder="Find city..."
                            autoComplete="on"
                            value={this.state.inputValue}
                            onChange={(e) => this.sendTextValueForCity(e.target.value)}/>
                        <div
                            className={classesMessage}
                            onClick={() => {
                                this.checkResult(this.state.responseValue);
                            }}>
                            {this.state.textMessage}</div>
                    </form>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({citiesReducer}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({installFoundCity}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);