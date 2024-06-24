import React, {useState, useEffect} from 'react';
import {Box, HStack, VStack, Text, Pressable} from '@gluestack-ui/themed';

import {useConfigFacade} from '../../store/facades';

export default ParameterSelector = ({onValuesSelected, selelctedValues}) => {
  const {availableParameter, getAvaliableParameter} = useConfigFacade();
  const [selectedParams, setSelectedParams] = useState({});

  useEffect(() => {
    if (availableParameter.length < 0) {
      getAvaliableParameter();
    }
  }, [availableParameter]);

  const onSelectParams = item => {
    setSelectedParams(prev => {
      const newState = {
        ...prev,
        [item?.param_name]:
          prev[item?.param_name] === undefined ? item : undefined,
      };
      const selectedParamsArray = Object.values(newState).filter(
        items => items !== undefined,
      );
      console.log('selectedParamsArray', selectedParamsArray);
      onValuesSelected(selectedParamsArray);

      return newState;
    });
  };

  return (
    <Box>
      <Text>Select Parameter:</Text>
      <VStack>
        {availableParameter.map((item, index) => (
          <Pressable
            borderWidth={2}
            borderColor={
              selectedParams?.[item?.param_name] === undefined
                ? '$transparent'
                : '$primary400'
            }
            borderRadius={12}
            overflow="hidden"
            w={'100%'}
            my={'$2'}
            key={index}
            onPress={() => {
              onSelectParams(item);
            }}>
            <HStack
              width={'100%'}
              px={'$3'}
              py={'$4'}
              justifyContent="space-between"
              bgColor="white">
              <VStack width={'40%'}>
                <Text fontWeight="bold" fontSize={'$lg'} mr={5}>
                  Name:
                </Text>
                <Text
                  fontWeight="bold"
                  color="$primary0"
                  textTransform={'capitalize'}
                  fontSize={'$lg'}>
                  {item?.param_name}
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold" fontSize={'$lg'} mr={5}>
                  Min:
                </Text>
                <Text fontSize={'$lg'} mr={5} alignSelf="center">
                  {item?.min}
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold" fontSize={'$lg'} mr={5}>
                  Max:
                </Text>
                <Text fontSize={'$lg'} mr={5} alignSelf="center">
                  {item?.max}
                </Text>
              </VStack>

              <VStack>
                <Text fontWeight="bold" fontSize={'$lg'} mr={5}>
                  Unit:
                </Text>
                <Text fontSize={'$lg'} mr={5} alignSelf="center">
                  {item?.unit}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
};
