import React, {useMemo} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  TrustIcon,
  TechnicalIcon,
  RespectIcon,
  EthicsIcon,
  CustFocusIcon,
  EmployeeIcon,
} from '../constants/icons';

import {CoreValue} from '../services/giveAppreciation/types';
import colors from '../constants/colors';

const coreValuesMeta = [
  {
    id: 1,
    icon: TrustIcon,
    backgroundColor: colors.LIGHT_PINK,
  },
  {
    id: 2,
    icon: RespectIcon,
    backgroundColor: colors.LIGHT_PEACH,
  },
  {
    id: 3,
    icon: EthicsIcon,
    backgroundColor: colors.LIGHT_AQUA,
  },
  {
    id: 4,
    icon: EmployeeIcon,
    backgroundColor: colors.LIGHT_SKYBLUE,
  },
  {
    id: 5,
    icon: CustFocusIcon,
    backgroundColor: colors.LIGHT_TEAL,
  },
  {
    id: 6,
    icon: TechnicalIcon,
    backgroundColor: colors.LIGHT_LIME,
  },
];

interface CoreValueInfoModalProp {
  visible: boolean;
  onClose?: () => void;
  coreValuesDetails: CoreValue[];
}

const CoreValueInfoModal: React.FC<CoreValueInfoModalProp> = ({
  visible,
  onClose,
  coreValuesDetails,
}) => {
  const coreValues = useMemo(() => {
    return coreValuesDetails.map((item, key) => {
      const IconComponent = coreValuesMeta[key].icon;
      return (
        <View
          key={item.id}
          style={[
            styles.card,
            {backgroundColor: coreValuesMeta[key].backgroundColor},
          ]}>
          <View style={styles.iconWrapper}>
            <IconComponent />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      );
    });
  }, [coreValuesDetails]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {coreValues}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    paddingTop: 10,
    paddingRight: 10,
    flexGrow: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cardContent: {
    paddingLeft: 10,
    paddingBottom: 10,
    flex: 3,
  },
  iconWrapper: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    maxHeight: 100,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.BLACK,
    paddingBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.BLACK,
  },
});

export default CoreValueInfoModal;
