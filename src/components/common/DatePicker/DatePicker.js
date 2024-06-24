import React, {useState, useEffect, useRef} from 'react';

import {
  Box,
  HStack,
  Text,
  Pressable,
  Icon,
  CalendarDaysIcon,
} from '@gluestack-ui/themed';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {themeColors} from '../../../utils/theme';
import ActionSheet from '../ActionSheet/ActionSheet';
import Button from '../Button/Button';
import {ClockIcon} from 'lucide-react-native';

export default DateTimeSelector = ({
  onValueSelect,
  value,
  label,
  mode = 'date',
  datePickerConfig = {},
}) => {
  const actionSheetRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const callbackOnVisibleChange = isOpened => {
    setModalVisible(isOpened);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const showDateTime = () => {
    if (mode === 'time') {
      return dayjs(value).format('hh:mm a').toString();
    } else if (mode === 'date') {
      return dayjs(value).format('YYYY-MM-DD').toString();
    } else {
      return dayjs(value).format('YYYY-MM-DD hh:mm a').toString();
    }
  };

  const onConfirm = () => {
    onValueSelect(date);
    actionSheetRef.current.close();
  };

  return (
    <>
      <Pressable flex={1} mb={24} onPress={() => actionSheetRef.current.open()}>
        {label && (
          <Text fontWeight="normal" color="$textColor" mb={3}>
            {label}
          </Text>
        )}
        <Box
          justifyContent="center"
          borderRadius={11}
          height={55}
          px={10}
          bgColor="white"
          borderWidth={0.5}
          borderColor={modalVisible ? '$primary400' : '$primary100'}>
          <Icon
            position="absolute"
            right={10}
            top={12}
            size="xl"
            color={'$primary400'}
            as={
              mode === 'date' || mode === 'datetime'
                ? CalendarDaysIcon
                : ClockIcon
            }
          />
          <HStack alignItems="center">
            <Text color="$textColor" fontSize={'$lg'}>
              {showDateTime()}
            </Text>
          </HStack>
        </Box>
      </Pressable>

      <ActionSheet
        ref={actionSheetRef}
        callbackOnVisibleChange={callbackOnVisibleChange}
        label={'Select Date'}>
        <HStack py={20} justifyContent="center">
          <DatePicker
            textColor={themeColors.textColor}
            date={date}
            onDateChange={handleDateChange}
            maximumDate={mode === 'date' ? new Date() : undefined}
            minimumDate={mode === 'datetime' ? new Date() : undefined}
            mode={mode}
            {...datePickerConfig}
          />
        </HStack>
        <HStack>
          <Button
            onPress={onConfirm}
            guiButtonProps={{flex: 1, height: 55, borderRadius: 0}}>
            Confirm
          </Button>
        </HStack>
      </ActionSheet>
    </>
  );
};
