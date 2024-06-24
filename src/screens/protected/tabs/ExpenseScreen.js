import React, {useState, useMemo, useEffect} from 'react';
import Layout from '../../../components/common/Layout';
import {
  Box,
  Icon,
  VStack,
  Pressable,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed';
import {PlusCircle} from 'lucide-react-native';
import ExpenseList from '../../../components/expenses/ExpenseList';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector';
import DateRangeSelector from '../../../components/common/DateRangeSelector/DateRangeSelector';
import dayjs from 'dayjs';
import Linechart from '../../../components/common/LineChart/Linechart';
import CategoryChart from '../../../components/common/LineChart/CategoryChart';
import Fab from '../../../components/common/FAB/Fab.js';
import {useAquariumFacade} from '../../../store/facades.js';

export default ExpenseScreen = ({navigation}) => {
  const {aquariums} = useAquariumFacade();
  const [dateInterval, setDateInterval] = useState({
    from: dayjs().subtract(1, 'month').toDate(),
    to: new Date(),
  });

  const [aquariumId, setAquariumId] = useState('');

  const lineChartData = useMemo(() => {
    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
      ],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Expense in $'], // optional
    };
  }, [aquariumId, dateInterval]);

  const CategoryChartData = useMemo(() => {
    return [
      {
        color: '#5570c7',
        name: 'Live Stock',
        expense: 400,
        difference: '+25%',
        data: [60, 25, 28, 80, 99, 43],
      },
      {
        color: '#299e8e',
        name: 'Equipment',
        expense: 400,
        difference: '-65%',
        data: [20, 45, 80, 21, 99, 43],
      },
      {
        color: '#d46180',
        name: 'Suppliments',
        expense: 400,
        difference: '-10%',
        data: [70, 95, 68, 80, 99, 13],
      },
      {
        color: '#d9b169',
        name: 'Miscellaneous',
        expense: 400,
        difference: '-15%',
        data: [20, 45, 28, 80, 99, 43],
      },
    ];
  }, [aquariumId, dateInterval]);

  const handleDateChange = newInterval => {
    setDateInterval(newInterval);
  };

  return (
    <Layout px={0} showCreateAqaurium={aquariums?.length === 0 ? true : false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AquariumSelector
          value={aquariumId}
          onSelect={setAquariumId}
          style={{
            box: {mx: 10, borderWidth: 0, mt: 20, hardShadow: '2'},
            text: {fontWeight: '$bold'},
          }}
        />

        <VStack px={10} flex={1}>
          <VStack>
            <Heading>Summary:</Heading>
            <DateRangeSelector
              toDate={dateInterval.to}
              fromDate={dateInterval.from}
              handleDateIntervalChange={handleDateChange}
            />
          </VStack>
        </VStack>

        <VStack px={10} flex={1}>
          <Heading>Total:</Heading>
          <Linechart data={lineChartData} />
        </VStack>

        <VStack px={10} flex={1} mb={'$6'}>
          <CategoryChart data={CategoryChartData} />
        </VStack>

        <VStack px={10} flex={1}>
          <Heading>Expenses:</Heading>
          <ExpenseList aquariumId={aquariumId} navigation={navigation} />
        </VStack>
      </ScrollView>
      <Fab
        icon={PlusCircle}
        onPress={() => navigation.navigate('CreateExpenseScreen')}
      />
    </Layout>
  );
};
