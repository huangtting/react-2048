import { createStore} from 'redux';
import rootReducer from './reducers';

const initHistory = JSON.parse(localStorage.getItem('state')||null);

const store = createStore(rootReducer,initHistory);

// store每次改变就将state存到localStorage中
store.subscribe(()=>{
    const state=store.getState();
    localStorage.setItem('state',JSON.stringify(state));
})
export default store;