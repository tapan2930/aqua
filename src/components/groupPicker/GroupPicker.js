import React, {useState, useEffect, useRef} from 'react';

import {
  Box,
  HStack,
  Text,
  Pressable,
  ScrollView,
  Icon,
  Heading,
} from '@gluestack-ui/themed';
import ActionSheet from '../common/ActionSheet/ActionSheet';
import Button from '../common/Button/Button';
import {useAquariumFacade} from '../../store/facades';
import CreateGroupSheet from '../group/CreateGroupSheet';
import {ChevronDown, ChevronUp, Edit, Trash2} from 'lucide-react-native';

const GroupPicker = ({value, onChange}) => {
  const {deleteGroup} = useAquariumFacade();
  const [focused, setFocused] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {groups} = useAquariumFacade();
  const actionSheetRef = useRef(null);
  const groupCreateSheetRef = useRef(null);
  const [selected, setSelected] = useState(value);
  const [disabled, setDisabled] = useState('');

  useEffect(() => {
    if (groups.length > 0) {
      const selectedOption = groups.find(option => option.group_id === value);
      setSelected(selectedOption);
    }
  }, [value]);

  const callbackOnVisibleChange = isOpened => {
    setFocused(isOpened);
  };

  const onSelect = option => {
    console.log('option', groups);
    onChange(option?.group_id);
  };

  const onEdit = group => {
    groupCreateSheetRef.current.open(group);
  };

  const onDelete = async groupid => {
    setDisabled(groupid);
    await deleteGroup(groupid).then(res => {
      setDisabled('');
    });
  };

  return (
    <Box mb={24}>
      <Text fontWeight="normal" color="$textColor" mb={3}>
        Group:
      </Text>
      <Pressable onPress={() => actionSheetRef.current.open()}>
        <HStack
          bg="white"
          borderRadius={11}
          borderColor={focused ? '$primary400' : '$primary100'}
          borderWidth={0.5}
          px={6}
          height={55}
          gap={'$3'}
          alignItems="center">
          <Box
            height={'$6'}
            width={'$6'}
            borderRadius={'$full'}
            bgColor={selected?.hex_code || 'white'}></Box>
          <Text color={'$textColor'} fontSize={'$lg'}>
            {selected?.group_name}
          </Text>
          <Icon
            position="absolute"
            right={10}
            top={12}
            size="xl"
            as={focused ? ChevronUp : ChevronDown}
            color={'$primary400'}
          />
        </HStack>
      </Pressable>
      <ActionSheet
        label={'Select Group:'}
        ref={actionSheetRef}
        callbackOnVisibleChange={callbackOnVisibleChange}
        header={() => (
          <HStack
            borderBottomWidth={1}
            borderBottomColor="$blueGray300"
            height={55}
            justifyContent="center"
            alignItems="center">
            <Heading>Select Group</Heading>
            <Icon
              position="absolute"
              right={10}
              as={Edit}
              size={24}
              onPress={() => setIsEdit(!isEdit)}
            />
          </HStack>
        )}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          borderTopWidth={1}
          borderColor="$blueGray200">
          {groups &&
            groups?.length > 0 &&
            groups.map((option, index) => (
              <Pressable
                key={option?.group_name}
                onPress={() => {
                  !(disabled === option?.group_id) && onSelect(option);
                  actionSheetRef.current?.close();
                }}
                px={6}
                py={12}
                borderBottomWidth={1}
                borderColor="$blueGray200"
                bg={disabled === option?.group_id ? '$blueGray200' : '$white'}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <HStack alignItems="center" gap={'$3'}>
                  <Box
                    height={'$10'}
                    width={'$10'}
                    borderRadius={'$full'}
                    bgColor={option?.hex_code || 'white'}></Box>
                  <Text color={'$textColor'}>{option?.group_name}</Text>
                </HStack>
                {isEdit && (
                  <HStack mr={'$3'}>
                    <Icon
                      as={Edit}
                      size={22}
                      mr={'$4'}
                      hitSlop={10}
                      onPress={() => onEdit(option)}
                    />
                    <Icon
                      as={Trash2}
                      size={22}
                      color="$red500"
                      hitSlop={10}
                      onPress={() => onDelete(option?.group_id)}
                    />
                  </HStack>
                )}
              </Pressable>
            ))}
        </ScrollView>
        <Button
          guiButtonProps={{
            height: 50,
            borderRadius: 0,
            width: '100%',
          }}
          buttonText="Create new Group"
          onPress={() => {
            groupCreateSheetRef.current.open();
          }}
        />
      </ActionSheet>
      <CreateGroupSheet ref={groupCreateSheetRef} />
    </Box>
  );
};

export default GroupPicker;
