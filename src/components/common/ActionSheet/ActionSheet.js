import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import {Heading, Pressable} from '@gluestack-ui/themed';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
  Directions,
} from 'react-native-gesture-handler';
import {Modal, KeyboardAvoidingView, useWindowDimensions} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {AnimatePresence, MotiView} from 'moti';

const ActionSheet = forwardRef(
  ({label, callbackOnVisibleChange, onModalShow, children, header}, ref) => {
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

    const flingDown = Gesture.Fling()
      .direction(Directions.DOWN)
      .onStart(event => {
        runOnJS(setIsOpened)(false);
      });

    const onLayout = event => {
      const {height} = event.nativeEvent.layout;
      setY(height);
    };

    return (
      <AnimatePresence>
        {isOpened && (
          <Modal
            onShow={onModalShow}
            statusBarTranslucent
            onRequestClose={() => setIsOpened(false)}
            hardwareAccelerated
            transparent={true}
            visible={isOpened}
            animationType="fade">
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
              <Pressable
                bgColor="#00000033"
                flex={1}
                onPress={() => setIsOpened(!isOpened)}>
                <GestureHandlerRootView
                  style={{
                    marginTop: 'auto',
                    maxHeight: '70%',
                  }}>
                  <GestureDetector gesture={Gesture.Exclusive(flingDown)}>
                    <MotiView
                      onLayout={onLayout}
                      style={{
                        marginTop: 'auto',
                        height: 'auto',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                      from={{transform: [{translateY: y}]}}
                      animate={{transform: [{translateY: 0}]}}
                      exit={{transform: [{translateY: y}]}}
                      transition={{type: 'timing', duration: 200}}>
                      {header ? (
                        header()
                      ) : (
                        <Heading
                          py={16}
                          borderBottomWidth={1}
                          borderBottomColor="$blueGray300"
                          textAlign="center">
                          {label}
                        </Heading>
                      )}
                      {children}
                    </MotiView>
                  </GestureDetector>
                </GestureHandlerRootView>
              </Pressable>
            </KeyboardAvoidingView>
          </Modal>
        )}
      </AnimatePresence>
    );
  },
);
export default ActionSheet;
