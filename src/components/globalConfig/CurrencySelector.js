import React, {useState, useEffect, useMemo} from 'react';
import {Modal, TouchableOpacity} from 'react-native';

import {
  Box,
  HStack,
  Text,
  Pressable,
  Heading,
  FlatList,
  Icon,
  ArrowLeftIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import Input from '../common/input/Input';
import countriesJson from '../../utils/countries.json';

export default CurrencySelector = ({onValueSelect, value}) => {
  const [inputValue, setInputValue] = useState({});
  const [countries, setCountries] = useState({original: [], filtered: []});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const countiresList = useMemo(() => {
    const data = countriesJson;
    return data;
  }, []);

  useEffect(() => {
    setCountries({original: countiresList, filtered: countiresList});
  }, [countiresList]);

  useEffect(() => {
    if (value && value.id) {
      setInputValue(value);
    }
  }, [value]);

  const onSearch = text => {
    setSearchValue(text);
    const filteredCountries = countries.original.filter(
      country =>
        country.currencies?.name?.toLowerCase().includes(text.toLowerCase()) ||
        country.currencies?.id?.toLowerCase().includes(text.toLowerCase()),
    );
    setCountries({...countries, filtered: filteredCountries});
  };

  return (
    <>
      <Pressable mb={24} mt={40} onPress={() => setModalVisible(true)}>
        <Text fontWeight="normal" color="$textColor" mb={3}>
          Currency
        </Text>
        <Box
          borderWidth={0.5}
          borderRadius={14}
          py={16}
          px={6}
          bgColor="white"
          borderColor="$primary400">
          <Icon
            position="absolute"
            right={10}
            top={16}
            size="xl"
            as={ChevronDownIcon}
          />
          <HStack alignItems="center">
            <Text fontSize={'$xl'}>{inputValue?.name}</Text>
            <Text fontSize={'$xl'} ml={5}>
              {inputValue?.currencies?.symbol}
            </Text>
          </HStack>
        </Box>
      </Pressable>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide">
        <Box px={'$5'} position="relative">
          <Icon
            position="absolute"
            mt={'$2'}
            ml={'$5'}
            color="black"
            size="xl"
            as={ArrowLeftIcon}
            onPress={() => setModalVisible(false)}
          />
          <HStack alignItems="center" justifyContent="center">
            <Heading size="xl" fontWeight="light" color="$textColor">
              Select Currency
            </Heading>
          </HStack>
          <Box>
            <Input
              placeholder="Search Currency"
              onChangeText={onSearch}
              value={searchValue}
            />
            <FlatList
              data={countries.filtered}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueSelect(item);
                    setModalVisible(false);
                    setSearchValue('');
                    setCountries({...countries, filtered: countries.original});
                  }}>
                  <HStack
                    py={'$3'}
                    borderColor="$blueGray300"
                    borderBottomWidth={1}
                    alignItems="center">
                    <Text>{item?.name}</Text>
                    <Text ml={5}>({item?.currencies?.symbol})</Text>
                  </HStack>
                </TouchableOpacity>
              )}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
