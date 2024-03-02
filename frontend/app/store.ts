import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from '../src/features/users/usersSlice.ts';
// import {postsReducer} from '../src/features/posts/postsSlice.ts';

const usersPersistConfig = {
  key: 'forum:users',
  storage: storage,
  whitelist: ['usersDetails'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  // posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;