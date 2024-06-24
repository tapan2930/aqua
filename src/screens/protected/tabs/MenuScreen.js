import React from 'react';
import useStore from '../../../store/useStore';
import Layout from '../../../components/common/Layout';
import {Box, HStack, VStack, Text, Pressable} from '@gluestack-ui/themed';

import Button from '../../../components/common/Button/Button';
import {useNavigation} from '@react-navigation/native';
import AquariumSVG from '../../../assets/images/AquariumSVG';
import LiveStockSVG from '../../../assets/images/LiveStockSVG';
import {themeColors} from '../../../utils/theme';
import TaskSVG from '../../../assets/images/TaskSVG';
import {useWindowDimensions} from 'react-native';

export default MenuScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const menu = [
    {
      name: 'Aquariums',
      icon: <AquariumSVG />,
      onPress: () => navigation.navigate('ListAquariumScreen'),
    },
    {
      name: 'Live Stock',
      icon: <LiveStockSVG />,
      onPress: () => navigation.navigate('ListLiveStockScreen'),
    },
    {
      name: 'Config paramters',
      icon: <AquariumSVG />,
      onPress: () =>
        navigation.navigate('ParameterScreen', {from: 'MenuScreen'}),
    },
    {
      name: 'Tasks Setup',
      icon: <TaskSVG />,
      onPress: () => navigation.navigate('CreateTaskScreen'),
    },
  ];

  return (
    <Layout py={10}>
      <Box justifyContent="space-between" flex={1}>
        <Box>
          <HStack gap={'$3'} justifyContent="space-between" flexWrap="wrap">
            {menu.map((item, index) => (
              <Pressable
                key={index}
                android_ripple={{color: themeColors.primary100 + '33'}}
                borderRadius={'$lg'}
                softShadow="2"
                py={'$6'}
                width={width / 3 - 5 * 3}
                alignItems="center"
                justifyContent="center"
                bgColor="white"
                onPress={item.onPress}>
                <VStack alignItems="center" justifyContent="center">
                  {item.icon}
                  <Text mt={5} textAlign="center">
                    {item.name}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>
        </Box>
      </Box>
    </Layout>
  );
};
