import React, {useEffect, useState, useRef, useMemo} from 'react';
import {RefreshControl} from 'react-native';
import Layout from '../../../components/common/Layout';
import {useAquariumFacade} from '../../../store/facades.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Fish, PlusCircle, Pencil, Trash2, Menu} from 'lucide-react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  ScrollView,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import Snackbar from 'react-native-snackbar';
import {themeColors} from '../../../utils/theme.js';
import ActionSheet from '../../../components/common/ActionSheet/ActionSheet.js';
import Alert from '../../../components/common/Alert/Alert.js';
import Fab from '../../../components/common/FAB/Fab.js';

dayjs.extend(relativeTime);
const aquariumTypes = {
  fresh_water: 'Fresh Water',
  salt_water: 'Salt Water',
  brackish_water: 'Brackish Water',
};

const ListAquariumScreen = ({navigation}) => {
  const actionSheetRef = useRef(null);
  const alertRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const {aquariums, getAquariums, deleteAqaurium, loading, groups} =
    useAquariumFacade();

  useEffect(() => {
    getAquariums();
  }, []);

  const aquariumsList = useMemo(() => {
    if (aquariums?.length > 0) {
      const list = [...aquariums].reverse();
      return list;
    }
  }, [aquariums]);

  const groupMemo = useMemo(() => {
    return groups?.reduce((acc, group) => {
      acc[group.group_id] = group.hex_code;
      return acc;
    }, {});
  }, [groups]);

  const onRefresh = () => {
    getAquariums().then(() => {
      Snackbar.show({
        text: 'Aquariums Refreshed Successfully',
        duration: Snackbar.LENGTH_SHORT,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: themeColors.primary400,
        textColor: themeColors.white,
      });
    });
  };

  const handleCardPress = aquarium => {
    setActiveCard(prev => {
      actionSheetRef.current?.open();
      return aquarium;
    });
  };

  const onEdit = aquarium => {
    actionSheetRef.current?.close();
    navigation.navigate('CreateAquariumScreen', {aquarium: aquarium});
  };

  const onDelete = aquarium => {
    actionSheetRef.current?.close();
    alertRef.current?.open();
  };

  const handleDeleteAquarium = () => {
    alertRef.current?.close();
    deleteAqaurium(activeCard.id).then(response => {
      if (response.status_code === 200) {
        Snackbar.show({
          text: 'Aquarium Deleted Successfully',
          duration: Snackbar.LENGTH_SHORT,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: themeColors.primary400,
          textColor: themeColors.white,
        });
      } else {
        Snackbar.show({
          text: response?.data?.error || 'Something went wrong',
          duration: Snackbar.LENGTH_SHORT,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: themeColors.red400,
          textColor: themeColors.white,
        });
      }
    });
  };
  return (
    <Layout showCreateAqaurium={aquariums?.length === 0 ? true : false}>
      <VStack height={'$full'}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          {aquariumsList?.length > 0 &&
            aquariumsList.map(aquarium => (
              <Pressable
                mt={10}
                bgColor="white"
                mb={10}
                borderRadius={'$lg'}
                key={aquarium.id}
                overflow="hidden"
                android_ripple={{color: themeColors.primary100 + '33'}}
                onPress={() => handleCardPress(aquarium)}>
                <HStack alignItems="center">
                  <Box
                    width={5}
                    height={'80%'}
                    bgColor={groupMemo[aquarium?.group_id] || 'blue'}
                    borderTopRightRadius={'$lg'}
                    borderBottomRightRadius={'$lg'}></Box>
                  <Box flex={1} px={'$3'} py={'$4'}>
                    <HStack pb={'$3'} justifyContent="space-between">
                      <HStack alignItems="center">
                        <Text
                          color="$textColor"
                          fontSize={'$lg'}
                          fontWeight="$semibold">
                          {aquarium.name}
                        </Text>
                      </HStack>
                      <Text color="$textColor">
                        <Icon
                          as={Menu}
                          size={20}
                          color={themeColors.textColor}
                        />
                      </Text>
                    </HStack>
                    <HStack justifyContent="space-between" mt={'$1'}>
                      <Text>
                        From: {dayjs.unix(aquarium.purchase_date).fromNow()}
                      </Text>
                      <HStack
                        bg="$primary0"
                        py={2}
                        px={6}
                        borderRadius={'$md'}
                        alignItems="center">
                        <Icon as={Fish} size="sm" color="white" mr={'$1'} />
                        <Text color="white" textAlign="center">
                          {aquariumTypes[aquarium.type]}
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>
              </Pressable>
            ))}
        </ScrollView>
        <Alert
          ref={alertRef}
          onOk={handleDeleteAquarium}
          onCancel={() => alertRef.current.close()}
          label="Delete">
          <HStack justifyContent="center" py={20}>
            <Text textAlign="left">
              Are you sure you want to delete the Aquarium ? Confirm to
              continue.
            </Text>
          </HStack>
        </Alert>
        <Fab
          onPress={() => navigation.navigate('CreateAquariumScreen')}
          icon={PlusCircle}
        />
      </VStack>
      <ActionSheet ref={actionSheetRef} label={activeCard?.name}>
        <Pressable
          onPress={() => {
            onEdit(activeCard);
          }}
          borderBottomWidth={1}
          borderBottomColor="$blueGray300"
          py={'$4'}
          px={10}
          android_ripple={{color: themeColors.primary100 + '33'}}>
          <HStack alignItems="center">
            <Icon as={Pencil} size="xl" color="$primary400" />
            <Text color="$textColor" ml={10}>
              Edit
            </Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {
            onDelete(activeCard);
          }}
          borderBottomWidth={1}
          borderBottomColor="$blueGray300"
          py={'$4'}
          px={10}
          android_ripple={{color: themeColors.primary100 + '33'}}>
          <HStack alignItems="center">
            <Icon as={Trash2} size="xl" color="$primary400" />
            <Text color="$textColor" ml={10}>
              Delete
            </Text>
          </HStack>
        </Pressable>
      </ActionSheet>
    </Layout>
  );
};

export default ListAquariumScreen;
