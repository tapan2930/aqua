import React, {useRef, useCallback} from 'react';
import {Box, VStack, HStack, Text, ScrollView} from '@gluestack-ui/themed';
import Layout from '../../../components/common/Layout';
import Input from '../../../components/common/input/Input';
import Button from '../../../components/common/Button/Button';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CreateGroupSheet from '../../../components/group/CreateGroupSheet';

const CreateGroupScreen = () => {
  const bottomSheetModalRef = useRef(null);
  return (
    <Layout px={0}>
      <ScrollView></ScrollView>
      <CreateGroupSheet ref={bottomSheetModalRef} />
      <Button
        buttonText="Toggle Modal"
        onPress={() => bottomSheetModalRef.current.open()}
      />
    </Layout>
  );
};
export default CreateGroupScreen;
