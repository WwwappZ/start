import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import auth from './Reducers/auth/reducers.js';
import profile from './Pages/Profile/Reducers/profile';
import bedrijven from './Pages/Administrator/Bedrijven/Reducers/bedrijven';
import loading from "./Reducers/loading/loading"
import gebruikers from './Pages/Administrator/Gebruikers/Reducers/gebruikers'
export default combineReducers({
  auth,
  profile,
  bedrijven,
  loading,
  gebruikers,
  form: formReducer // <---- Mounted at 'form
});
