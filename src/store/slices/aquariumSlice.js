import {
  createAquarium,
  createGroup,
  getAquariums,
  updateAquarium,
  deleteAquarium,
  getGroups,
  deleteGroup,
  updateGroup,
} from '../../apis/Aquarium';
import {createExpense} from '../../apis/Expense';
import showSnackbar from '../../utils/snackbar';
import {store} from '../initalStates';

const AquariumSlice = (set, get) => ({
  aquariumInfo: store.aquariumInfo,
  setAutoExpencesPreferenceAQ: payload => {
    set(prev => {
      prev.aquariumInfo.autoExpencesPreference = payload;
    });
  },
  setAqaurium: payload => {
    set(prev => {
      prev.aquariumInfo.aquarium = payload;
    });
  },
  createAqaurium: async ({payload, isCreateExpense}) => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.aquariumInfo.loading = true;
      prev.aquariumInfo.error = '';
    });

    const data = await createAquarium({...headers, payload: payload});
    if (
      data.status_code === 200 &&
      (get().aquariumInfo?.autoExpencesPreference === 'ALWAYS' ||
        isCreateExpense)
    ) {
      const expensePayload = {
        name: payload.name + ' tank',
        quantity: 1,
        type: 'equipment',
        date: payload.purchase_date,
        user_id: headers.userId,
        total: Number(payload.amount),
        price_per_unit: Number(payload.amount),
        selection_type: 'custom',
        aquarium_id: data.data.id,
      };
      await get().createExpense(expensePayload);

      set(prev => {
        prev.aquariumInfo.aquariums = [
          ...prev.aquariumInfo.aquariums,
          data.data,
        ];
      });
    } else if (data.status_code >= 400) {
      showSnackbar(data.error);
    }
    set(prev => {
      prev.loading = false;
      prev.aquariumInfo.loading = false;
    });
    return data;
  },
  updateAqaurium: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.aquariumInfo.loading = true;
      prev.aquariumInfo.error = '';
    });

    const data = await updateAquarium({...headers, payload: payload});
    console.log(data, 'data');
    if (data.status_code === 200) {
      set(prev => {
        prev.aquariumInfo.aquariums = prev.aquariumInfo.aquariums.map(aq =>
          aq.id === data.data.id ? data.data : aq,
        );
      });
    } else if (data.status_code >= 400) {
      set(prev => {
        prev.aquariumInfo.error = data.error;
      });
    }
    set(prev => {
      prev.loading = false;
      prev.aquariumInfo.loading = false;
    });
    return data;
  },
  deleteAqaurium: async aquariumId => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.aquariumInfo.loading = true;
        prev.aquariumInfo.error = '';
      });

      const data = await deleteAquarium({...headers, aquariumId});
      if (data.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.aquariums = prev.aquariumInfo.aquariums.filter(
            aq => aq.id !== aquariumId,
          );
        });
      } else if (data.status_code >= 400) {
        set(prev => {
          prev.aquariumInfo.error = data.error;
        });
      }
      return data;
    } catch (e) {
      console.log(e);
      return {status_code: 500, error: 'Something went wrong !'};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.aquariumInfo.loading = false;
      });
    }
  },
  getAquariums: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.aquariumInfo.loading = true;
      prev.aquariumInfo.error = '';
    });

    try {
      const response = await getAquariums(headers);
      if (response.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.aquariums =
            response?.data || prev.aquariumInfo.aquariums;
        });
      } else if (response.status_code >= 400) {
        set(prev => {
          prev.config.error = response?.data?.error;
        });
      }
      return response;
    } catch (error) {
      set(prev => {
        prev.aquariumInfo.error = 'Something went wrong !';
      });
    } finally {
      set(prev => {
        prev.loading = false;
        prev.aquariumInfo.loading = false;
      });
    }
  },
  createGroup: async payload => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.aquariumInfo.loading = true;
      });

      const data = await createGroup({...headers, payload: payload});
      if (data.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.groups = [...prev.aquariumInfo.groups, data.data];
        });
      } else if (data.status_code >= 400) {
        showSnackbar(data.error);
      }
      return data;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.aquariumInfo.loading = false;
      });
    }
  },
  getGroups: async () => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      const response = await getGroups(headers);
      if (response.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.groups = response.data || [];
        });
      } else if (response.status_code >= 400) {
        showSnackbar(response.error);
      }
      return response;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500};
    }
  },
  updateGroup: async ({payload, groupId}) => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.aquariumInfo.loading = true;
      });

      const data = await updateGroup({...headers, payload, groupId});
      console.log(data, 'sasdas');
      if (data.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.groups = prev.aquariumInfo.groups.map(group =>
            group.group_id === data.data.group_id ? data.data : group,
          );
        });
      } else if (data.status_code >= 400) {
        showSnackbar(data.error);
      }
      return data;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.aquariumInfo.loading = false;
      });
    }
  },
  deleteGroup: async groupId => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.aquariumInfo.loading = true;
      });

      const data = await deleteGroup({...headers, groupId});
      if (data.status_code === 200) {
        set(prev => {
          prev.aquariumInfo.groups = prev.aquariumInfo.groups.filter(
            group => group.group_id !== groupId,
          );
        });
      } else if (data.status_code >= 400) {
        showSnackbar(data.error);
      }
      return data;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.aquariumInfo.loading = false;
      });
    }
  },
});

export default AquariumSlice;
