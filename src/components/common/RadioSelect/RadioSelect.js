import React from 'react';
import {
  Text,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from '@gluestack-ui/themed';
import {Check} from 'lucide-react-native';

const RadioSelect = ({onChange, options, value}) => {
  return (
    <RadioGroup onChange={onChange} mt={5} value={value}>
      {options?.map(option => (
        <Radio key={option?.value} mt={5} value={option.value}>
          <RadioIndicator borderColor="$primary0" mr="$2">
            <RadioIcon as={Check} color="$primary0" />
          </RadioIndicator>
          <RadioLabel color="$textColor">{option.label}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  );
};
export default RadioSelect;
