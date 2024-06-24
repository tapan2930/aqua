import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import zustandFlipper from 'react-native-flipper-zustand';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';

import appInfoSlice from './slices/appInfoSlice';
import userSlice from './slices/userSlice';
import configSlice from './slices/configSlice';
import aquariumSlice from './slices/aquariumSlice';
import expenseSlice from './slices/expenseSlice';
import constantSlice from './slices/constantSlice';
import ParamsSlice from './slices/paramsSlice';
import liveStockSlice from './slices/liveStockSlice';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

const zustandStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

const useStore = create(
  zustandFlipper(
    persist(
      immer((set, get) => ({
        ...appInfoSlice(set, get),
        ...userSlice(set, get),
        ...configSlice(set, get),
        ...aquariumSlice(set, get),
        ...expenseSlice(set, get),
        ...constantSlice(set, get),
        ...ParamsSlice(set, get),
        ...liveStockSlice(set, get),
      })),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => zustandStorage),
        partialize: state => ({
          user: state.user,
          app: state.app,
          config: state.config,
          aquariumInfo: state.aquariumInfo,
          expenseInfo: state.expenseInfo,
          liveStockInfo: state.liveStockInfo,
        }),
        onRehydrateStorage: () => state => {
          state.setHasHydrated(true);
        },
      },
    ),
  ),
);

export default useStore;
