import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import useStore from '../../../store/useStore';

import {Box, HStack, VStack, Text, Icon, Image} from '@gluestack-ui/themed';
import {UserPlus} from 'lucide-react-native';
import {Pressable} from 'react-native';
import Layout from '../../../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/common/Button/Button';
import Input from '../../../components/common/input/Input';
import Snackbar from 'react-native-snackbar';
import {themeColors} from '../../../utils/theme';
import {useUserFacade} from '../../../store/facades';
import PhaseComplete from '../../../components/common/PhaseComplete/PhaseComplete';

export default UserInfoScreen = () => {
  const {updateUser, loading} = useUserFacade();
  const [imgBs64, setImgBs64] = useState('');
  const [userName, setUserName] = useState({firstName: '', lastName: ''});
  const navigation = useNavigation();
  const setInitialLoad = useStore(state => state.setInitialLoad);

  const onValueChange = key => value => {
    setUserName({...userName, [key]: value});
  };

  const onAddUserPhoto = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
      quality: 1,
      selectionLimit: 1,
    };
    const result = await launchImageLibrary(options);
    if (result?.assets?.length > 0) setImgBs64(result?.assets[0]?.base64);
  };
  const onNextPress = async () => {
    if (userName.firstName.length > 0 && userName.lastName.length > 0) {
      const status = await updateUser({
        full_name: `${userName.firstName} ${userName.lastName}`,
        profile_pic: imgBs64?.length > 0 ? imgBs64 : '__NOPROFILE__',
      });
      if (status === 200) {
        setInitialLoad('GlobalConfigScreen');
        navigation.navigate('GlobalConfigScreen');
      }
    } else {
      Snackbar.show({
        text: 'First Name and Last Name are required',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: themeColors.primary400,
        textColor: themeColors.white,
      });
    }
  };
  return (
    <Layout py={10}>
      <VStack justifyContent="space-between" flex={1}>
        <VStack>
          <PhaseComplete
            activePhase={0}
            phases={['Profile', 'Global Setup', 'Parameters Config']}
          />
          <HStack justifyContent="center" my={'$6'}>
            <Box
              justifyContent="center"
              alignItems="center"
              borderRadius={'$full'}
              h={140}
              w={140}
              overflow="hidden"
              bgColor="#e9e9e9"
              borderWidth={4}
              borderColor="white">
              {imgBs64.length === 0 ? (
                <Icon
                  as={UserPlus}
                  size={60}
                  color="$coolGray400"
                  onPress={onAddUserPhoto}
                />
              ) : (
                <Pressable onPress={onAddUserPhoto}>
                  <Image
                    source={{uri: `data:image/png;base64,${imgBs64}`}}
                    style={{width: 140, height: 140}}
                    alt="user profile image"
                  />
                </Pressable>
              )}
            </Box>
          </HStack>
          <VStack>
            <Input
              label="First Name"
              value={userName.firstName}
              onChangeText={onValueChange('firstName')}
            />
            <Input
              label="Last Name"
              value={userName.lastName}
              onChangeText={onValueChange('lastName')}
            />
          </VStack>
        </VStack>
        <HStack>
          {/* <Button
            buttonText="Skip"
            variant="outline"
            guiButtonProps={{
              mt: 10,
              bgColor: '$white',
              flex: 1,
            }}
            onPress={onNextPress}
          /> */}
          <Button
            disabled={loading}
            showLoading={loading}
            buttonText="Save"
            guiButtonProps={{mt: 10, flex: 1}}
            onPress={onNextPress}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};
