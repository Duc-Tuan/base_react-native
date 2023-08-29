import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as cartReducer } from 'modules/cart/store';
import { reducer as settingReducer } from 'modules/settings/store';
import { reducer as authReducer } from 'modules/auth/store';

const rootReducer = combineReducers({
  cart: cartReducer,
  settings: settingReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;

export default store;
