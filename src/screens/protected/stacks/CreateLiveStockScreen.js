import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import Layout from '../../../components/common/Layout';
import {
  VStack,
  HStack,
  ScrollView,
  Pressable,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import Input from '../../../components/common/input/Input';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import Button from '../../../components/common/Button/Button';
import {useConstantFacade, useLiveStockFacade} from '../../../store/facades';
import ValueSelector from '../../../components/common/ValueSelector/ValueSelector';
import DatePicker from '../../../components/common/DatePicker/DatePicker';
import dayjs from 'dayjs';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector';
import validateForm from '../../../utils/formValidator';
import {MoreVertical} from 'lucide-react-native';
import {themeColors} from '../../../utils/theme';
import Alert from '../../../components/common/Alert/Alert';
import RadioSelect from '../../../components/common/RadioSelect/RadioSelect';

const CreateLiveStockScreen = ({navigation, route}) => {
  const expenseCreateSheetRef = useRef(null);
  const alertRef = useRef(null);
  const constant = useConstantFacade();
  const {
    createLiveStock,
    updateLiveStock,
    loading,
    autoExpencesPreference,
    setAutoExpencesPreference,
  } = useLiveStockFacade();
  const [liveStockId, setLiveStockId] = useState('');
  const [form, setForm] = useState({
    name: '',
    livestock_type: constant.liveStockCategories[0].value,
    status: constant.liveStockStatus[0].value,
    price: '',
    description: '',
    aquarium_id: '',
    acquired_on: new Date(),
  });
  const [errors, setErrors] = useState({});

  console.log(autoExpencesPreference, 'saf');

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
    if (route?.params?.liveStock) {
      setLiveStockId(route?.params?.liveStock?.id);
      const liveStock = route?.params?.liveStock;
      setForm({
        name: liveStock.name,
        livestock_type: liveStock.livestock_type,
        status: String(liveStock.status),
        price: String(liveStock.price),
        description: liveStock.description,
        aquarium_id: liveStock.aquarium_id,
        acquired_on: dayjs.unix(liveStock.acquired_on).toDate(),
      });
    }
  }, [route?.params?.liveStock]);

  const onChange = key => value => {
    setForm(prev => ({...prev, [key]: value}));
    setErrors(prev => ({...prev, [key]: ''}));
  };

  const onSave = () => {
    const validationRules = {
      name: {required: true},
      description: {required: true},
      price: {required: true, decimal: true},
      aquarium_id: {required: true, _name: 'Group'},
    };
    const {isValid, errors: newErrors} = validateForm(form, validationRules);

    if (isValid) {
      if (autoExpencesPreference === 'ASK' && !route?.params?.liveStock) {
        alertRef.current?.open();
      } else {
        handleCreate();
      }
    } else {
      setErrors(newErrors);
    }
  };

  handleCreate = isCreateExpense => {
    alertRef.current.close();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      status: parseInt(form.status),
      acquired_on: dayjs(form.date).unix(),
    };

    if (route?.params?.liveStock) {
      // update live stock
      updateLiveStock({payload, liveStockId}).then(res => {
        if (res?.status_code === 200) {
          navigation.goBack();
        }
      });
    } else {
      // Create new live Stock
      createLiveStock({payload, isCreateExpense}).then(res => {
        if (res?.status_code === 200) {
          navigation.goBack();
        }
      });
    }
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
            value={form.livestock_type}
            label="Type"
            options={constant.liveStockCategories}
            onChange={onChange('livestock_type')}
          />

          <AquariumSelector
            value={form.aquarium_id}
            onSelect={onChange('aquarium_id')}
            style
            label={'Select Aquarium'}
          />

          <DatePicker
            value={form.acquired_on}
            label={'Acquired On'}
            onValueSelect={onChange('acquired_on')}
          />

          <RadioButton
            onPress={onChange('status')}
            activeValue={form.status}
            label={'Status'}
            values={constant.liveStockStatus}
          />

          <Input
            textArea
            value={form.description}
            onChangeText={onChange('description')}
            label="Description"
            error={errors.description}
          />

          <Input
            value={form.price}
            type="number"
            inputMode="decimal"
            onChangeText={onChange('price')}
            label="Price"
            error={errors.price}
          />
        </ScrollView>
        <HStack gap={'$3'} pt={10}>
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
            disabled={loading}
            showLoading={loading}
            guiButtonProps={{flex: 1}}
            buttonText={route?.params?.liveStock ? 'Update' : 'Create'}
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
                Do you want to create an expense for this live stock?
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

export default CreateLiveStockScreen;
