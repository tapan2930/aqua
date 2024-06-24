import useStore from './useStore';
import {useShallow} from 'zustand/react/shallow';

export const useUserFacade = () => {
  const {
    loading,
    error,
    user,
    createUser,
    loginUser,
    setIsUserAuthenticated,
    verifyCode,
    updateUser,
  } = useStore(
    useShallow(state => ({
      user: state.user,
      createUser: state.createUser,
      loginUser: state.loginUser,
      setIsUserAuthenticated: state.setIsUserAuthenticated,
      loading: state.user.loading,
      error: state.user.error,
      verifyCode: state.verifyCode,
      updateUser: state.updateUser,
    })),
  );

  return {
    user,
    loading,
    error,
    loginUser,
    createUser,
    setIsUserAuthenticated,
    verifyCode,
    updateUser,
  };
};

export const useConfigFacade = () => {
  const {
    loading,
    error,
    setBasicConfig,
    getBasicConfig,
    basicConfig,
    getConfigStatus,
    config,
    availableParameter,
    getAvaliableParameter,
    setParameterConfig,
    parameterConfig,
    parameterConfigList,
  } = useStore(state => ({
    config: state.config,
    basicConfig: state.config.basicConfig,
    getConfigStatus: state.getConfigStatus,
    setBasicConfig: state.setBasicConfig,
    getBasicConfig: state.getBasicConfig,
    getAvaliableParameter: state.getAvailableParameterConfig,
    availableParameter: state.config.avaliableParameterConfig,
    setParameterConfig: state.setParameterConfig,
    parameterConfigList: state.config.parameterConfigList,
    parameterConfig: state.config.parameterConfig,
    loading: state.config.loading,
    error: state.config.error,
  }));

  return {
    config,
    loading,
    error,
    getConfigStatus,
    setBasicConfig,
    getBasicConfig,
    getAvaliableParameter,
    availableParameter,
    setParameterConfig,
    parameterConfig,
    parameterConfigList,
    basicConfig,
  };
};

export const useAquariumFacade = () => {
  const state = useStore(state => ({
    aquariums: state.aquariumInfo.aquariums,
    loading: state.aquariumInfo.loading,
    error: state.aquariumInfo.error,
    setAqaurium: state.setAqaurium,
    createAqaurium: state.createAqaurium,
    updateAqaurium: state.updateAqaurium,
    deleteAqaurium: state.deleteAqaurium,
    getAquariums: state.getAquariums,
    createGroup: state.createGroup,
    groups: state.aquariumInfo.groups,
    updateGroup: state.updateGroup,
    deleteGroup: state.deleteGroup,
    autoExpencesPreference: state.aquariumInfo?.autoExpencesPreference,
    setAutoExpencesPreference: state.setAutoExpencesPreferenceAQ,
  }));

  return state;
};
export const useExpenseFacade = () => {
  const state = useStore(state => ({
    expenses: state.expenseInfo.expenses,
    loading: state.expenseInfo.loading,
    error: state.expenseInfo.error,
    createExpense: state.createExpense,
    updateExpense: state.updateExpense,
    deleteExpense: state.deleteExpense,
    getExpenses: state.getExpenses,
  }));
  return state;
};

export const useConstantFacade = () => {
  const constants = useStore(state => state.constants);
  return constants;
};

export const useParamFacade = () => {
  const {
    loading,
    error,
    paramsByAquarium,
    createParam,
    updateParam,
    deleteParam,
    getParam,
  } = useStore(state => ({
    paramsByAquarium: state.params.paramsByAquarium,
    loading: state.params.loading,
    error: state.params.error,
    createParam: state.createParam,
    updateParam: state.updateParam,
    deleteParam: state.deleteParam,
    getParam: state.getParam,
  }));

  return {
    paramsByAquarium,
    loading,
    error,
    createParam,
    updateParam,
    deleteParam,
    getParam,
  };
};

export const useLiveStockFacade = () => {
  {
    const state = useStore(state => ({
      liveStocks: state.liveStockInfo.liveStocks,
      loading: state.liveStockInfo.loading,
      error: state.liveStockInfo.error,
      createLiveStock: state.createLiveStock,
      updateLiveStock: state.updateLiveStock,
      deleteLiveStock: state.deleteLiveStock,
      getLiveStock: state.getLiveStock,
      autoExpencesPreference: state.liveStockInfo?.autoExpencesPreference,
      setAutoExpencesPreference: state.setAutoExpencesPreferenceLS,
    }));

    return state;
  }
};
