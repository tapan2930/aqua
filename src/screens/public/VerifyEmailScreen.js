import {
  Box,
  Button,
  ButtonText,
  Heading,
  Text,
  HStack,
  InputField,
  Input,
  Spinner,
} from '@gluestack-ui/themed';
import {useState, useRef, useEffect} from 'react';
import useStore from '../../store/useStore';
import {themeColors} from '../../utils/theme';
import Snackbar from 'react-native-snackbar';

// import Input from '../../components/input/Input';
import Layout from '../../components/common/Layout';
import {useUserFacade} from '../../store/facades';
import {useNavigation} from '@react-navigation/native';

const VerifyEmailScreen = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();
  const {loading, error, verifyCode} = useUserFacade();
  const [verificationCode, setVerificationCode] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });
  const setIsUserAuthenticated = useStore(
    state => state.setIsUserAuthenticated,
  );

  useEffect(() => {
    if (error?.length > 0) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: themeColors.primary400,
        textColor: themeColors.white,
      });
    }
  }, [error]);

  const inputRefs = {
    digit1Ref: useRef(null),
    digit2Ref: useRef(null),
    digit3Ref: useRef(null),
    digit4Ref: useRef(null),
    digit5Ref: useRef(null),
    digit6Ref: useRef(null),
  };

  const onChangeText = key => value => {
    setVerificationCode({...verificationCode, [key]: value});

    // Move to the next input field if the current field is not empty
    if (value !== '' && key !== 'digit6') {
      const nextKey = `digit${parseInt(key.charAt(key.length - 1)) + 1}`;
      inputRefs[nextKey + 'Ref'].current.focus();
    } else if (value === '' && key != 'digit1') {
      const prevKey = `digit${parseInt(key.charAt(key.length - 1)) - 1}`;
      inputRefs[prevKey + 'Ref'].current.focus();
    }
  };

  const onLogin = async () => {
    const verficationCodeCombined = Number(
      verificationCode.digit1 +
        verificationCode.digit2 +
        verificationCode.digit3 +
        verificationCode.digit4 +
        verificationCode.digit5 +
        verificationCode.digit6,
    );
    const status = await verifyCode({
      otp: verficationCodeCombined,
      email: email,
    });
    if (status === 200) {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <Layout>
      <Box my={30}>
        <Heading size="3xl" color="$textColor">
          Verify Email
        </Heading>
        <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
          We have sent to a 6 digit code at {email}. Please enter the code below
          to confirm.
        </Text>
      </Box>

      {/* USER INPUT  */}
      <Box justifyContent="space-between" flex={1}>
        <Box>
          <HStack width={'$full'}>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit1Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit1')}
                value={verificationCode.digit1}
                color={themeColors.primary0}
              />
            </Input>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit2Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit2')}
                value={verificationCode.digit2}
                color={themeColors.primary0}
              />
            </Input>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit3Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit3')}
                value={verificationCode.digit3}
                color={themeColors.primary0}
              />
            </Input>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit4Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit4')}
                value={verificationCode.digit4}
                color={themeColors.primary0}
              />
            </Input>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit5Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit5')}
                value={verificationCode.digit5}
                color={themeColors.primary0}
              />
            </Input>
            <Input
              mr={'$2'}
              width={'$10'}
              borderColor="$primary400"
              bg="white"
              borderRadius={10}
              size="xl">
              <InputField
                ref={inputRefs.digit6Ref}
                inputMode="numeric"
                onChangeText={onChangeText('digit6')}
                value={verificationCode.digit6}
                color={themeColors.primary0}
              />
            </Input>
          </HStack>

          <Button
            mt={'$6'}
            borderRadius={10}
            bgColor="$primary400"
            size="xl"
            shadowColor="$primary700"
            shadowOffset={{width: 0, height: 12}}
            elevation={12}
            onPress={onLogin}>
            {loading ? (
              <>
                <Spinner color="$white" mr={6} />
                <ButtonText>Verify Account</ButtonText>
              </>
            ) : (
              <ButtonText>Create Account</ButtonText>
            )}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
export default VerifyEmailScreen;
