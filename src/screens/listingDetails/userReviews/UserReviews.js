// import {View, Text, FlatList, Image} from 'react-native';
// import React from 'react';
// import {styles} from './styles';
// import CustomSvg from '../../../components/customSvg/CustomSvg';
// import {MulticolorStar, Star} from '../../../assets';
// import {getBackgroundColor, getStarColor} from '../styles';

// const UserReviews = props => {
//   const {reviews} = props || {};
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={reviews}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <View style={styles.topView}>
//               <Text style={styles.stay}>Stayed in {item?.stayDate}</Text>
//               <View style={styles.star}>
//                 <CustomSvg
//                   SvgComponent={
//                     <MulticolorStar fill={getStarColor(item?.rate)} />
//                   }
//                 />
//                 <Text style={styles.ratingCount}>{item?.rate}</Text>
//               </View>
//             </View>
//             <View style={styles.userInfo}>
//               <Image source={{uri: item?.userImage}} style={styles.userImage} />
//               <View>
//                 <Text style={styles.name}>{item?.name}</Text>
//                 <Text style={styles.stay}>{item?.info}</Text>
//               </View>
//             </View>
//             <Text style={[styles.stay, styles.content]}>{item?.review}</Text>
//             <View style={{alignItems: 'flex-start'}}>
//               <FlatList
//                 horizontal={true}
//                 data={item?.postImage}
//                 renderItem={({item}) => (
//                   <View key={item}>
//                     <Image source={{uri: item}} style={styles.postImg} />
//                   </View>
//                 )}
//               />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default UserReviews;
import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {MulticolorStar} from '../../../assets';
import {getBackgroundColor, getStarColor} from '../styles';

const UserReviews = props => {
  const {reviews} = props || {};
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {reviews?.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.topView}>
              <Text style={styles.stay}>Stayed in {item?.stayDate}</Text>
              <View style={styles.star}>
                <CustomSvg
                  SvgComponent={
                    <MulticolorStar fill={getStarColor(item?.rate)} />
                  }
                />
                <Text style={styles.ratingCount}>{item?.rate}</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Image source={{uri: item?.userImage}} style={styles.userImage} />
              <View>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.stay}>{item?.info}</Text>
              </View>
            </View>
            <Text style={[styles.stay, styles.content]}>{item?.review}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'flex-start'}}>
              {item?.postImage?.map((image, idx) => (
                <View key={idx}>
                  <Image source={{uri: image}} style={styles.postImg} />
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserReviews;
