import React, {useState, useEffect} from 'react';
import useStore from '../../../store/useStore';
import {VStack, HStack, ScrollView} from '@gluestack-ui/themed';
import Layout from '../../../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import {useConfigFacade} from '../../../store/facades';
import Input from '../../../components/common/input/Input';
import ParameterSelector from '../../../components/parameterConfig/ParameterSelector';
import Button from '../../../components/common/Button/Button';
import Snackbar from 'react-native-snackbar';
import {themeColors} from '../../../utils/theme';
import PhaseComplete from '../../../components/common/PhaseComplete/PhaseComplete';

export default ParameterScreen = ({navigation, route}) => {
  const {
    loading,
    error,
    setParameterConfig,
    parameterConfig: initalParams,
  } = useConfigFacade();
  const setInitalLoad = useStore(state => state.setInitialLoad);
  const [parameterConfig, setparameterConfig] = useState({
    config_name: '',
    params: [],
  });

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: themeColors.primary400,
        textColor: themeColors.white,
      });
    }
  }, [error]);

  useEffect(() => {
    setparameterConfig(initalParams);
  }, [initalParams]);

  const onValueChange = key => value => {
    return setparameterConfig({...parameterConfig, [key]: value});
  };

  const onSave = async () => {
    const status = await setParameterConfig(parameterConfig);
    if (status === 200) {
      if (route.params?.from) {
        navigation.navigate(route.params?.from);
      } else {
        setInitalLoad('TabNavigator');
        navigation.navigate('TabNavigator');
      }
    }
  };

  return (
    <Layout py={10}>
      {!route.params?.from && (
        <PhaseComplete
          activePhase={2}
          phases={['Profile', 'Global Setup', 'Parameters Config']}
        />
      )}
      <VStack justifyContent="space-between" flex={1}>
        <VStack>
          <Input
            label={'Template Name:'}
            value={parameterConfig.config_name}
            onChangeText={onValueChange('config_name')}
          />
        </VStack>
        <ScrollView>
          <ParameterSelector
            onValuesSelected={onValueChange('params')}
            selelctedValues={parameterConfig.params}
          />
        </ScrollView>
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
