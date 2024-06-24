import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import {
  Box,
  HStack,
  Text,
  Pressable,
  ScrollView,
  VStack,
  Icon,
} from '@gluestack-ui/themed';
import ActionSheet from '../ActionSheet/ActionSheet';
import Input from '../input/Input';
import {Check, ChevronDown, ChevronUp} from 'lucide-react-native';

const ValueSelector = (
  {
    isSearchable = false,
    onlySheet = false,
    onSearch,
    searchValue,
    modalTitle,
    value,
    onChange,
    options,
    label,
    additionalComponent,
    error,
    style,
  },
  ref,
) => {
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(value);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    const selectedOption = options?.find(option => option.value === value);
    setSelected(selectedOption);
  }, [value]);

  useEffect(() => {
    if (actionSheetRef.current) {
      return () => {
        actionSheetRef.current?.close();
      };
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => actionSheetRef.current?.open(),
      close: () => actionSheetRef.current?.close(),
    }),
    [],
  );

  const callbackOnVisibleChange = isOpened => {
    setFocused(isOpened);
  };

  const onSelect = option => {
    onChange(option?.value);
  };

  return (
    <Box flex={1}>
      {label && (
        <Text fontWeight="normal" color="$textColor" mb={3}>
          {label}
        </Text>
      )}
      {!onlySheet && (
        <Pressable mb={24} onPress={() => actionSheetRef.current?.open()}>
          <HStack
            alignItems="center"
            bg="white"
            borderRadius={11}
            height={55}
            borderColor={
              focused ? '$primary400' : error ? '$red400' : '$primary100'
            }
            borderWidth={0.5}
            justifyContent="space-between"
            px={10}
            {...style?.box}>
            <Text fontSize={'$lg'} color="$textColor" {...style?.text}>
              {selected?.name}
            </Text>
            <Icon
              size="xl"
              color={'$primary400'}
              as={focused ? ChevronUp : ChevronDown}
            />
          </HStack>
        </Pressable>
      )}
      {error && (
        <Text color="red" mt={2} ml={2} fontSize={12}>
          {error}
        </Text>
      )}
      <ActionSheet
        ref={actionSheetRef}
        label={modalTitle || label}
        callbackOnVisibleChange={callbackOnVisibleChange}>
        {isSearchable && (
          <VStack>
            <Input
              value={searchValue}
              placeholder="Search..."
              onChangeText={onSearch}
              inputContainerProps={{mb: 0}}
              inputBoxProps={{
                borderColor: '$blueGray200',

                borderWidth: 0,
                borderRadius: 0,
              }}
            />
          </VStack>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          borderTopWidth={1}
          borderColor="$blueGray200">
          {options &&
            options?.length > 0 &&
            options.map((option, index) => (
              <Pressable
                flexDirection="row"
                justifyContent="space-between"
                android_ripple={{color: '#c8d8ff22'}}
                key={option?.value || index}
                onPress={() => {
                  onSelect(option);
                  actionSheetRef?.current?.close();
                }}
                px={10}
                py={16}
                borderBottomWidth={1}
                borderColor="$blueGray200"
                bg="$white">
                <Text color={'$textColor'}>{option?.name}</Text>
                {selected?.value === option?.value && (
                  <Icon as={Check} size={20} color={'$primary0'} />
                )}
              </Pressable>
            ))}
        </ScrollView>
        {additionalComponent ? additionalComponent(actionSheetRef) : null}
      </ActionSheet>
    </Box>
  );
};

export default forwardRef(ValueSelector);
