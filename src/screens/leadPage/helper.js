import {
  CalendarTick,
  CommentIcon,
  Hand,
  Tag,
  Tools,
  VerifiedTick,
} from '../../assets';
import * as yup from 'yup';

export const bedrooms = [
  {id: 0, title: '1'},
  {id: 1, title: '2'},
  {id: 2, title: '3'},
  {id: 3, title: '4+'},
];
export const data = [
  {
    id: 0,
    title: 'FREE 360° Marketing',
    content:
      'We help you find tenants across 10+ Listing Portals, Verified Brokers, To-Let boards, etc.',
    icon: CommentIcon,
  },
  {
    id: 1,
    title: 'Verified Tenants',
    content:
      'We conduct KYC checks on all tenants, including identity & police verification',
    icon: VerifiedTick,
  },
  {
    id: 2,
    title: 'FREE Assisted Visits',
    content:
      'Our property managers provide unlimited house visits for interested customers',
    icon: Hand,
  },
  {
    id: 3,
    title: 'Best Price Guidance',
    content:
      'We provide real-time, market-driven pricing guidance to help you get the best rent possible',
    icon: Tag,
  },
  {
    id: 4,
    title: 'Rent on Time',
    content:
      'Our dedicated rent collection team ensures that you receive rent on time every month',
    icon: CalendarTick,
  },
  {
    id: 5,
    title: 'Property Maintenance',
    content:
      'We inspect the property regularly & offer on-demand services to maintain it',
    icon: Tools,
  },
];
export const validationSchemaLead = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, 'enter minimum 3 characters')
    .required('Name is required'),
  phone: yup
    .string()
    .min(10, () => 'Number should be 10 digit')
    .max(10, () => 'Number should be 10 digit')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Mobile Number is required'),
  address: yup
    .string()
    .min(3, 'Too small address')
    .required('Location is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  totalBeds: yup.string().required('Select bedrooms'),
});
