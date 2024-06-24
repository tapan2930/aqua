const constantSlice = (set, get) => ({
  constants: {
    taskType: [
      {value: 'maintenance', name: 'Maintenance'},
      {value: 'feeding', name: 'Feeding'},
    ],
    taskFrequency: [
      {value: 'ONE', name: 'Once'},
      {value: 'REPEAT', name: 'Repeat'},
    ],
    taskRepeat: [
      {value: 'daily', name: 'Daily'},
      {value: 'weekly', name: 'Weekly'},
    ],
    taskWeek: [
      {value: '1', name: '1'},
      {value: '2', name: '2'},
      {value: '3', name: '3'},
      {value: '4', name: '4'},
    ],
    taskDay: [
      {value: 'monday', name: 'M'},
      {value: 'tuesday', name: 'T'},
      {value: 'wednesday', name: 'W'},
      {value: 'thusrday', name: 'T'},
      {value: 'friday', name: 'F'},
      {value: 'saturday', name: 'S'},
      {value: 'sunday', name: 'S'},
    ],
    expenseSelctionType: [
      {value: 'default', name: 'None'},
      {value: 'custom', name: 'Custom'},
    ],
    liveStockStatus: [
      {value: '1', name: 'Alive'},
      {value: '2', name: 'No More'},
    ],
    liveStockCategories: [
      {value: 'plant', name: 'Plant'},
      {value: 'fish', name: 'Fish'},
      {value: 'crustacean', name: 'Crustacean'},
      {value: 'other', name: 'Other'},
    ],
    aquariumType: [
      {value: 'fresh_water', name: 'Fresh'},
      {value: 'salt_water', name: 'Salt'},
      {value: 'brackish_water', name: 'Brackish'},
    ],
    userExpensePreferencesType: [
      {value: 'ASK', name: 'Always ask'},
      {value: 'ALWAYS', name: 'Always create expense'},
      {value: 'NEVER', name: 'Never create expense'},
    ],
  },
});

export default constantSlice;
