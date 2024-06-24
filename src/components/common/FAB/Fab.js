import React from 'react';
import {Box, Icon, Pressable} from '@gluestack-ui/themed';
import {themeColors} from '../../../utils/theme';

const Fab = ({onPress, icon}) => {
  return (
    <Box
      bg="$primary0"
      position="absolute"
      bottom={'$10'}
      right={'$3'}
      borderRadius={'$full'}
      hardShadow="2"
      overflow="hidden">
      <Pressable
        android_ripple={{color: themeColors.primary200 + '33'}}
        p={'$3'}
        onPress={onPress}>
        <Icon as={icon} size={30} color="white" />
      </Pressable>
    </Box>
  );
};
export default Fab;
