import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import CustomChip from '../../components/customChip';
import ErrorMessage from '../../components/errorMessage';

import {skillsType} from '../../types';
import {NO_OTHER_SKILLS} from '../../constant/message';

type Props = {
  data: skillsType;
  refresh?: () => void;
};
const skillsFormatter = (skills: string): string[] => skills.split(',');

const Skills = ({data}: Props) => {
  return (
    <ScrollView>
      <CardDetails title="Details">
        <DetailsView
          data={{
            primarySkill: data.primarySkill,
            secondarySkill: data.secondarySkill,
            ternarySkill: data.ternarySkill,
          }}
        />
      </CardDetails>
      <CardDetails title="Other Skills">
        <View style={styles.containerStyle}>
          {skillsFormatter(data.otherSkills as string).map(
            (skill: string, index: number) =>
              skill ? (
                <CustomChip
                  key={index}
                  label={skill}
                  style={styles.chipStyle}
                  mode="view"
                />
              ) : (
                <ErrorMessage key={index} message={NO_OTHER_SKILLS} />
              ),
          )}
        </View>
      </CardDetails>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipStyle: {
    marginLeft: 10,
  },
});
export default Skills;
