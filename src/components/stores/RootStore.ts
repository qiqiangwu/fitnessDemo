import {applySnapshot, Instance, onSnapshot, types} from 'mobx-state-tree';
import {LoginStore} from '../../Authentication';
import {OnboardingStore} from '../../Onboarding/stores';
import {PresetsStore} from '../../Presets';
import {get, set} from '../utils';

const KEY = 'store';

const RootStore = types
  .model('RootStore', {
    onboardingStore: types.optional(OnboardingStore, {
      pages: {},
    }),
    loginStore: types.optional(LoginStore, {}),
    presetsStore: types.optional(PresetsStore, {}),
  })
  .actions(self => ({
    afterCreate() {
      self.onboardingStore.loadPages();
    },
  }));

export interface IRootStore extends Instance<typeof RootStore> {}

export const hydrate = async (store: IRootStore) => {
  const storage = await get(KEY);
  try {
    if (storage) {
      const snapshot = JSON.parse(storage);
      applySnapshot(store, snapshot);
    }
  } catch (e) {
    console.error(`hydrate error`, e);
  }
};

export const startOnSnapShot = (store: IRootStore) => {
  onSnapshot(store, async snapshot => {
    await set(KEY, JSON.stringify(snapshot));
  });
};

export default RootStore;
