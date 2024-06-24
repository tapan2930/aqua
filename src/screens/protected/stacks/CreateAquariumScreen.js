import React, {useEffect, useRef, useState} from 'react';
import Layout from '../../../components/common/Layout';
import {
  Text,
  HStack,
  ScrollView,
  VStack,
  Pressable,
  Icon,
} from '@gluestack-ui/themed';
import ValueSelector from '../../../components/common/ValueSelector/ValueSelector';
import Input from '../../../components/common/input/Input';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import DatePicker from '../../../components/common/DatePicker/DatePicker';
import {
  useConfigFacade,
  useAquariumFacade,
  useConstantFacade,
} from '../../../store/facades.js';
import Button from '../../../components/common/Button/Button';
import dayjs from 'dayjs';
import validateForm from '../../../utils/formValidator.js';
import GroupPicker from '../../../components/groupPicker/GroupPicker.js';
import Division from '../../../components/common/Division/Division.js';
import {MoreVertical} from 'lucide-react-native';
import RadioSelect from '../../../components/common/RadioSelect/RadioSelect.js';
import {themeColors} from '../../../utils/theme.js';
import Alert from '../../../components/common/Alert/Alert.js';

export default CreateAquariumScreen = ({navigation, route}) => {
  const {
    loading,
    createAqaurium,
    updateAqaurium,
    autoExpencesPreference,
    setAutoExpencesPreference,
  } = useAquariumFacade();
  const {parameterConfigList, basicConfig} = useConfigFacade();
  const constant = useConstantFacade();
  const expenseCreateSheetRef = useRef(null);
  const alertRef = useRef(null);
  const [paramsOptions, setParamsOptions] = React.useState([]);
  const unit = basicConfig?.unit;
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    volume: '',
    type: 'fresh_water',
    name: '',
    purchase_date: new Date(),
    group_id: '',
    amount: '',
    param_config_id: '',
  });

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            hitSlop={10}
            onPress={() => expenseCreateSheetRef.current?.open()}>
            <Icon as={MoreVertical} size={22} color={themeColors.textColor} />
          </Pressable>
        ),
      });
    }
  }, []);

  useEffect(() => {
    if (route?.params?.aquarium) {
      const aquarium = route?.params?.aquarium;
      setForm({
        volume: String(aquarium.volume),
        type: aquarium.type,
        name: aquarium.name,
        purchase_date: dayjs.unix(aquarium.purchase_date).toDate(),
        group_id: aquarium.group_id,
        amount: String(aquarium.amount),
        param_config_id: aquarium.param_config_id,
        id: aquarium.id,
      });
    }
  }, [route?.params?.aquarium]);

  useEffect(() => {
    if (parameterConfigList.length > 0) {
      const paramsOptions = parameterConfigList.map(param => ({
        name: param.config_name,
        value: param.id,
      }));
      setParamsOptions(paramsOptions);
    }
  }, [parameterConfigList]);

  const onChange = key => value => {
    setForm(prev => ({...prev, [key]: value}));
    setErrors({...errors, [key]: ''});
  };
  const onSave = () => {
    const validationRules = {
      name: {required: true},
      volume: {required: true, decimal: true},
      param_config_id: {required: true, _name: 'Parameters'},
      group_id: {required: true, _name: 'Group'},
      amount: {required: true, decimal: true},
    };

    const {isValid, errors: newErrors} = validateForm(form, validationRules);

    if (isValid) {
      if (autoExpencesPreference === 'ASK' && !route?.params?.aquarium) {
        alertRef.current?.open();
      } else {
        handleCreate();
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleCreate = isCreateExpense => {
    const payload = {
      ...form,
      purchase_date: dayjs(form.purchase_date).unix(),
      volume: Number(form.volume),
    };
    if (route?.params?.aquarium) {
      // update exsiting aquarium
      updateAqaurium(payload).then(res => {
        if (res.status_code === 200) {
          navigation.goBack();
        }
      });
    } else {
      // Create new
      createAqaurium({payload, isCreateExpense}).then(res => {
        if (res.status_code === 200) {
          navigation.goBack();
        }
      });
    }
  };

  const onReset = () => {
    setForm({
      volume: '',
      type: 'fresh_water',
      name: '',
      purchase_date: new Date(),
      group_id: '',
      amount: '',
      param_config_id: '',
    });
  };
  return (
    <Layout px={0} pb={0}>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Division label={'Basic Details:'}>
            <Input
              value={form.name}
              onChangeText={onChange('name')}
              label="Name:"
              error={errors.name}
            />
            <DatePicker
              mode="date"
              value={form.purchase_date}
              label={'Acquired From:'}
              onValueSelect={onChange('purchase_date')}
            />
            <Input
              value={String(form.volume)}
              inputMode="numeric"
              onChangeText={onChange('volume')}
              label={`Volume: (${
                unit === 'imperial' ? 'Gallon' : 'Cubic Meter'
              })`}
              error={errors.volume}
            />
            <Input
              onChangeText={onChange('amount')}
              value={form.amount}
              inputMode="numeric"
              label={'Purchased For:'}
              error={errors.amount}
            />
          </Division>

          <Division label={'Group and Paramters:'} style={{pb: 50}}>
            <RadioButton
              label="Type:"
              activeValue={form.type?.length > 0 ? form.type : 'fresh_water'}
              onPress={onChange('type')}
              values={constant?.aquariumType}
            />

            <ValueSelector
              label="Parameter:"
              options={paramsOptions}
              value={form.param_config_id}
              onChange={onChange('param_config_id')}
              error={errors.param_config_id}
              additionalComponent={actionSheetRef => {
                return (
                  <Button
                    onPress={() => {
                      actionSheetRef.current?.close();
                      navigation.navigate('ParameterScreen', {
                        from: 'CreateAquariumScreen',
                      });
                    }}
                    guiButtonProps={{
                      borderRadius: 0,
                      width: '100%',
                      mb: 0,
                      height: 55,
                    }}
                    buttonText="Create New Template"
                  />
                );
              }}
            />
            <GroupPicker
              value={form.group_id}
              onChange={onChange('group_id')}
            />
          </Division>
        </ScrollView>

        <HStack px={10} gap={'$3'} pt={10} position="absolute" bottom={10}>
          <Button
            disabled={loading}
            variant="outline"
            buttonText="Reset"
            guiButtonProps={{flex: 1, bgColor: 'white'}}
            onPress={onReset}
          />
          <Button
            disabled={loading}
            showLoading={loading}
            guiButtonProps={{flex: 1}}
            buttonText={route?.params?.expense ? 'Update' : 'Create'}
            onPress={onSave}
          />
        </HStack>
        <ValueSelector
          ref={expenseCreateSheetRef}
          value={autoExpencesPreference}
          label="Create Expense Preference"
          options={constant.userExpensePreferencesType}
          onChange={value => setAutoExpencesPreference(value)}
        />
        <Alert
          ref={alertRef}
          label="Create Expense"
          okText="Yes, Create"
          onCancel={() => handleCreate(false)}
          onOk={() => handleCreate(true)}
          cancelText="No">
          <VStack px={20} py={20}>
            <HStack justifyContent="center">
              <Text fontWeight="$medium" color="$textColor" textAlign="left">
                Do you want to create an expense for this Aquarium?
              </Text>
            </HStack>
            <RadioSelect
              value={autoExpencesPreference}
              onChange={value => setAutoExpencesPreference(value)}
              options={[
                {label: 'Always ask', value: 'ASK'},
                {label: 'Always create, never ask again', value: 'ALWAYS'},
                {value: 'NEVER', label: 'Never create, never ask again'},
              ]}
            />

            <Text fontStyle="italic" size="sm" mt={10}>
              You can always change you preference by pressing the 3 dots on the
              right corner.
            </Text>
          </VStack>
        </Alert>
      </VStack>
    </Layout>
  );
};
