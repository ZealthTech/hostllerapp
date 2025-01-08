import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Space from '../../components/space/Space';

const Scale = () => {
  const cmData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const subCmData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.container}>
      <FlatList
        data={cmData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.cmSection}>
            <View style={styles.mainMarkContainer}>
              <Text style={styles.cmText}>{item}</Text>
              <View style={styles.cmLine} />
            </View>

            {/* Sub-centimeter marks */}
            <View style={styles.subCmContainer}>
              {subCmData.map((_, index) => (
                <View style={styles.subCmLine(index)} />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Scale;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 2,
    marginHorizontal: 5,
    borderColor: '#000',
  },
  cmSection: {
    width: 40,
  },
  mainMarkContainer: {
    alignItems: 'center',
  },
  cmText: {
    fontSize: 12,
    color: '#000',
    marginBottom: 5,
  },
  cmLine: {
    width: 1.5,
    height: 20,
    backgroundColor: '#000',
  },
  subCmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  subCmLine: index => ({
    width: index % 5 === 0 ? 1.5 : 1,
    backgroundColor: index % 5 === 0 ? 'blue' : '#000',
    height: 15,
  }),
});
