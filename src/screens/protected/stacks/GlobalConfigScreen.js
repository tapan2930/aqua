import React, {useState, useEffect} from 'react';
import {Modal, ScrollView} from 'react-native';

import useStore from '../../../store/useStore';

import {HStack, VStack} from '@gluestack-ui/themed';
import Layout from '../../../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/common/Button/Button';

import {getLocales} from 'react-native-localize';
import CountrySelector from '../../../components/globalConfig/CountrySelector';
import CurrencySelector from '../../../components/globalConfig/CurrencySelector';
import RadioButton from '../../../components/common/RadioButton/RadioButton';
import {useConfigFacade} from '../../../store/facades';
import countriesJson from '../../../utils/countries.json';
import PhaseComplete from '../../../components/common/PhaseComplete/PhaseComplete';

export default GlobalConfigScreen = () => {
  const {setBasicConfig, loading, error} = useConfigFacade();
  const [globalConfig, setGlobalConfig] = useState({
    country: null,
    currency: null,
    unit: 'imperial',
  });
  const navigation = useNavigation();
  const setInitialLoad = useStore(state => state.setInitialLoad);

  useEffect(() => {
    const defaultCountry = getLocales()[0]?.countryCode;
    if (defaultCountry) {
      const defaultCountryData = countriesJson.filter(
        country => country.id === defaultCountry,
      );
      if (defaultCountryData?.length > 0) {
        setGlobalConfig({
          ...globalConfig,
          country: defaultCountryData[0],
          currency: defaultCountryData[0],
        });
      }
    }
  }, []);

  const onValueChange = key => value => {
    return setGlobalConfig({...globalConfig, [key]: value});
  };
  const onSave = async () => {
    if (globalConfig.country && globalConfig.currency && globalConfig.unit) {
      const payload = {
        country: globalConfig.country.id,
        currency: globalConfig.currency.currencies.id,
        unit: globalConfig.unit,
      };
      const status = await setBasicConfig(payload);
      if (status === 200) {
        navigation.navigate('ParameterScreen');
        setInitialLoad('ParameterScreen');
      }
    }
  };

  return (
    <Layout py={10}>
      <VStack justifyContent="space-between" flex={1}>
        <VStack>
          <PhaseComplete
            activePhase={1}
            phases={['Profile', 'Global Setup', 'Parameters Config']}
          />
          <VStack pt={10}>
            <RadioButton
              values={[
                {name: 'Imperial', value: 'imperial'},
                {name: 'Metric', value: 'metric'},
              ]}
              activeValue={globalConfig.unit}
              onPress={onValueChange('unit')}
              label={'Unit:'}
            />
            <CurrencySelector
              key={'currencySelector'}
              value={globalConfig.currency}
              onValueSelect={onValueChange('currency')}
            />
            <CountrySelector
              key={'countrySelector'}
              value={globalConfig.country}
              onValueSelect={onValueChange('country')}
            />
          </VStack>
        </VStack>
        <HStack gap={'$3'}>
          <Button
            buttonText="Save"
            guiButtonProps={{mt: 10, flex: 1}}
            onPress={onSave}
            showLoading={loading}
            disabled={loading}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};
