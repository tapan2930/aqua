import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import {Heading, Pressable, Box, HStack} from '@gluestack-ui/themed';
import Button from '../Button/Button.js';
import {
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

const Alert = forwardRef(
  (
    {
      label,
      onOk,
      onCancel,
      okText = 'Confirm',
      cancelText = 'Cancel',
      callbackOnVisibleChange,
      onModalShow,
      children,
    },
    ref,
  ) => {
    const {height} = useWindowDimensions();
    const yScreen = height * 0.3;
    const [y, setY] = useState(yScreen);
    const [isOpened, setIsOpened] = useState(false);
    const modalRef = useRef(null);
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpened(true);
      },
      close: () => {
        setIsOpened(false);
      },
      isOpened,
      modalRef,
    }));

    useEffect(() => {
      if (callbackOnVisibleChange) {
        callbackOnVisibleChange(isOpened);
      }
    }, [isOpened]);

    return (
      <Modal
        onShow={onModalShow}
        statusBarTranslucent
        onRequestClose={() => setIsOpened(false)}
        hardwareAccelerated
        transparent={true}
        visible={isOpened}
        animationType="fade">
        <Pressable
          bgColor="#00000033"
          flex={1}
          justifyContent="center"
          px={10}
          onPress={() => setIsOpened(!isOpened)}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <Box backgroundColor="white" borderRadius={12}>
              <Heading
                py={16}
                borderBottomWidth={0.5}
                borderBottomColor="$blueGray300"
                textAlign="center">
                {label}
              </Heading>
              {children}
              <HStack
                borderTopWidth={0.5}
                borderTopColor="$blueGray300"
                justifyContent="flex-end"
                gap={'$3'}
                px={10}
                py={10}>
                <Button
                  onPress={onCancel}
                  variant="outline"
                  guiButtonProps={{height: 45}}>
                  {cancelText}
                </Button>
                <Button onPress={onOk} guiButtonProps={{height: 45}}>
                  {okText}
                </Button>
              </HStack>
            </Box>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    );
  },
);
export default Alert;
