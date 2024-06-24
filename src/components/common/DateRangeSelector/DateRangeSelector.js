import React, {useState, useRef} from 'react';
import {HStack, Text, Icon, Pressable, Box} from '@gluestack-ui/themed';
import DatePicker from 'react-native-date-picker';
import {themeColors} from '../../../utils/theme';
import {Calendar} from 'lucide-react-native';
import dayjs from 'dayjs';
import ActionSheet from '../ActionSheet/ActionSheet';
import {MotiText, MotiView} from 'moti';
import Button from '../Button/Button';
import {useWindowDimensions} from 'react-native';

const DateRangeSelector = ({fromDate, toDate, handleDateIntervalChange}) => {
  const {width} = useWindowDimensions();
  const actionSheetRef = useRef();
  const [active, setActive] = useState('from');
  const [tempFromDate, setTempFromDate] = useState(fromDate);
  const [tempToDate, setTempToDate] = useState(toDate);
  //   const [startDate] = useState(fromDate);
  //   const [endDate] = useState(toDate);

  const showActionSheet = value => {
    actionSheetRef.current.open();
    setActive(value);
  };

  const handleActiveChange = value => {
    setActive(value);
  };

  const handletempDateChange = value => date => {
    if (active === 'from') {
      setTempFromDate(date);
    } else {
      setTempToDate(date);
    }
  };

  const handleConfirm = () => {
    handleDateIntervalChange({from: tempFromDate, to: tempToDate});
    actionSheetRef.current.close();
  };

  const getLeft = value => {
    return width - value - 20;
  };
  const getRight = value => {
    return 0;
  };

  const getCenter = value => {
    return width / 2 - value / 2 - 20;
  };

  return (
    <HStack gap={'$4'} mt={'$3'} mb={'$6'}>
      <Box flex={1} overflow="hidden" softShadow="3" borderRadius={12}>
        <Pressable
          onPress={() => showActionSheet('from')}
          android_ripple={{color: themeColors.primary200 + '33'}}
          bgColor={themeColors.white}
          flex={1}>
          <HStack py={'$3'} px={'$4'} justifyContent="space-between">
            <Text color="$textColor" fontWeight="$bold">
              From
            </Text>
            <Icon as={Calendar} size={20} color={'$textColor'} />
          </HStack>
          <HStack
            borderTopWidth={1}
            borderTopColor="$blueGray200"
            py={'$3'}
            px={'$4'}>
            <Text color="$textColor" fontWeight="$semibold">
              {dayjs(fromDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
        </Pressable>
      </Box>
      <Box flex={1} overflow="hidden" softShadow="3" borderRadius={12}>
        <Pressable
          onPress={() => showActionSheet('to')}
          android_ripple={{color: themeColors.primary200 + '33'}}
          softShadow="3"
          borderRadius={12}
          bgColor={themeColors.white}
          flex={1}>
          <HStack py={'$3'} px={'$4'} justifyContent="space-between">
            <Text color="$textColor" fontWeight="$bold">
              To
            </Text>
            <Icon as={Calendar} size={20} color={'$textColor'} />
          </HStack>
          <HStack
            borderTopWidth={1}
            borderTopColor="$blueGray200"
            py={'$3'}
            px={'$4'}>
            <Text color="$textColor" fontWeight="$semibold">
              {dayjs(toDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
        </Pressable>
      </Box>

      <ActionSheet
        label="Select Date"
        ref={actionSheetRef}
        header={() => (
          <HStack
            borderBottomWidth={1}
            borderBottomColor="$blueGray300"
            height={55}>
            <MotiView
              style={{
                position: 'absolute',
                alignSelf: 'center',
                borderRadius: 100,
                overflow: 'hidden',
              }}
              transition={{type: 'timing', duration: 250}}
              from={{
                transform: [
                  {
                    translateX:
                      active === 'from' ? getCenter(85.09) : getRight(85.09),
                  },
                ],
              }}
              animate={{
                transform: [
                  {
                    translateX:
                      active === 'from' ? getCenter(85.09) : getRight(85.09),
                  },
                ],
              }}>
              <Pressable
                paddingVertical={5}
                paddingHorizontal={10}
                android_ripple={{color: themeColors.primary200 + '33'}}
                onPress={() => handleActiveChange('from')}>
                <MotiText
                  transition={{type: 'timing', duration: 250}}
                  style={{
                    color: themeColors.textColor,
                  }}
                  from={{
                    fontSize: active === 'from' ? 20 : 16,
                    fontWeight: active === 'from' ? 'bold' : 'normal',
                    color:
                      active === 'from'
                        ? themeColors.textColor
                        : themeColors.primary400,
                  }}
                  to={{
                    fontWeight: active === 'from' ? 'bold' : 'normal',
                    fontSize: active === 'from' ? 20 : 16,
                    color:
                      active === 'from'
                        ? themeColors.textColor
                        : themeColors.primary400,
                  }}>
                  Select From
                </MotiText>
              </Pressable>
            </MotiView>

            <MotiView
              transition={{type: 'timing', duration: 250}}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                borderRadius: 100,
                overflow: 'hidden',
              }}
              from={{
                transform: [
                  {
                    translateX:
                      active === 'to' ? getCenter(65.45) : getLeft(65.45),
                  },
                ],
              }}
              to={{
                transform: [
                  {
                    translateX:
                      active === 'to' ? getCenter(65.45) : getLeft(65.45),
                  },
                ],
              }}>
              <Pressable
                paddingVertical={5}
                paddingHorizontal={10}
                android_ripple={{color: themeColors.primary200 + '33'}}
                onPress={() => handleActiveChange('to')}>
                <MotiText
                  transition={{type: 'timing', duration: 250}}
                  style={{color: themeColors.textColor}}
                  from={{
                    fontSize: active === 'to' ? 20 : 16,
                    fontWeight: active === 'to' ? 'bold' : 'normal',
                    color:
                      active === 'to'
                        ? themeColors.textColor
                        : themeColors.primary400,
                  }}
                  to={{
                    fontWeight: active === 'to' ? 'bold' : 'normal',
                    fontSize: active === 'to' ? 20 : 16,
                    color:
                      active === 'to'
                        ? themeColors.textColor
                        : themeColors.primary400,
                  }}>
                  Select To
                </MotiText>
              </Pressable>
            </MotiView>
          </HStack>
        )}>
        <HStack py={20} justifyContent="center">
          <DatePicker
            textColor={themeColors.textColor}
            date={active === 'from' ? tempFromDate : tempToDate}
            onDateChange={handletempDateChange(
              active === 'from' ? 'from' : 'to',
            )}
            maximumDate={new Date()}
            mode="date"
          />
        </HStack>
        <HStack>
          <Button
            onPress={handleConfirm}
            guiButtonProps={{flex: 1, height: 55, borderRadius: 0}}>
            Confirm
          </Button>
        </HStack>
      </ActionSheet>
    </HStack>
  );
};
export default DateRangeSelector;
