import React, {useEffect, useState, useRef, useMemo} from 'react';
import {RefreshControl} from 'react-native';
import Layout from '../../../components/common/Layout';
import {useAquariumFacade, useLiveStockFacade} from '../../../store/facades.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Fish,
  PlusCircle,
  Pencil,
  Trash2,
  ChevronDown,
  Menu,
  Sprout,
} from 'lucide-react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  ScrollView,
  Icon,
  Pressable,
  Heading,
} from '@gluestack-ui/themed';
import Snackbar from 'react-native-snackbar';
import {themeColors} from '../../../utils/theme.js';
import ActionSheet from '../../../components/common/ActionSheet/ActionSheet.js';
import Alert from '../../../components/common/Alert/Alert.js';
import Fab from '../../../components/common/FAB/Fab.js';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector.js';
import LiveStockCategories from '../../../components/liveStock/LiveStockCategories.js';
import showSnackbar from '../../../utils/snackbar.js';

dayjs.extend(relativeTime);

const ListLiveStockScreen = ({navigation, route}) => {
  const {aquariums, getAquariums} = useAquariumFacade();
  const [aquariumId, setAquariumId] = useState(aquariums[0]?.id || '');
  const actionSheetRef = useRef(null);
  const alertRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const {liveStocks, getLiveStock, error, loading, deleteLiveStock} =
    useLiveStockFacade();

  useEffect(() => {
    getAquariums();
    if (aquariums?.length > 0) {
      getLiveStock({aquariumId: aquariumId || aquariums[0]?.id});
    }
  }, [aquariumId]);

  const liveStocksList = useMemo(() => {
    if (liveStocks?.length > 0) {
      const list = [...liveStocks].reverse();
      return list;
    }
  }, [liveStocks]);

  const onRefresh = () => {
    getLiveStock({aquariumId: aquariumId || aquariums[0]?.id}).then(() => {
      showSnackbar('Live Stocks Refreshed Successfully');
    });
  };

  const handleCardPress = liveStock => {
    setActiveCard(prev => {
      actionSheetRef.current?.open();
      return liveStock;
    });
  };

  const onEdit = liveStock => {
    actionSheetRef.current?.close();
    navigation.navigate('CreateLiveStockScreen', {liveStock: liveStock});
  };

  const onDelete = () => {
    actionSheetRef.current?.close();
    alertRef.current?.open();
  };

  const handleDeleteAquarium = () => {
    alertRef.current?.close();
    deleteLiveStock({liveStockId: activeCard.id}).then(response => {
      if (response.status_code === 200) {
        showSnackbar('Live Stock Deleted Successfully');
      } else {
        showSnackbar(response?.data?.error || 'Something went wrong');
      }
    });
  };

  const categoryData = {
    plant: {color: '#73cf16', icon: Sprout},
    fish: {color: '#ff4646', icon: Fish},
    crustacean: {color: '#4b73ff', icon: Fish},
    other: {color: '#48deff', icon: Menu},
  };

  return (
    <Layout px={0} showCreateAqaurium={aquariums?.length === 0 ? true : false}>
      <VStack height={'$full'}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          <AquariumSelector
            style={{
              box: {mx: 10, borderWidth: 0, mt: 20, hardShadow: '2'},
              text: {fontWeight: '$bold'},
            }}
            value={aquariumId}
            onSelect={setAquariumId}
          />

          <VStack px={10} mb={'$6'}>
            <Heading>Summary:</Heading>
            <LiveStockCategories liveStocks={liveStocks} />
          </VStack>

          <VStack px={10} mb={'$6'}>
            {liveStocksList?.length > 0 && <Heading>Stocks:</Heading>}
            {liveStocksList?.length > 0 &&
              liveStocksList.map(liveStock => (
                <Pressable
                  mt={10}
                  bgColor="white"
                  mb={10}
                  borderRadius={'$lg'}
                  key={liveStock.id}
                  overflow="hidden"
                  android_ripple={{color: themeColors.primary100 + '33'}}
                  onPress={() => handleCardPress(liveStock)}>
                  <HStack alignItems="center">
                    <Box
                      bgColor={categoryData[liveStock?.livestock_type]?.color}
                      width={65}
                      height={65}
                      justifyContent="center"
                      borderRadius={'$lg'}
                      alignItems="center">
                      <Icon
                        as={categoryData[liveStock?.livestock_type]?.icon}
                        size={28}
                        color={themeColors.white}
                      />
                    </Box>
                    <VStack justifyContent="space-between" flex={1}>
                      <HStack
                        px={10}
                        justifyContent="space-between"
                        alignItems="center">
                        <Text fontWeight="$semibold">{liveStock?.name}</Text>
                        <Icon
                          as={ChevronDown}
                          size={20}
                          color={themeColors.primary0}
                        />
                      </HStack>
                      <HStack px={10} justifyContent="space-between">
                        <Text>
                          {liveStock?.status === 1 ? 'Alive' : 'Not Alive'}
                        </Text>
                        <Text>
                          {dayjs
                            .unix(liveStock?.acquired_on)
                            .format('MM-DD-YYYY')}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
          </VStack>
        </ScrollView>
        <Alert
          ref={alertRef}
          onOk={handleDeleteAquarium}
          onCancel={() => alertRef.current.close()}
          label="Delete">
          <HStack justifyContent="center" py={20}>
            <Text textAlign="left">
              Are you sure you want to delete the Live Stock ? Confirm to
              continue.
            </Text>
          </HStack>
        </Alert>
        <Fab
          onPress={() => navigation.navigate('CreateLiveStockScreen')}
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

export default ListLiveStockScreen;
