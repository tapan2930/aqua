import React from 'react';
import useStore from '../../../store/useStore';
import Layout from '../../../components/common/Layout';
import {Box} from '@gluestack-ui/themed';
import {Pressable} from 'react-native';
import Button from '../../../components/common/Button/Button';

export default HomeScreen = () => {
  const logoutUser = useStore(state => state.logoutUser);

  return (
    <Layout>
      <Box justifyContent="center" flex={1}>
        <Button buttonText="Logout" onPress={logoutUser} />
      </Box>
    </Layout>
  );
};
