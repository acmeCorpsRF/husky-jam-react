import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import Today from '../containers/Today/Today';
import Tomorrow from '../containers/Tomorrow/Tomorrow';
import Week from '../containers/Week/Week';
import Default from '../containers/Default/Default';
import ViewedPlace from '../containers/ViewedPlace/ViewedPlace';

class Router extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Switch>
                <Route exact path='/today' component={Today}/>
                <Route exact path='/tomorrow' component={Tomorrow}/>
                <Route exact path='/week' component={Week}/>
                <Route path='/cities/' component={Today}/>
                <Route path='/saved_cities/' component={ViewedPlace}/>
                <Route exact path='/' component={Default}/>
            </Switch>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Router);

