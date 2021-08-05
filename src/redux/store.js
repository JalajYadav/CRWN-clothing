import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootreducer from './root-reducer.js'

const middlewares = [logger];

const store = createStore(rootreducer,applyMiddleware(...middlewares))

export default store;