import {Box, Text} from '@gluestack-ui/themed';
const NoTouchFull = () => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}></Box>
  );
};

export default NoTouchFull;
