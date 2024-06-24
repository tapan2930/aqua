import {Box, HStack, Text, Pressable} from '@gluestack-ui/themed';

const RadioButton = ({
  multi = false,
  activeValue,
  values,
  onPress,
  label,
  activeColor = '$primary400',
}) => {
  const isSelected = value => {
    if (multi) {
      return activeValue.includes(value);
    } else {
      return activeValue === value;
    }
  };

  const handlePress = value => {
    if (multi) {
      if (activeValue.includes(value)) {
        onPress(activeValue.filter(val => val !== value));
      } else {
        onPress([...activeValue, value]);
      }
    } else {
      onPress(value);
    }
  };
  return (
    <Box mb={24} flex={1}>
      {label && (
        <Text fontWeight="normal" color="$textColor" mb={3}>
          {label}
        </Text>
      )}
      <Box
        justifyContent="center"
        borderWidth={0.5}
        borderRadius={14}
        px={3}
        height={55}
        bgColor="white"
        borderColor="$primary100">
        <HStack alignItems="center" gap={'$1'}>
          {values.map((obj, index) => {
            return (
              <Pressable
                onPress={() => handlePress(obj.value)}
                key={index}
                borderRadius={10}
                py={10}
                flex={1}
                alignItems="center"
                bgColor={isSelected(obj.value) ? activeColor : 'transparent'}>
                <Text
                  textTransform="capitalize"
                  color={isSelected(obj.value) ? 'white' : '$blueGray500'}
                  fontWeight="light">
                  {obj.name}
                </Text>
              </Pressable>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default RadioButton;
