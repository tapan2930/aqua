import React, {useState, useEffect} from 'react';
import Layout from '../../../components/common/Layout';
import {VStack, HStack, ScrollView, Text, Box} from '@gluestack-ui/themed';
import Input from '../../../components/common/input/Input';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import Button from '../../../components/common/Button/Button';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useAquariumFacade, useConstantFacade} from '../../../store/facades';
import ValueSelector from '../../../components/common/ValueSelector/ValueSelector';
import DateTimeSelector from '../../../components/common/DatePicker/DatePicker';
import dayjs from 'dayjs';
import Division from '../../../components/common/Division/Division';
import CronTime from 'cron-time-generator';

const CreateTaskScreen = ({navigation}) => {
  const constant = useConstantFacade();
  const [form, setForm] = useState({
    name: '',
    type: constant.taskType[0].value,
    frequency: constant.taskFrequency[0].value,
    repeat: constant.taskRepeat[0].value,
    days: ['monday'],
    datetime: new Date(),
  });

  const onChange = key => value => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const createCronString = () => {
    let cronString = '';
    if (form.frequency === 'REPEAT') {
      if (form.repeat === 'daily') {
        cronString = CronTime.everyDayAt(
          form.datetime.getHours(),
          form.datetime.getMinutes(),
        );
      } else {
        cronString = CronTime.onSpecificDaysAt(
          form.days,
          form.datetime.getHours(),
          form.datetime.getMinutes(),
        );
      }
    } else {
      cronString = CronTime.everyYearIn(
        [5],
        14,
        form.datetime.getHours(),
        form.datetime.getMinutes(),
      );
    }

    return cronString;
  };

  const onSave = () => {
    console.log(createCronString());
    // const payload = {
    //   ...form,
    //   date: dayjs(form.date).unix(),
    // };
  };

  return (
    <Layout px={0} pb={10}>
      <VStack flex={1}>
        <ScrollView pt={10} mb={2} showsVerticalScrollIndicator={false}>
          <Division label={'Task Details:'}>
            <Input
              value={form.name}
              onChangeText={onChange('name')}
              label="Task Name"
            />

            <HStack gap={'$3'}>
              <ValueSelector
                value={form.type}
                label="Type"
                options={constant.taskType}
                onChange={onChange('type')}
              />

              <ValueSelector
                value={form.frequency}
                label="Frequency"
                options={constant.taskFrequency}
                onChange={onChange('frequency')}
              />
            </HStack>
            <Input
              textArea
              value={form.name}
              onChangeText={onChange('name')}
              label="Description"
            />
          </Division>
          <Division label={'Notification Configurations:'}>
            {form.frequency === 'REPEAT' && (
              <RadioButton
                onPress={onChange('repeat')}
                activeValue={form.repeat}
                label={'Repeat'}
                values={constant.taskRepeat}
              />
            )}

            {form.frequency === 'REPEAT' ? (
              <RepeatValuesSelector
                repeat={form.repeat}
                constant={constant}
                onChange={onChange}
                selectedDays={form.days}
                datetime={form.datetime}
              />
            ) : (
              <DateTimeSelector
                onValueSelect={onChange}
                value={form.datetime}
                label="Select Date and Time"
                mode="datetime"
              />
            )}
          </Division>
        </ScrollView>
        <HStack px={10} gap={'$3'} pt={10}>
          <Button
            variant="outline"
            buttonText="Reset"
            guiButtonProps={{flex: 1, bgColor: 'white'}}
            onPress={() =>
              setForm({
                ...form,
                name: '',
                type: 'Equipment',
                quantity: '',
                pricePerUnit: '',
                total: '',
                selectionType: 'none',
                selectedAquariums: [],
              })
            }
          />
          <Button
            guiButtonProps={{flex: 1}}
            buttonText="Create"
            onPress={onSave}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};

const RepeatValuesSelector = ({
  repeat,
  constant,
  selectedDays,
  datetime,
  onChange,
}) => {
  if (repeat === 'daily') {
    return (
      <DateTimeSelector
        value={datetime}
        onValueSelect={onChange('datetime')}
        mode="time"
      />
    );
  }

  if (repeat === 'weekly') {
    return (
      <>
        <HStack alignItems="center">
          <Text width={'15%'} color="$textColor" mb={24}>
            Day
          </Text>
          <RadioButton
            multi
            key={'days'}
            onPress={onChange('days')}
            activeValue={selectedDays}
            values={constant.taskDay}
          />
        </HStack>
        <HStack alignItems="center">
          <Text width={'50%'} color="$textColor" mb={24}>
            Time
          </Text>
          <DateTimeSelector
            value={datetime}
            onValueSelect={onChange('datetime')}
            mode="time"
          />
        </HStack>
      </>
    );
  }
};

export default CreateTaskScreen;
