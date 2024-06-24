import React from 'react';
import {Box, HStack, Icon, Text} from '@gluestack-ui/themed';
import {ChevronRight, Newspaper} from 'lucide-react-native';

const Division = ({label, style, children}) => {
  return (
    <Box
      mb={16}
      overflow="hidden"
      borderColor="$primary100"
      borderBottomWidth={0.5}
      {...style}>
      {label && (
        <HStack
          py={10}
          px={10}
          borderWidth={0}
          alignItems="center"
          // borderTopWidth={1}
          borderColor="$primary100"
          borderTopLeftRadius={12}
          borderTopRightRadius={12}>
          <Text fontSize={'$md'} fontWeight="$medium" color="$textColor">
            {label}
          </Text>
        </HStack>
      )}
      <Box
        backgroundColor="$background"
        pt={10}
        borderBottomRightRadius={12}
        borderBottomLeftRadius={12}
        px={10}>
        {children}
      </Box>
    </Box>
  );
};
export default Division;

{
  /* <HStack
        bgColor="white"
        py={20}
        px={10}
        borderWidth={0.5}
        borderBottomWidth={0}
        borderColor="$primary100"
        borderTopLeftRadius={12}
        borderTopRightRadius={12}>
        <Text fontSize={'$lg'} fontWeight="$medium" color="$textColor">
          {label}
        </Text>
      </HStack> */
}
