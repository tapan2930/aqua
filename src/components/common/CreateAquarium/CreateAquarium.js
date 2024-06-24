import React from 'react';
import {Box, ScrollView, VStack, Hstack, Text} from '@gluestack-ui/themed';
import Button from '../Button/Button';
import {useNavigation} from '@react-navigation/native';
import AquariumBGSVG from '../../../assets/images/AquariumBgSVG';

const CreateAquarium = () => {
  const navigation = useNavigation();
  return (
    <Box flex={1} justifyContent="center" mt={-30} px={10} alignItems="center">
      <AquariumBGSVG />
      <Button
        buttonText="Create Aquarium"
        onPress={() => navigation.navigate('CreateAquariumScreen')}
      />
    </Box>
  );
};
export default CreateAquarium;
