import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import {appReducer} from '../reducers';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, //this line is added to ignore this warning "A non-serializable value was detected"
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
