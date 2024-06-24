import React, {useState, useEffect} from 'react';
import Layout from '../../../components/common/Layout';
import {VStack, HStack, ScrollView, Text, Box, set} from '@gluestack-ui/themed';
import Input from '../../../components/common/input/Input';
import Button from '../../../components/common/Button/Button';
import {
  useAquariumFacade,
  useConfigFacade,
  useParamFacade,
} from '../../../store/facades';
import DateTimeSelector from '../../../components/common/DatePicker/DatePicker';
import dayjs from 'dayjs';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector';
import Division from '../../../components/common/Division/Division';

const CreateParameterScreen = ({navigation, route}) => {
  const {createParam} = useParamFacade();
  const {parameterConfigList} = useConfigFacade();
  const {aquariums} = useAquariumFacade();
  const [selectedAquarium, setSelectedAquarium] = useState(aquariums?.[0]?.id);
  const [parameterConfig, setParameterConfig] = useState({});
  const [errors, setErrors] = useState({});
  const [aquariumId, setAquariumId] = useState(aquariums?.[0]?.id);
  const [form, setForm] = useState({
    date: new Date(),
    params: {},
  });

  useEffect(() => {
    if (aquariumId) {
      const selectedAquarium = aquariums.find(
        aquarium => aquarium.id === aquariumId,
      );
      const parameterIdByAquarium = selectedAquarium?.param_config_id;

      if (parameterIdByAquarium) {
        console.log('parameterIdByAquarium', parameterConfigList);
        const parameterConfig = parameterConfigList?.find(
          config => config.id === parameterIdByAquarium,
        );
        if (parameterConfig) {
          setParameterConfig(parameterConfig);
          setForm({...form, params: {}});
        }
      }
      setSelectedAquarium(selectedAquarium);
    }
  }, [aquariumId]);

  const onChange = key => value => {
    if (key === 'aquarium_id' || key === 'date') {
      setForm(prev => ({...prev, [key]: value}));
    } else {
      if (
        !(
          parseFloat(value?.value) < parseFloat(value?.min) ||
          parseFloat(value?.value) > parseFloat(value?.max)
        )
      ) {
        setErrors({...errors, [key]: ''});
        setForm(prev => ({
          ...prev,
          params: {...prev.params, [key]: value?.value},
        }));
      }
    }
  };

  const onReset = () => {
    setErrors({});
    setForm({
      aquarium_id: aquariums?.[0]?.id,
      date: new Date(),
      params: {},
    });
  };

  const onSave = () => {
    parameterConfig?.params?.forEach(param => {
      if (
        form.params[param.name] === undefined ||
        form.params[param.name] === ''
      ) {
        setErrors(prev => ({...prev, [param.name]: 'This field is required'}));
      }
    });

    const payload = {
      params: Object.keys(form.params).reduce((acc, key) => {
        return {...acc, [key]: parseFloat(form.params[key])};
      }, {}),
      date: dayjs(form.date).unix(),
    };

    console.log('payload', payload);

    if (route?.params?.from) {
      console.log('update');
    } else {
      console.log('create');
      createParam(aquariumId, payload).then(data => {
        if (data?.status_code === 200) {
          navigation.goBack();
        }
      });
    }
  };
  return (
    <Layout px={0} pb={10}>
      <VStack flex={1}>
        <ScrollView py={10} showsVerticalScrollIndicator={false}>
          <Division>
            <AquariumSelector
              label="Select Aquarium"
              value={aquariumId}
              onSelect={setAquariumId}
              style
            />
          </Division>
          <Division label={`${parameterConfig?.config_name}`}>
            {parameterConfig?.params?.map((param, idx) => (
              <HStack key={idx} gap={'$3'} alignContent="center">
                <Box
                  flex={1}
                  mb={24}
                  alignContent="center"
                  justifyContent="center">
                  <Text fontWeight="$semibold" color="$textColor">
                    {param.name}:
                  </Text>
                  <HStack gap={'$3'}>
                    <Text size="xs">Min: {param?.min}</Text>
                    <Text size="xs">Max: {param?.max}</Text>
                  </HStack>
                </Box>
                <Input
                  inputMode="numeric"
                  value={form.params[param.name]}
                  onChangeText={value =>
                    onChange(param.name)({
                      value: value,
                      min: param.min,
                      max: param.max,
                    })
                  }
                  flex
                  error={errors[param.name]}
                  suffix={() => (
                    <Box justifyContent="center" alignItems="center" mr={10}>
                      <Text fontWeight="$semibold" color="$textColor">
                        {param.unit}
                      </Text>
                    </Box>
                  )}
                />
              </HStack>
            ))}

            <DateTimeSelector
              mode="date"
              value={form.date}
              label={'Date:'}
              onValueSelect={onChange('date')}
              datePickerConfig={{
                minimumDate: dayjs
                  .unix(selectedAquarium?.purchase_date)
                  .toDate(),
              }}
            />
          </Division>
        </ScrollView>
        <HStack px={10} gap={'$3'} pt={10}>
          <Button
            // disabled={loading}
            variant="outline"
            buttonText="Reset"
            guiButtonProps={{flex: 1, bgColor: 'white'}}
            onPress={onReset}
          />
          <Button
            // disabled={loading}
            // showLoading={loading}
            guiButtonProps={{flex: 1}}
            buttonText={route?.params?.expense ? 'Update' : 'Create'}
            onPress={onSave}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};

export default CreateParameterScreen;
