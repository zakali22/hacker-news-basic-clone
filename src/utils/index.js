import { SORT } from './enums';

export const filterStories = (list, filterText, isReverse) => {
  return isReverse
    ? SORT[filterText.toUpperCase()](list).reverse()
    : SORT[filterText.toUpperCase()](list);
};

export const shuffleStories = (list) => {
  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
