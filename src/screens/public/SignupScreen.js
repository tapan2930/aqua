import {
  Box,
  Heading,
  Text,
  Pressable,
  HStack,
  Divider,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import Input from '../../components/common/input/Input';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../components/common/Layout';
import validateForm from '../../utils/formValidator';
import {useUserFacade} from '../../store/facades';
import Snackbar from 'react-native-snackbar';
import {themeColors} from '../../utils/theme';
import Button from '../../components/common/Button/Button';

const SignupScreen = () => {
  const navigation = useNavigation();
  const {loading, error, createUser} = useUserFacade();
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const onChangeText = key => value => {
    setUser({...user, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const onSignup = () => {
    const validationRules = {
      email: {required: true, email: true},
      password: {required: true},
      confirmPassword: {required: true, match: 'password'},
    };

    const {isValid, errors: newErrors} = validateForm(user, validationRules);

    if (isValid) {
      onCreateAccount();
    } else {
      setErrors(newErrors);
    }
  };

  const onCreateAccount = async () => {
    const userPayload = {
      email: user['email']?.toLowerCase(),
      password: user['password'],
    };
    const status = await createUser(userPayload);
    if (status === 200) {
      navigation.navigate('VerifyEmailScreen', {email: user['email']});
    }
  };

  return (
    <Layout>
      <Box my={30}>
        <Heading size="3xl" color="$textColor">
          Create Account
        </Heading>
        <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
          Please create an account to continue
        </Text>
      </Box>

      {/* USER INPUT  */}
      <Box justifyContent="space-between" flex={1}>
        <Box>
          <Input
            value={user.email}
            label={'Email:'}
            type="text"
            inputMode="email"
            onChangeText={onChangeText('email')}
            error={errors.email}
          />

          <Input
            value={user.password}
            label={'Password:'}
            type="password"
            onChangeText={onChangeText('password')}
            error={errors.password}
            isPssword
          />

          <Input
            value={user.confirmPassword}
            label={'Confirm Password:'}
            type="password"
            onChangeText={onChangeText('confirmPassword')}
            error={errors.confirmPassword}
            isPssword
          />

          <Button
            buttonText="Create Account"
            showLoading={loading}
            disabled={loading}
            onPress={onSignup}
          />
        </Box>

        <Box>
          <HStack justifyContent="center" alignItems="center">
            <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
              Already have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text color="$primary0" fontSize={'$lg'} fontWeight="normal">
                Login
              </Text>
            </Pressable>
          </HStack>
          <Divider bg="$coolGray400" my="$4" />
        </Box>
      </Box>
    </Layout>
  );
};

export default SignupScreen;
