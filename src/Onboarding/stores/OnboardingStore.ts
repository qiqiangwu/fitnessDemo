import {values} from 'mobx';
import {flow, Instance, SnapshotOut, types} from 'mobx-state-tree';

const OnboardingPage = types.model('OnboardingPage', {
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
  image: types.string,
});

const OnboardingStore = types
  .model('OnboardingStore', {
    loading: types.optional(types.boolean, true),
    inited: types.optional(types.boolean, false),
    pages: types.map(OnboardingPage),
  })
  .views(self => ({
    get pagesToArray() {
      const pagesArray: IOnboardingPageSnapshotOut[] = [];
      self.pages.forEach(item => {
        pagesArray.push({
          title: item.title,
          image: item.image,
          id: item.id,
          description: item.description,
        });
      });
      return pagesArray;
    },
  }))
  .actions(self => ({
    updatePages(json: IOnboardingPageSnapshotOut[]) {
      json.forEach(pageJson => {
        self.pages.put(pageJson);
      });
    },
    markLoading(loading: boolean) {
      self.loading = loading;
    },
    markInited(inited: boolean) {
      self.inited = inited;
    },
  }))
  .actions(self => {
    const loadPages = flow(function* loadPages() {
      try {
        self.loading = false;
        const {default: json} = yield import(
          '../../assets/mock/onboarding.json'
        );

        self.updatePages(json);
        self.markLoading(false);
        self.markInited(false);
      } catch (e) {
        console.error('failed to load onboarding pages', e);
      }
    });
    return {loadPages};
  });

export interface IOnboardingPage extends Instance<typeof OnboardingPage> {}
export interface IOnboardingStore extends Instance<typeof OnboardingStore> {}
export interface IOnboardingPageSnapshotOut
  extends SnapshotOut<typeof OnboardingPage> {}
export default OnboardingStore;
