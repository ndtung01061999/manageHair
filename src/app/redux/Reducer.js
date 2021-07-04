import {combineReducers} from 'redux';
const appState = {idaccount:0}
const storeState={id:0}
const numberReducer = (state=appState, action) => {
    switch (action.type) {
        case 'LOGIN':
            state = {
                idaccount:action?.idaccount,
                name:action?.name,
                password:action?.password,
            }
        default:
    }
    return state
}
const IdstoreReducer = (state=storeState, action) => {
    switch (action.type) {
        case 'STORE':
            state = {
                idstore:action?.idstore
            }
        default:
    }
    return state
}
const allReducers = combineReducers({
    numberReducer,
    IdstoreReducer
});

export default allReducers;