import React, {forwardRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {isAndroid} from '../../utils/constants/commonFunctions';

const CustomBottomSheet = forwardRef(
  ({children, snapPoints, handleComponent, scrollable}, ref) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    const showScrollView = scrollable && isAndroid();
    return (
      <BottomSheet
        ref={ref}
        snapPoints={memoizedSnapPoints}
        index={-1}
        handleComponent={handleComponent}
        enablePanDownToClose={true}>
        {showScrollView ? (
          <BottomSheetScrollView
            style={[styles.contentContainer]}
            showsVerticalScrollIndicator={false}>
            {children}
          </BottomSheetScrollView>
        ) : (
          <BottomSheetView style={[styles.contentContainer]}>
            {children}
          </BottomSheetView>
        )}
      </BottomSheet>
    );
  },
);

export default CustomBottomSheet;
const styles = StyleSheet.create({
  background: {
    borderRadius: 20,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
});
