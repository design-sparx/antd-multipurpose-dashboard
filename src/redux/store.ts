import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './theme/themeSlice';
import designStyleReducer, {
  DesignStyleState,
} from './design-style/designStyleSlice';
import themeCustomizationReducer, {
  ThemeCustomizationState,
} from './theme-customization/themeCustomizationSlice';
import {
  persistReducer,
  persistStore,
  PersistConfig,
  PersistedState,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the state shape
interface RootState {
  theme: ThemeState;
  designStyle: DesignStyleState;
  themeCustomization: ThemeCustomizationState;
}

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  designStyle: designStyleReducer,
  themeCustomization: themeCustomizationReducer,
});

// Persist config with RootState. Version 2: primaries became nullable in
// `themeCustomization` (null = active style's default). Migration clears the
// old hardcoded brand overrides that got persisted as "user pins" (which
// previously froze the primary to the brand blue regardless of style).
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  version: 2,
  migrate: async (persistedState, version): Promise<PersistedState> => {
    if (version < 2) {
      const state = (persistedState ?? {}) as Partial<RootState>;
      return {
        ...state,
        themeCustomization: {
          ...state.themeCustomization,
          primaryLight: null,
          primaryDark: null,
        },
      } as unknown as PersistedState;
    }
    return persistedState;
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);

// Type for RootState
export type { RootState };
