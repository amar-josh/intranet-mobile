import React from 'react';
import {ScrollView} from 'react-native';

import DetailsCard from '../../components/profile/cardDetails';
import AssetView from '../../components/profile/assets/assetView';
import ErrorMessage from '../../components/errorMessage';

import {AssetType} from '../../types';
import {NO_CURRENT_ASSETS, NO_PREVIOUS_ASSETS} from '../../constant/message';

const currentAssetsLabels = ['Name', 'Start Date', 'Is Active'];
const previousAssetsLabels = ['Name', 'Start Date', 'End Date', 'Is Active'];

type Props = {
  data: {
    currentAsset: AssetType[];
    previousAsset: AssetType[];
  };
};

const Asset = ({data}: Props) => {
  return (
    <ScrollView>
      <DetailsCard title="Current Assets">
        {data.currentAsset?.length ? (
          <AssetView labels={currentAssetsLabels} assets={data.currentAsset} />
        ) : (
          <ErrorMessage message={NO_CURRENT_ASSETS} />
        )}
      </DetailsCard>

      {data.previousAsset?.length ? (
        <DetailsCard title="Previous Assets">
          <AssetView
            labels={previousAssetsLabels}
            assets={data.previousAsset}
          />
        </DetailsCard>
      ) : (
        <ErrorMessage message={NO_PREVIOUS_ASSETS} />
      )}
    </ScrollView>
  );
};

export default Asset;
