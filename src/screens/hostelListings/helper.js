import {Recommended, PriceHigh, PriceLow, BestRated} from '../../assets';

export const sortOptions = [
  {
    id: '1',
    label: 'Recommended',
    icon: Recommended,
    isSelected: true,
  },
  {
    id: '2',
    label: 'Lowest price',
    icon: PriceLow,
    isSelected: false,
  },
  {
    id: '3',
    label: 'Highest price',
    icon: PriceHigh,
    isSelected: false,
  },
  {
    id: '4',
    label: 'Best rated',
    icon: BestRated,
    isSelected: false,
  },
];

export const listings = (list, sortBy) => {
  if (!list) return [];

  const sortedList = [...list];

  switch (sortBy) {
    case 'Lowest price':
      return sortedList.sort((a, b) => a?.rent - b?.rent);
    case 'Highest price':
      return sortedList.sort((a, b) => b?.rent - a?.rent);
    case 'Best rated':
      return sortedList.sort((a, b) => b?.rating - a?.rating);
    default:
      return list;
  }
};
export const gender = [
  {id: 0, title: 'Male', slug: 'Boys'},
  {id: 1, title: 'Female', slug: 'Girls'},
  {id: 2, title: 'Gender Neutral', slug: 'Gender Neutral'},
];
export const stars = [
  {id: 0, title: 5},
  {id: 1, title: 4},
  {id: 2, title: 3},
  {id: 3, title: 2},
  {id: 4, title: 1},
];
export const roomTypes = [
  {id: 0, title: 'Single rooms'},
  {id: 1, title: 'Sharing rooms'},
  {id: 2, title: 'Dormitory'},
];
