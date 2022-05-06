import {types} from 'mobx-state-tree';

export type Gender = 'male' | 'female' | undefined;
export type Activity = 'newbie' | 'skilled' | 'expert' | undefined;

const PresetsStore = types
  .model('PresetsStore', {
    finished: false,
    gender: types.optional(
      types.union(
        types.literal('male'),
        types.literal('female'),
        types.literal(undefined),
      ),
      undefined,
    ),
    goal: types.optional(
      types.union(types.number, types.literal(undefined)),
      undefined,
    ),
    age: types.optional(types.union(types.number, types.undefined), undefined),
    tall: types.optional(types.union(types.number, types.undefined), undefined),
    weight: types.optional(
      types.union(types.number, types.undefined),
      undefined,
    ),
    activity: types.optional(
      types.union(
        types.literal('newbie'),
        types.literal('skilled'),
        types.literal('expert'),
        types.literal(undefined),
      ),
      undefined,
    ),
  })
  .actions(self => ({
    setFinished(value: boolean) {
      self.finished = value;
    },
    setGender(gender: Gender) {
      self.gender = gender;
    },
    setGoal(goal: number) {
      self.goal = goal;
    },
    setAge(age: number) {
      self.age = age;
    },
    setTall(value: number) {
      self.tall = value;
    },
    setWeight(value: number) {
      self.weight = value;
    },
    setActivity(value: Activity) {
      self.activity = value;
    },
  }));

export default PresetsStore;
