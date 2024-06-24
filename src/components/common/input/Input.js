import {Box, InputIcon, InputSlot, Text} from '@gluestack-ui/themed';
import {themeColors} from '../../../utils/theme';
import {
  Input as GInput,
  InputField,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import {EyeIcon, EyeOffIcon} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';

const Input = forwardRef(
  (
    {
      value = '',
      onChangeText,
      placeholder = '',
      label,
      inputMode = 'text',
      type = 'text' | 'password',
      isPssword = false,
      error,
      flex = false,
      inputProps,
      inputBoxProps,
      inputContainerProps,
      textArea = false,
      suffix,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Box mb={24} flex={flex ? 1 : undefined} {...inputContainerProps}>
        {label && (
          <Text fontWeight="normal" color="$textColor" mb={3}>
            {label}
          </Text>
        )}
        {textArea ? (
          <Textarea
            size="md"
            variant="outline"
            borderWidth={0.5}
            borderColor={error ? '$red400' : '$primary100'}
            bg="white"
            borderRadius={10}
            $focus={{
              borderColor: '$primary400',
            }}>
            <TextareaInput
              value={value}
              onChangeText={onChangeText}
              color={themeColors.textColor}
              cursorColor={themeColors.primary400}
              selectionColor={themeColors.primary50}
              {...inputProps}
            />
          </Textarea>
        ) : (
          <GInput
            variant="outline"
            borderWidth={0.5}
            borderColor={error ? '$red400' : '$primary100'}
            bg="white"
            borderRadius={10}
            size="lg"
            h={55}
            $focus={{
              borderColor: '$primary400',
            }}
            {...inputBoxProps}>
            <InputField
              ref={ref}
              inputMode={inputMode}
              value={value}
              type={isPssword && showPassword ? 'text' : type}
              onChangeText={onChangeText}
              placeholder={placeholder}
              color={themeColors.textColor}
              selectionColor={themeColors.primary50}
              cursorColor={themeColors.primary400}
              {...inputProps}
            />
            <InputSlot onPress={handleTogglePasswordVisibility}>
              {isPssword && (
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$primary400"
                  mr={8}
                />
              )}
            </InputSlot>
            {suffix ? suffix() : null}
          </GInput>
        )}

        {error && (
          <Text color="red" mt={2} ml={2} fontSize={12}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

export default Input;
