import showSnackbar from '../../utils/snackbar';
import {
  createUser,
  getUserbyId,
  loginUser,
  sentVerificationCode,
  VerifyCode,
  updateUserData,
} from '../../apis/User';
import {store} from '../initalStates';

const userSlice = (set, get) => ({
  user: {
    data: {},
    userId: '',
    isAuthenticated: false,
    error: '',
    loading: false,
    sessionId: '',
  },
  setUserData: payload =>
    set(prev => {
      prev.user.data = payload;
    }),

  setIsUserAuthenticated: payload =>
    set(prev => {
      prev.user.isAuthenticated = payload;
    }),

  verifyCode: async payload => {
    set(prev => {
      prev.loading = true;
      prev.user.loading = true;
    });

    const data = await VerifyCode(payload);

    set(prev => {
      prev.loading = false;
      prev.user.loading = false;
    });

    if (data.status_code === undefined) {
      // Set user Data
      return 200;
    } else if (data.status_code === 400) {
      showSnackbar(data.error);
      return data.status_code;
    }
  },

  fetchUser: async () => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    const data = await getUserbyId(headers);

    if (data.status_code === 200) {
      // Set user Data
      set(prev => {
        prev.user.data = data.data;
      });
    } else if (data.status_code === 400) {
      showSnackbar(data.error);
    }
    return data;
  },

  loginUser: async payload => {
    set(prev => {
      prev.loading = true;
      prev.user.loading = true;
      prev.user.error = '';
    });
    const data = await loginUser(payload);
    if (data.status_code === 200 && data.user_id) {
      // Set user Data
      set(prev => {
        prev.user.userId = data.user_id;
        prev.user.sessionId = data.session_id;
      });
      const [fetchUserRes, getBasicConfigRes, getParametersConfigRes] =
        await Promise.all([
          get().fetchUser(),
          get().getBasicConfig(),
          get().getParametersConfig(),
          get().getAvailableParameterConfig(),
          get().getAquariums(),
          get().getExpenses(),
          get().getGroups(),
        ]);
      if (fetchUserRes.status_code === 200) {
        if (fetchUserRes.data.full_name === 'Aquarium-Manager') {
          set(prev => {
            prev.app.initialLoad = 'UserInfoScreen';
          });
        } else if (getBasicConfigRes.status_code >= 400) {
          console.log('fetchUserRes', getBasicConfigRes);

          set(prev => {
            prev.app.initialLoad = 'GlobalConfigScreen';
          });
        } else if (
          getParametersConfigRes.status_code === 200 &&
          getParametersConfigRes?.data?.length === 0
        ) {
          set(prev => {
            prev.app.initialLoad = 'ParameterConfigScreen';
          });
        } else {
          set(prev => {
            prev.app.initialLoad = 'TabNavigator';
          });
        }
        set(prev => {
          prev.user.isAuthenticated = true;
        });
      }
    } else if (data.status_code >= 400) {
      if (data.status_code === 401) {
        await sentVerificationCode({
          email: payload.email,
        });
      }
      showSnackbar(data.error);
    }
    set(prev => {
      prev.loading = false;
      prev.user.loading = false;
    });
    return data.status_code;
  },
  createUser: async payload => {
    set(prev => {
      prev.loading = true;
      prev.user.loading = true;
    });

    const data = await createUser(payload);

    if (data.status_code === 200) {
      await sentVerificationCode({
        email: payload.email,
      });
    } else if (data.status_code === 409) {
      console.log(data, 'data');
      showSnackbar(data.data.error);
    }

    set(prev => {
      prev.loading = false;
      prev.user.loading = false;
    });
    return data.status_code;
  },
  checkUserSession: async () => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
    });
    const data = await getUserbyId(headers);

    if (data.status_code >= 400) {
      set(currentState => (currentState = store));
      showSnackbar('Session Expired, Please login again');
    }
    set(prev => {
      prev.loading = false;
    });
  },
  logoutUser: () => {
    set(currentState => (currentState = store));
    showSnackbar("You've been logged out successfully");
  },

  updateUser: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };

    set(prev => {
      prev.loading = true;
      prev.user.loading = true;
    });
    const data = await updateUserData({...headers, payload: payload});
    if (data.status_code === 200) {
      // Set user Data
      set(prev => {
        prev.user.data = data;
      });
    } else if (data.status_code >= 400) {
      showSnackbar(data.error);
    }
    set(prev => {
      prev.loading = false;
      prev.user.loading = false;
    });

    return data.status_code;
  },
});

export default userSlice;
