import React, {useMemo} from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Icon,
} from '@gluestack-ui/themed';
import {Fish, Menu, Sprout} from 'lucide-react-native';
import {useWindowDimensions} from 'react-native';
import {useConstantFacade} from '../../store/facades';

const LiveStockCategories = ({liveStocks}) => {
  const {liveStockCategories} = useConstantFacade();
  const {width} = useWindowDimensions();

  const categoryDataMemo = useMemo(() => {
    const categoryValues = liveStockCategories.reduce((acc, item) => {
      acc[item.value] = 0;
      return acc;
    }, {});

    liveStocks?.forEach(element => {
      categoryValues[element.livestock_type] += 1;
    });

    return categoryValues;
  }, [liveStocks]);

  const categoryData = {
    plant: {color: '#73cf16', icon: Sprout},
    fish: {color: '#ff4646', icon: Fish},
    crustacean: {color: '#4b73ff', icon: Fish},
    other: {color: '#48deff', icon: Menu},
  };
  return (
    <HStack flexWrap="wrap" justifyContent="space-between" gap={'$4'} mt={10}>
      {liveStockCategories.map((item, index) => (
        <HStack
          py={'$2'}
          borderRadius={'$md'}
          bg={categoryData[item?.value]?.color}
          width={width / 2 - 20}
          key={item?.value}
          px={'$2'}>
          <VStack>
            <Text color="white" fontWeight="$medium">
              {item?.name}
            </Text>
            <Text color="white" fontWeight="$semibold">
              {categoryDataMemo[item.value]}
            </Text>
          </VStack>
          <HStack ml="auto" justifyContent="center" alignItems="center">
            <HStack borderRadius={'$full'} bgColor="$white" p={10}>
              <Icon
                color={categoryData[item?.value]?.color}
                as={categoryData[item?.value]?.icon}
                size={20}
              />
            </HStack>
          </HStack>
        </HStack>
      ))}
    </HStack>
  );
};
export default LiveStockCategories;
