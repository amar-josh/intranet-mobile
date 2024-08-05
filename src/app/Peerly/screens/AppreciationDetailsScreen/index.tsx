import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import RatingBar from '../../components/RatingBar';
import ObjectionModal from '../../components/ObjectionModal';
import {usePostReward, usePostObjection} from './appreciationDetails.hooks';
import CenteredModal from '../../components/Modal';
import {RewardSuccessIcon, SuccessIcon} from '../../constants/icons';
import {AppreciationDetails} from '../../services/home/types';
import {useRoute} from '@react-navigation/native';
import {AppreciationDetailScreenRouteProp} from '../../navigation/types';
import InitialAvatar from '../../components/InitialAvatar';
import Typography from '../../components/typography';

const AppreciationDetailsScreen = () => {
  const route = useRoute<AppreciationDetailScreenRouteProp>();
  const {cardId, appriciationList, self} = route.params;
  const cardDetails = appriciationList.find(
    (item: AppreciationDetails) => item.id === cardId,
  );

  const [reward, setReward] = useState(0);
  const [reason, setReason] = useState('');
  const [isObjectionModalVisible, setObjectionModalVisible] = useState(false);

  const {
    mutate: postReward,
    isLoading: isLoadingPostReward,
    isSuccess: isSuccessPostReward,
    reset: resetPostReward,
  } = usePostReward();

  const {
    mutate: postObjection,
    isLoading: isLoadingPostObjection,
    isSuccess: isSuccessPostObjection,
    reset: resetPostObjection,
  } = usePostObjection();

  useEffect(() => {
    if (cardDetails) {
      setReward(cardDetails.given_reward_point);
    }
  }, [cardDetails]);

  useEffect(() => {
    if (isSuccessPostObjection && isObjectionModalVisible) {
      setObjectionModalVisible(false);
    }
  }, [isSuccessPostObjection, isObjectionModalVisible]);

  const handleReward = (point: number) => {
    if (cardDetails) {
      const payload = {
        params: {
          id: cardDetails.id,
        },
        body: {point: point},
      };
      postReward(payload);
    }
  };

  const handleObjectionReason = () => {
    if (cardDetails) {
      const payload = {
        params: {
          id: cardDetails.id,
        },
        body: {reporting_comment: reason},
      };
      postObjection(payload);
    }
  };

  if (!cardDetails) {
    return (
      <View>
        <Text>No Card Details Found</Text>
      </View>
    );
  }

  const receiverName = `${cardDetails?.receiver_first_name || ''} ${
    cardDetails?.receiver_last_name || ''
  } `;

  const senderName = `${cardDetails?.sender_first_name || ''} ${
    cardDetails?.sender_last_name || ''
  }`;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.receiverImageBox}>
          {cardDetails?.receiver_image_url ? (
            <Image
              source={{uri: cardDetails.receiver_image_url}}
              style={styles.receiverImage}
            />
          ) : (
            <View style={styles.receiverImage}>
              <InitialAvatar name={receiverName} size={95} />
            </View>
          )}
        </View>
        <View style={styles.senderImageBox}>
          {cardDetails?.sender_image_url ? (
            <Image
              source={{uri: cardDetails.sender_image_url}}
              style={styles.senderImage}
            />
          ) : (
            <View style={styles.senderImage}>
              <InitialAvatar name={senderName} size={66} />
            </View>
          )}
        </View>
        <View style={styles.cardDetailsBox}>
          <View style={styles.senderInfo}>
            <Typography type="h3" style={styles.receiverName}>
              {receiverName}
            </Typography>
            <Typography type="h5" style={styles.designation}>
              {cardDetails.receiver_designation}
            </Typography>
          </View>

          <Typography type="h4" style={styles.coreValue}>
            {cardDetails.core_value_name}
          </Typography>
          <Text style={styles.description}>
            {cardDetails.core_value_description}
          </Text>
          <View style={styles.senderNameWrap}>
            <Text style={styles.authorByText}>Words by </Text>
            <Text style={styles.author}>{senderName}</Text>
          </View>
          <View style={styles.appreciationDescriptionBox}>
            <ScrollView>
              <Text style={styles.appreciationDescription}>
                {cardDetails.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View>
          <RatingBar
            onPressObjection={() => setObjectionModalVisible(true)}
            rewardedByPeople={cardDetails?.total_rewards}
            reward={reward}
            setReward={handleReward}
            disableSlider={isLoadingPostReward}
            isRewardAlreadyGiven={cardDetails?.given_reward_point > 0}
            self={self || false}
          />
        </View>
        <ObjectionModal
          visible={isObjectionModalVisible}
          onClose={() => setObjectionModalVisible(false)}
          onConfirm={handleObjectionReason}
          setReason={setReason}
          reason={reason}
          isDisabled={isLoadingPostObjection}
        />
        <CenteredModal
          visible={isSuccessPostObjection}
          message={
            'Your objection reason has been submitted successfully. We appreciate your feedback.'
          }
          svgImage={SuccessIcon}
          btnTitle="Okay"
          onClose={() => {
            setReason('');
            resetPostObjection();
          }}
        />
        <View>
          <CenteredModal
            visible={isSuccessPostReward}
            message={
              'Your Rewards has been submitted successfully. We appreciate your feedback.'
            }
            svgImage={RewardSuccessIcon}
            btnTitle="Okay"
            onClose={() => {
              resetPostReward();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 35,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 25,
  },
  receiverImageBox: {
    alignItems: 'center',
  },
  senderImageBox: {
    alignItems: 'center',
    position: 'absolute',
    right: 70,
  },
  receiverImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
  },
  senderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: -10,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  cardDetailsBox: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  receiverName: {
    lineHeight: 21,
    fontWeight: 'bold',
  },
  designation: {
    fontWeight: '300',
    lineHeight: 15,
    textAlign: 'center',
  },
  coreValue: {
    backgroundColor: colors.WARM_CREAM,
    fontWeight: '400',
    padding: 10,
    lineHeight: 18,
    borderRadius: 999,
    marginTop: 15,
    textAlign: 'center',
    minWidth: 80,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: colors.WARM_CREAM,
    color: colors.BLACK,
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 15,
    lineHeight: 15,
  },
  senderNameWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  author: {
    fontSize: 12,
    color: colors.SECONDARY,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  authorByText: {
    fontSize: 12,
    color: colors.SECONDARY,
    marginBottom: 10,
  },

  appreciationDescriptionBox: {
    minHeight: 200,
    maxHeight: 200,
    width: '100%',
    marginBottom: 15,
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.25,
  },
  appreciationDescription: {
    fontSize: 14,
  },
});

export default AppreciationDetailsScreen;
