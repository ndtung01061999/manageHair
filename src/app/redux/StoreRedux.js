import { createStore } from 'redux';
import allReducers from './Reducer';
const store = createStore(allReducers);
export default store