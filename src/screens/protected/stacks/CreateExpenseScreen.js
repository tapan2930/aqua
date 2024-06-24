import React, {useState, useEffect} from 'react';
import Layout from '../../../components/common/Layout';
import {VStack, HStack, ScrollView, Text, Box} from '@gluestack-ui/themed';
import Input from '../../../components/common/input/Input';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import Button from '../../../components/common/Button/Button';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {
  useAquariumFacade,
  useConstantFacade,
  useExpenseFacade,
} from '../../../store/facades';
import ValueSelector from '../../../components/common/ValueSelector/ValueSelector';
import DatePicker from '../../../components/common/DatePicker/DatePicker';
import dayjs from 'dayjs';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector';
import validateForm from '../../../utils/formValidator';

const CreateExpenseScreen = ({navigation, route}) => {
  const constants = useConstantFacade();
  const {aquariums} = useAquariumFacade();
  const {createExpense, loading} = useExpenseFacade();
  const [form, setForm] = useState({
    name: '',
    type: '',
    quantity: '',
    pricePerUnit: '',
    total: '',
    selectionType: 'default',
    aquarium_id: '',
    date: new Date(),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route?.params?.expense) {
      const expense = route?.params?.expense;
      console.log('expense', expense);
      setForm({
        type: expense.type,
        name: expense.name,
        date: dayjs.unix(expense.date).format('YYYY-MM-DD'),
        quantity: String(expense.quantity),
        total: String(expense.total),
        pricePerUnit: String(expense.price_per_unit),
        selectionType: expense.selection_type,
        aquarium_id: expense.aquarium_id,
        id: expense.id,
      });
    }
  }, [route?.params?.expense]);

  const onChange = key => value => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const calculateTotal = () => {
    const quantity = parseFloat(form.quantity);
    const pricePerUnit = parseFloat(form.pricePerUnit);

    if (!isNaN(quantity) && !isNaN(pricePerUnit)) {
      const total = quantity * pricePerUnit;
      setForm(prev => ({...prev, total: total.toString()}));
    } else {
      setForm(prev => ({...prev, total: ''}));
    }
  };
  const onSave = () => {
    const validationRules = {
      name: {required: true},
      type: {required: true},
      quantity: {required: true, integer: true},
      pricePerUnit: {required: true, decimal: true, _name: 'Price per unit'},
      total: {required: true, decimal: true},
      aquarium_id: {
        required: form.selectionType === 'default' ? false : true,
        _name: 'Aquarium',
      },
    };

    const {isValid, errors: newErrors} = validateForm(form, validationRules);

    if (isValid) {
      const payload = {
        ...form,
        quantity: parseFloat(form.quantity),
        total: parseFloat(form.total),
        price_per_unit: parseFloat(form.pricePerUnit),
        selection_type: form.selectionType,
        date: dayjs(form.date).unix(),
      };

      if (route?.params?.expense) {
        console.log('update');
      } else {
        console.log('create');
        createExpense(payload).then(data => {
          if (data.status_code === 200) {
            navigation.goBack();
          }
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const onReset = () => {
    setErrors({});
    setForm({
      ...form,
      name: '',
      type: 'equipment',
      quantity: '',
      pricePerUnit: '',
      total: '',
      selectionType: 'default',
      selectedAquariums: [],
    });
  };
  return (
    <Layout pb={10}>
      <VStack flex={1}>
        <ScrollView py={10} showsVerticalScrollIndicator={false}>
          <Input
            value={form.name}
            onChangeText={onChange('name')}
            label="Name"
            error={errors.name}
          />
          <ValueSelector
            label="Type:"
            options={[
              {name: 'Equipment', value: 'equipment'},
              {name: 'Live Stock', value: 'live_stock'},
            ]}
            value={form.type}
            onChange={onChange('type')}
            error={errors.type}
          />

          <HStack gap={'$3'}>
            <Input
              value={form.quantity}
              onChangeText={onChange('quantity')}
              label="Quantity"
              inputMode="numeric"
              inputProps={{onBlur: calculateTotal}}
              flex
              error={errors.quantity}
            />
            <Input
              value={form.pricePerUnit}
              onChangeText={onChange('pricePerUnit')}
              label="Price per unit"
              inputMode="numeric"
              inputProps={{onBlur: calculateTotal}}
              flex
              error={errors.pricePerUnit}
            />
          </HStack>
          <HStack gap={'$3'} alignContent="center">
            <Box
              flex={1}
              height={46}
              alignContent="center"
              justifyContent="center">
              <Text fontWeight="$semibold" color="$textColor">
                Total
              </Text>
            </Box>
            <Input
              inputProps={{readOnly: true}}
              value={form.total}
              editable={false}
              disabled
              flex
              error={errors.total}
            />
          </HStack>
          <RadioButton
            label="Selection Type"
            activeValue={form.selectionType}
            onPress={onChange('selectionType')}
            values={constants.expenseSelctionType}
          />
          {form.selectionType === 'custom' && aquariums.length === 0 && (
            <Text color="red">No Aquarium Created</Text>
          )}
          {form.selectionType === 'custom' && aquariums.length > 0 && (
            <AquariumSelector
              label={'Select Aquarium'}
              value={form.aquarium_id}
              onSelect={onChange('aquarium_id')}
              style={(box = {borderWidth: 0})}
            />
          )}
          <DatePicker
            mode="date"
            value={form.date}
            label={'Date:'}
            onValueSelect={onChange('date')}
          />
        </ScrollView>
        <HStack gap={'$3'} pt={10}>
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
      </VStack>
    </Layout>
  );
};

export default CreateExpenseScreen;
