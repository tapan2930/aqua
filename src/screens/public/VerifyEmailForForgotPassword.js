// VerifyEmailForForgotPassword.js

import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  Text,
  Pressable,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/common/input/Input';
import Layout from '../../components/common/Layout';
import validateForm from '../../utils/formValidator';
import {useUserFacade} from '../../store/facades';

const VerifyEmailForForgotPassword = ({route}) => {
  const {email} = route.params;
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({otp: ''});
  const [verifyClicked, setVerifyClicked] = useState(false);
  const {verifyCode} = useUserFacade();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPasswordClicked, setResetPasswordClicked] = useState(false);

  const onChangeText = value => {
    if (!showResetPassword) {
      setOtp(value);
      setErrors({...errors, otp: ''});
    } else {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const onVerify = async () => {
    setVerifyClicked(true);
    const validationRules = {
      otp: {required: true},
    };

    const {isValid, errors: newErrors} = validateForm({otp}, validationRules);

    if (isValid) {
      try {
        const status = await verifyCode({otp: Number(otp), email: email});

        if (status === 200) {
          setShowResetPassword(true);
        } else {
          setErrors({...newErrors, otp: 'Invalid OTP'});
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const onResetPassword = () => {
    setResetPasswordClicked(true);

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    // Perform password reset logic here
    console.log('Reset Password Logic:', newPassword);

    // After successful password reset, navigate to the new login screen
    // navigation.navigate('NewLoginScreen');
  };

  const navigation = useNavigation();

  return (
    <Layout>
      <Box my={30}>
        <Heading size="3xl" color="$textColor">
          Verify Email
        </Heading>
        <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
          resetting {email}'s password
        </Text>
      </Box>

      {/* USER INPUT */}
      <Box>
        {showResetPassword ? (
          <>
            {/* New Password Input */}
            <Input
              label={'New Password:'}
              type="password"
              onChangeText={setNewPassword}
              isPssword
              value={newPassword}
            />

            {/* Confirm Password Input */}
            <Input
              label={'Confirm Password:'}
              type="password"
              onChangeText={setConfirmPassword}
              isPssword
              error={
                resetPasswordClicked &&
                confirmPassword !== newPassword &&
                'Passwords do not match'
              }
              value={confirmPassword}
            />

            {/* Reset Password Button */}
            <Button
              borderRadius={10}
              bgColor="$primary400"
              size="xl"
              shadowColor="$primary700"
              shadowOffset={{width: 0, height: 12}}
              elevation={12}
              onPress={onResetPassword}>
              <ButtonText>Reset Password</ButtonText>
            </Button>
          </>
        ) : (
          // OTP input
          <Input
            value={otp}
            label={'OTP:'}
            type="text"
            inputMode="numeric"
            onChangeText={onChangeText}
            error={verifyClicked && errors.otp}
            editable={!showResetPassword}
          />
        )}

        {!showResetPassword && (
          <Button
            borderRadius={10}
            bgColor="$primary400"
            size="xl"
            shadowColor="$primary700"
            shadowOffset={{width: 0, height: 12}}
            elevation={12}
            onPress={onVerify}>
            <ButtonText>Verify OTP</ButtonText>
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default VerifyEmailForForgotPassword;
