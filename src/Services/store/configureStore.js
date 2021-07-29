import { autoRehydrate, persistStore } from "redux-persist-immutable";
import { combineReducers } from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import Immutable from "immutable";
import { applyMiddleware, compose, createStore } from "redux";

import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers/rootReducer"
import authReducer from "../reducers/authReducer"
import mainReducer from "../reducers/mainReducer"

import * as  authSaga from "../saga/authSaga";
import * as  mainSaga from "../saga/mainSaga";


const combinedReducers = combineReducers({
  root: rootReducer,
  auth: authReducer,
  main: mainReducer
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    isLoading: false,
    verificationCode: '',
    isForRegister: false
  }),
  auth: Immutable.Map({
    token: '',
    name: '',
    email: '',
    verified: false,
    authUser: {}
  }),
  main: Immutable.Map({
      commonData: []
  }),
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combinedReducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({ log: true }))
  );

  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: ['root', 'auth', 'main'],
    }
  );
  return {
    ...store, runSaga: [
        sagaMiddleware.run(authSaga.sagaFlow),
        sagaMiddleware.run(mainSaga.sagaFlow),
    ]
  };
}