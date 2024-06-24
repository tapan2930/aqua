import React, {useMemo} from 'react';
import {
  ScrollView,
  VStack,
  HStack,
  Text,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import {useExpenseFacade} from '../../store/facades';
import {Pencil, Trash2, ToggleRight, ChevronDown} from 'lucide-react-native';
import ExpenseSVG from '../../assets/images/ExpenseSVG';
import dayjs from 'dayjs';
import ActionSheet from '../common/ActionSheet/ActionSheet';
import {themeColors} from '../../utils/theme';

const ExpenseList = ({navigation, aquariumId}) => {
  console.log('aquariumId', aquariumId);
  const {expenses} = useExpenseFacade();
  const [activeCard, setActiveCard] = React.useState(null);

  const expenseList = useMemo(() => {
    if (!!aquariumId?.length) {
      return expenses?.filter(expense => expense?.aquarium_id === aquariumId);
    }
  }, [aquariumId]);

  const actionSheetRef = React.useRef(null);
  const handleCardPress = expense => {
    setActiveCard(prev => {
      actionSheetRef.current?.open();
      return expense;
    });
  };

  const onEdit = expense => {
    actionSheetRef.current?.close();
    navigation.navigate('CreateExpenseScreen', {expense: expense});
  };
  return (
    <VStack>
      {expenses &&
        expenseList?.length > 0 &&
        expenseList.map(expense => (
          <HStack
            key={expense?.id}
            mb={10}
            bg="white"
            py={'$2'}
            px={'$2'}
            borderRadius={'$lg'}
            alignItems="center">
            <Pressable flex={1} onPress={() => handleCardPress(expense)}>
              <HStack alignItems="center">
                <ExpenseSVG />
                <HStack alignItems="center">
                  <Text fontWeight="$semibold" ml={'$2'}>
                    {expense?.name}
                  </Text>
                  <Icon
                    as={ChevronDown}
                    size={20}
                    color={themeColors.primary0}
                  />
                </HStack>
                <VStack ml={'auto'}>
                  <Text ml={'auto'} fontWeight="$semibold">
                    ${expense?.total}
                  </Text>
                  <Text>{dayjs.unix(expense?.date).format('MM-DD-YYYY')}</Text>
                </VStack>
              </HStack>
              <HStack></HStack>
            </Pressable>
          </HStack>
        ))}

      <ActionSheet ref={actionSheetRef} label={activeCard?.name}>
        <Pressable
          onPress={() => {
            onEdit(activeCard);
          }}
          borderBottomWidth={1}
          borderBottomColor="$blueGray300"
          py={'$4'}
          px={10}
          android_ripple={{color: '#00000033'}}>
          <HStack alignItems="center">
            <Icon as={Pencil} size="xl" color="$primary400" />
            <Text color="$textColor" ml={10}>
              Edit
            </Text>
          </HStack>
        </Pressable>
        <Pressable
          borderBottomWidth={1}
          borderBottomColor="$blueGray300"
          py={'$4'}
          px={10}
          android_ripple={{color: '#00000033'}}>
          <HStack alignItems="center">
            <Icon as={Trash2} size="xl" color="$primary400" />
            <Text color="$textColor" ml={10}>
              Delete
            </Text>
          </HStack>
        </Pressable>
      </ActionSheet>
    </VStack>
  );
};
export default ExpenseList;
