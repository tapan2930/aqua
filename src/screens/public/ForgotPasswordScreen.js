// ForgotPasswordScreen.js

import React, {useState} from 'react';
import {Box, Heading, Text, Pressable, Divider} from '@gluestack-ui/themed';
import Button from '../../components/common/Button/Button';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/common/input/Input';
import Layout from '../../components/common/Layout';
import validateForm from '../../utils/formValidator';
import {sentVerificationCode} from '../../apis/User';
import Snackbar from 'react-native-snackbar';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({email: ''});
  const [resetClicked, setResetClicked] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const onChangeText = value => {
    setEmail(value);
    setErrors({...errors, email: ''});
  };

  const onResetPassword = async () => {
    setResetClicked(true);
    const validationRules = {
      email: {required: true, email: true},
    };

    const {isValid, errors: newErrors} = validateForm({email}, validationRules);

    if (isValid) {
      setLoading(true);
      const status = await sentVerificationCode({email: email});
      if (status.status_code === 404) {
        Snackbar.show({
          text: status.error.toUpperCase(),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: themeColors.primary400,
          textColor: themeColors.white,
        });
      } else {
        navigation.navigate('VerifyEmailForForgotPassword', {email});
      }
      setLoading(false);
    } else {
      setErrors(newErrors);
    }
  };

  const navigation = useNavigation();

  return (
    <Layout>
      <Box my={30}>
        <Heading size="3xl" color="$textColor">
          Forgot Password
        </Heading>
        <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
          Enter your email to reset your password
        </Text>
      </Box>

      {/* USER INPUT */}
      <Box>
        <Input
          value={email}
          label={'Email:'}
          type="text"
          inputMode="email"
          onChangeText={onChangeText}
          error={resetClicked && errors.email}
        />
        <Button
          showLoading={loading}
          buttonText="Verify Email"
          onPress={onResetPassword}
        />
      </Box>

      <Box>
        <Divider bg="$coolGray400" my="$4" />
        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text fontSize={'$lg'} fontWeight="normal" color="$primary0">
            Swim back to{' '}
            <Text
              color="$primary0"
              style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </Text>
        </Pressable>
      </Box>
    </Layout>
  );
};

export default ForgotPasswordScreen;
