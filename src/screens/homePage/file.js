import React from 'react';
import {Text, View} from 'react-native';

const withLoadingHOC = InputComponent => {
  return props => {
    const {isDeveloper} = props || {};
    if (!isDeveloper) {
      return <Text>He is Tester</Text>;
    }
    return <InputComponent />;
  };
};

const DeveloperView = () => {
  return <Text>It is dashboard for developer</Text>;
};

const DeveloperViewWithHoc = withLoadingHOC(DeveloperView);

export const MyHocExample = ({isDeveloper}) => {
  return (
    <View>
      <DeveloperViewWithHoc isDeveloper={isDeveloper} />
    </View>
  );
};
