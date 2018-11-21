import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import Menu from './componentes/Menu';
import Cliente from './componentes/Cliente';
import Producto from './componentes/Producto';
import Estadistica from './componentes/Estadistica';
import NotFound from './componentes/NotFound';

const Root = () => {
    return ( 
        <Router basename="/app">
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/cliente" component={Cliente} />
                <Route exact path="/producto" component={Producto}/>
                <Route exact path="/estadistica" component={Estadistica}/>
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

render(<Menu/>, document.querySelector('#menu'));
render(<Root/>, document.querySelector('#main'));




