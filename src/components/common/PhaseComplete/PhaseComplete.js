import {HStack, VStack, Text, Box, Icon, CheckIcon} from '@gluestack-ui/themed';
import {useWindowDimensions} from 'react-native';

const PhaseComplete = ({phases, activePhase}) => {
  const {width} = useWindowDimensions();
  const widthPerPhase = [0, (width - 20) / 2 - 54 - 3.5, width - 20 - 54 - 54];
  const activeStyle = (index, activePhase) => {
    const style = {
      box: {
        borderColor: '$blueGray400',
        bgColor: '$background',
      },
      text: {
        color: '$blueGray400',
      },
      labelText: {
        color: '$blueGray400',
      },
    };
    if (activePhase === index) {
      style.box = {
        borderColor: '#74CA65',
        bgColor: '#74CA65',
      };
      style.text = {
        color: 'white',
      };
      style.labelText = {
        color: '$textColor',
      };
    } else if (activePhase > index) {
      style.box = {
        borderColor: '#74CA65',
        bgColor: '#74CA65',
      };
      style.text = {
        color: 'white',
      };
      style.labelText = {
        color: '$textColor',
      };
    }

    return style;
  };
  return (
    <HStack>
      <HStack
        top={15}
        left={54}
        position="absolute"
        h={2}
        width={width - 54 - 54}
        bg="$blueGray400"
      />
      <HStack
        top={15}
        left={54}
        position="absolute"
        h={2}
        width={widthPerPhase[activePhase]}
        bg="#74CA65"
      />

      <HStack justifyContent="space-between" flex={1}>
        {phases.map((phase, index) => (
          <VStack key={index} zIndex={20} alignItems="center" width={'$20'}>
            <Box
              justifyContent="center"
              alignItems="center"
              width={'$7'}
              height={'$7'}
              borderWidth={2}
              borderRadius={'$full'}
              {...activeStyle(index, activePhase).box}>
              {activePhase > index ? (
                <Icon as={CheckIcon} size={'sm'} color="white" />
              ) : (
                <Text
                  {...activeStyle(index, activePhase).text}
                  alignSelf="center">
                  {index + 1}
                </Text>
              )}
            </Box>
            <Text
              {...activeStyle(index, activePhase).labelText}
              textAlign="center"
              width={'$24'}>
              {phase}
            </Text>
          </VStack>
        ))}
      </HStack>
    </HStack>
  );
};

export default PhaseComplete;
