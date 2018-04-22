import rootReducer from './reducers/reducer'
import { createStore } from 'redux'

export const store = createStore(rootReducer)
