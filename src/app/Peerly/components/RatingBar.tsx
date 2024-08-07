import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {FlagIcon, RatingStarIcon} from '../constants/icons';

interface RatingBarProps {
  onPressObjection: () => void;
  reward: number;
  setReward: (rating: number) => void;
  disableSlider: boolean;
  isRewardAlreadyGiven: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({
  onPressObjection,
  reward,
  setReward,
  disableSlider,
  isRewardAlreadyGiven,
}) => {
  return (
    <View>
      <View style={styles.rewardAndReportWrapper}>
        <Pressable onPress={onPressObjection} disabled={disableSlider}>
          <View style={styles.flagIcon}>
            <FlagIcon />
          </View>
        </Pressable>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={reward}
            onValueChange={value => setReward(value)}
            thumbImage={RatingStarIcon}
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="#DDD"
          />
          <View style={styles.labelsContainer}>
            <Text style={styles.sliderGood}>Good</Text>
            <Text style={styles.sliderNice}>Nice</Text>
            <Text style={styles.sliderLove}>Love</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rewardAndReportWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  sliderContainer: {
    marginLeft: 30,
    alignItems: 'center',
    width: '90%',
    height: 30,
  },
  slider: {
    width: '90%',
    height: 30,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  sliderGood: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 30,
  },
  sliderNice: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 25,
  },
  sliderLove: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flagIcon: {
    marginTop: 20,
    backgroundColor: '#EE3E54',
    height: 25,
    width: 25,
    borderRadius: 5,
    padding: 5,
  },
});

export default RatingBar;