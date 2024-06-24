import React from 'react';
import {Box, ScrollView, VStack, HStack, Text} from '@gluestack-ui/themed';
import {LineChart as RNLineChart} from 'react-native-chart-kit';
import {useWindowDimensions} from 'react-native';
import {themeColors} from '../../../utils/theme';

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 1,
  color: () => `rgba(115, 207, 22, 1)`,
  labelColor: () => themeColors.textColor,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const LineChart = ({data}) => {
  const graphWidth = data.labels.length * 50;
  return (
    <ScrollView
      horizontal={true}
      mt={'$4'}
      mb={'$6'}
      borderRadius={12}
      overflow="hidden">
      <RNLineChart
        data={data}
        width={graphWidth}
        height={300}
        chartConfig={chartConfig}
      />
    </ScrollView>
  );
};
export default React.memo(LineChart);
