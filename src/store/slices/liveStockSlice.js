import {
  createLiveStock,
  deleteLiveStock,
  getLiveStock,
  updateLiveStock,
} from '../../apis/liveStock';
import showSnackbar from '../../utils/snackbar';
import {store} from '../initalStates';

const LiveStockSlice = (set, get) => ({
  liveStockInfo: store.liveStockInfo,
  setAutoExpencesPreferenceLS: payload => {
    set(prev => {
      prev.liveStockInfo.autoExpencesPreference = payload;
    });
  },
  createLiveStock: async ({payload, isCreateExpense}) => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.liveStockInfo.loading = true;
      });

      const data = await createLiveStock({...headers, payload: payload});
      if (data.status_code === 200) {
        set(prev => {
          prev.liveStockInfo.liveStocks = [
            ...prev.liveStockInfo.liveStocks,
            data.data,
          ];
        });
        if (
          get().liveStockInfo?.autoExpencesPreference === 'ALWAYS' ||
          isCreateExpense
        ) {
          const expensePayload = {
            name: payload.name + ' (ls)',
            quantity: 1,
            type: 'live_stock',
            date: payload.acquired_on,
            user_id: headers.userId,
            total: Number(payload.price),
            price_per_unit: Number(payload.price),
            selection_type: 'custom',
            aquarium_id: payload.aquarium_id,
          };
          await get().createExpense(expensePayload);
        }
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
        prev.liveStockInfo.loading = false;
      });
    }
  },

  updateLiveStock: async ({payload, liveStockId}) => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.liveStockInfo.loading = true;
      });

      const data = await updateLiveStock({
        ...headers,
        payload: payload,
        liveStockId: liveStockId,
      });
      if (data.status_code === 200) {
        set(prev => {
          prev.liveStockInfo.liveStocks = prev.liveStockInfo.liveStocks.map(
            liveStock => {
              if (liveStock.id === liveStockId) {
                return data.data;
              }
              return liveStock;
            },
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
        prev.liveStockInfo.loading = false;
      });
    }
  },
  deleteLiveStock: async payload => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.liveStockInfo.loading = true;
      });

      const data = await deleteLiveStock({...headers, ...payload});
      if (data.status_code === 200) {
        set(prev => {
          prev.liveStockInfo.liveStocks = prev.liveStockInfo.liveStocks.filter(
            liveStock => liveStock.id !== payload.liveStockId,
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
        prev.liveStockInfo.loading = false;
      });
    }
  },
  getLiveStock: async payload => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.liveStockInfo.loading = true;
      });

      const response = await getLiveStock({...headers, ...payload});
      if (response.status_code === 200) {
        const liveStocks = response?.data?.filter(
          liveStock => liveStock?.deleted_at === null,
        );
        set(prev => {
          prev.liveStockInfo.liveStocks =
            liveStocks || prev.liveStockInfo.liveStocks;
        });
      } else if (response.status_code >= 400) {
        showSnackbar(response?.data?.error);
      }
      return response;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.liveStockInfo.loading = false;
      });
    }
  },
});

export default LiveStockSlice;
