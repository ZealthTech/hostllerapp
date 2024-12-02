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
      return sortedList.sort((a, b) => a.rent - b.rent);
    case 'Highest price':
      return sortedList.sort((a, b) => b.rent - a.rent);
    case 'Best rated':
      return sortedList.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
};
