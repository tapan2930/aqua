import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Box, VStack, HStack, Text, Pressable} from '@gluestack-ui/themed';
import Input from '../common/input/Input';
import Button from '../common/Button/Button';
import {FlatList} from 'react-native';
import ActionSheet from '../common/ActionSheet/ActionSheet';
import {useAquariumFacade} from '../../store/facades';
import {themeColors} from '../../utils/theme';

const CreateGroupSheet = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const actionSheetRef = useRef(null);
  const {createGroup, updateGroup, loading} = useAquariumFacade();
  const [groupId, setGroupId] = useState(null);
  const [selectedColor, setSelectedColor] = useState({
    group_name: '',
    hex_code: '',
  });

  useImperativeHandle(
    ref,
    () => ({
      open: group => {
        actionSheetRef.current?.open();
        if (group) {
          console.log('group', group);
          setSelectedColor({
            group_name: group?.group_name,
            hex_code: group?.hex_code,
          });
          setGroupId(group?.group_id);
        }
      },
      close: () => actionSheetRef.current?.close(),
    }),
    [],
  );
  const onSelect = option => value => {
    setSelectedColor({...selectedColor, [option]: value});
  };

  const colorOptions = [
    {name: 'Red', value: '#F43F5E'},
    {name: 'Blue', value: '#3B82F6'},
    {name: 'Green', value: '#22C55E'},
    {name: 'Yellow', value: '#FDE047'},
    {name: 'Orange', value: '#F97316'},
    {name: 'Black', value: '#0A0A0A'},
    {name: 'Purple', value: '#A855F7'},
    {name: 'Pink', value: '#EC4899'},
    {name: 'Brown', value: '#78716C'},
  ];

  onCreateGroup = () => {
    if (!selectedColor?.group_name || !selectedColor?.hex_code) return;
    if (groupId) {
      // update group
      updateGroup({groupId, payload: selectedColor}).then(res => {
        if (res?.status_code === 200) {
          ref.current?.close();
        }
      });
    } else {
      createGroup(selectedColor).then(res => {
        if (res?.status_code === 200) {
          ref.current?.close();
        }
      });
    }
  };

  const onModalShow = () => {
    inputRef.current?.focus();
  };
  return (
    <ActionSheet
      onModalShow={onModalShow}
      ref={actionSheetRef}
      label="Create Group">
      <VStack mx={10} mt={20}>
        <Input
          ref={inputRef}
          onChangeText={onSelect('group_name')}
          value={selectedColor?.group_name}
          placeholder="Enter group name"
          mb={10}
        />
        <Text mb={10}>Select Color:</Text>
        <HStack flexWrap="wrap" justifyContent="space-between">
          {colorOptions && colorOptions?.length > 0 && (
            <FlatList
              numColumns={5}
              data={colorOptions}
              renderItem={({item}) => (
                <Pressable
                  android_ripple={{color: themeColors.primary100 + '33'}}
                  key={item?.value}
                  onPress={() => {
                    onSelect('hex_code')(item?.value);
                  }}
                  px={3}
                  py={3}
                  mt={3}
                  mr={12}
                  borderRadius={'$full'}
                  borderColor={
                    selectedColor?.hex_code === item?.value
                      ? '$blue500'
                      : 'transparent'
                  }
                  borderWidth={2}>
                  <Box
                    height={'$12'}
                    width={'$12'}
                    borderRadius={'$full'}
                    bgColor={item?.value || 'white'}></Box>
                </Pressable>
              )}
              keyExtractor={(item, index) => item.value}
            />
          )}
        </HStack>
      </VStack>
      <Button
        disabled={loading}
        showLoading={loading}
        onPress={onCreateGroup}
        guiButtonProps={{marginTop: 'auto', mx: 10, mt: 20, mb: 20}}
        buttonText={groupId ? 'Update Group' : 'Create Group'}
      />
    </ActionSheet>
  );
});
export default CreateGroupSheet;
