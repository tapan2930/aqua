import {
  Box,
  Heading,
  Text,
  Pressable,
  HStack,
  Divider,
} from '@gluestack-ui/themed';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/common/input/Input';
import Layout from '../../components/common/Layout';
import {useUserFacade} from '../../store/facades';
import Button from '../../components/common/Button/Button';
import validateForm from '../../utils/formValidator';
import showSnackbar from '../../utils/snackbar';

const LoginScreen = () => {
  const [errors, setErrors] = useState({email: '', password: ''});
  const navigation = useNavigation();
  const {loading, error, loginUser} = useUserFacade();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  // Tapan@12345
  // tamiko93613@710b1a8.cse445.com
  // mayiges842@alibrs.com
  // xatasef123@laymro.com
  // rujuta's :: hoxeh90799@fahih.com
  // rujuta's :: Rujuta@31
  useEffect(() => {
    if (error?.length > 0) {
      showSnackbar(error);
    }
  }, [error]);

  const onChangeText = key => value => {
    setUser({...user, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const onLogin = async () => {
    const validationRules = {
      email: {required: true, email: true},
      password: {required: true},
    };
    const {isValid, errors: newErrors} = validateForm(user, validationRules);

    if (isValid) {
      const userPayload = {
        email: user['email']?.toLowerCase(),
        password: user['password'],
      };
      const status = await loginUser(userPayload);
      if (status === 401) {
        navigation.navigate('VerifyEmailScreen', {email: user['email']});
      }
    } else {
      setErrors(newErrors);
    }
  };

  const onForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <Layout>
      <Box my={30}>
        <Heading size="3xl" color="$textColor">
          Login
        </Heading>
        <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
          Please sign in to continue
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
          <HStack justifyContent="flex-end" alignItems="center" mt={-20}>
            <Pressable onPress={onForgotPassword}>
              <Text color="$primary0" fontSize={'$lg'} fontWeight="normal">
                Forgot Password?
              </Text>
            </Pressable>
          </HStack>

          <Button
            guiButtonProps={{mt: 16}}
            buttonText="Login"
            showLoading={loading}
            onPress={onLogin}
            disabled={loading}
          />
        </Box>

        <Box>
          <HStack justifyContent="center" alignItems="center">
            <Text fontSize={'$lg'} fontWeight="normal" color="$textColor">
              Don't have an account ?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('SignupScreen')}>
              <Text color="$primary0" fontSize={'$lg'} fontWeight="normal">
                Sign Up
              </Text>
            </Pressable>
          </HStack>
          <Divider bg="$coolGray400" my="$4" />
        </Box>
      </Box>
    </Layout>
  );
};
export default LoginScreen;
