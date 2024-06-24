import {
  getBasicConfig,
  getConfigStatus,
  getAvaliableParameter,
  putBasicConfig,
  putParameterConfig,
  getParameters,
} from '../../apis/Config';

const configSlice = (set, get) => ({
  config: {
    configStatus: {basicConfig: false, parameterConfig: false},
    basicConfig: {country: '', currency: '', unit: 'imperial'},
    parameterConfig: {
      config_name: '',
      params: [],
    },
    parameterConfigList: [],
    avaliableParameterConfig: [],
    loading: false,
    error: null,
  },
  getConfigStatus: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    const data = await getConfigStatus(headers);
    if (data.status_code === 200) {
      set(prev => {
        const newConfigStatus = {
          basicConfig: data.basic_config,
          parameterConfig: data.parameter_config,
        };
        prev.config.configStatus = newConfigStatus;
      });
    }
    return data;
  },

  getBasicConfig: async () => {
    const payload = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    const data = await getBasicConfig(payload);
    if (data.status_code === 200) {
      set(prev => {
        prev.config.basicConfig = data;
      });
    }

    return data;
  },

  setBasicConfig: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };

    set(prev => {
      prev.config.loading = true;
      prev.config.error = null;
    });
    const data = await putBasicConfig({...headers, payload});
    if (data.status_code === 200) {
      set(prev => {
        prev.config.basicConfig = payload;
      });
    }

    set(prev => {
      prev.config.loading = false;
    });
    return data.status_code;
  },

  getParametersConfig: async () => {
    // Fetch user created templates from the backend and store it in Local Store
    const payload = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };

    const data = await getParameters(payload);
    console.log('dataaaaa', data);
    if (data.status_code === 200) {
      if (data?.data?.status_code >= 400) {
        set(prev => {
          prev.config.error = data.data.error;
        });
      } else {
        console.log('data----', data);
        set(prev => {
          prev.config.parameterConfigList = data.data;
        });
      }
    }
    return data;
  },

  setParameterConfig: async payload => {
    // Save the parameter config to the backend and Local Store
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };

      set(prev => {
        prev.config.loading = true;
        prev.config.error = null;
      });
      const res = await putParameterConfig({...headers, payload});

      if (res.status_code === 200) {
        set(prev => {
          console.log('resss', prev.config.parameterConfigList);

          prev.config.parameterConfigList = [
            ...prev.config.parameterConfigList,
            {
              config_name: res.data.config_name,
              id: res.data.id,
              deleted_at: res.data.deleted_at,
              params: res.data.params,
            },
          ];
        });
      } else {
        set(prev => {
          prev.config.error = res.error;
        });
      }
      return res.status_code;
    } catch (e) {
      console.log('e', e);
      set(prev => {
        prev.config.error =
          'Error saving parameter config. Please try again later.';
      });
    } finally {
      set(prev => {
        prev.config.loading = false;
      });
    }
  },

  getAvailableParameterConfig: async () => {
    // Fetch the parameter templates from the backend

    const payload = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };

    set(prev => {
      prev.config.error = null;
    });

    try {
      const data = await getAvaliableParameter(payload);
      if (data.status_code === 200) {
        set(prev => {
          prev.config.avaliableParameterConfig = data.data;
        });
      }
      return data;
    } catch (e) {
      set(prev => {
        prev.error =
          'Error fetching available parameters. Please try again later.';
      });
    }
    return {status_code: 500};
  },
});

export default configSlice;
