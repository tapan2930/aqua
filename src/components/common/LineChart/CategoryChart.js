import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Heading,
} from '@gluestack-ui/themed';

import {LineChart as RNLineChart, Grid} from 'react-native-svg-charts';
import {useWindowDimensions} from 'react-native';
import {themeColors} from '../../../utils/theme';
import {AreaChart} from 'react-native-svg-charts';

const CategoryChart = ({data}) => {
  const {width} = useWindowDimensions();
  return (
    <HStack flexWrap="wrap" justifyContent="space-between">
      {data.map((category, index) => (
        <Box
          key={index}
          mt={'$4'}
          bgColor="white"
          height={200}
          justifyContent="flex-end"
          borderRadius={12}
          overflow="hidden">
          <AreaChart
            style={{height: 200, width: width / 2 - 20, zIndex: 1000}}
            data={category.data}
            svg={{stroke: category.color, fill: category.color + 33}}
            contentInset={{top: 20, bottom: 20}}>
            <VStack zIndex={70000} py={10} px={10}>
              <Text color="$textColor" size="lg">
                {category.name}
              </Text>
              <Text color="$textColor" size="xl" fontWeight="$bold">
                {category.expense}
              </Text>
              <Text
                color={category.color}
                mt={'$6'}
                size="$lg"
                fontWeight="$bold">
                {category.difference}
              </Text>
            </VStack>
          </AreaChart>
        </Box>
      ))}
    </HStack>
  );
};
export default React.memo(CategoryChart);
