export const store = {
  user: {
    data: {},
    userId: '',
    isAuthenticated: false,
    error: '',
    loading: false,
    sessionId: '',
  },
  app: {
    hasHydrated: true,
    initialLoad: 'UserInfoScreen',
  },
  loading: false,
  error: null,
  config: {
    configStatus: {basicConfig: false, parameterConfig: false},
    basicConfig: {country: '', currency: '', unit: 'imperial'},
    parameterConfig: {
      config_name: '',
      params: [],
    },
    avaliableParameterConfig: [],
    parameterConfigList: [],
    loading: false,
    error: null,
  },
  aquariumInfo: {
    aquarium: {
      volume: '',
      type: '',
      name: '',
      purchase_date: '',
      hex_code: '#FFFFFF',
      amount: '',
      param_config_id: '',
    },
    aquariums: [],
    groups: [],
    autoExpencesPreference: 'ASK',
    loading: false,
    error: '',
  },
  expenseInfo: {
    expenses: [],
    loading: false,
    error: '',
  },
  liveStockInfo: {
    liveStocks: [],
    autoExpencesPreference: 'ASK',
    loading: false,
  },
  params: {
    paramsByAquarium: [],
    loading: false,
  },
};
