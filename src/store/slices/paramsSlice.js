import {postParams, getParams} from '../../apis/Params';
import showSnackbar from '../../utils/snackbar';
import {store} from '../initalStates';

const ParamsSlice = (set, get) => ({
  params: store.params,
  createParam: async (aquariumId, payload) => {
    try {
      const headers = {
        sessionId: get().user.sessionId,
        userId: get().user.userId,
      };
      set(prev => {
        prev.loading = true;
        prev.params.loading = true;
      });

      const data = await postParams({...headers, aquariumId, payload});
      if (data.status_code >= 400) {
        showSnackbar(data.error);
      }
      return data;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500, error: error};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.params.loading = false;
      });
    }
  },
  updateParam: async payload => {},
  deleteParam: async payload => {},
  getParam: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.expenseInfo.loading = true;
    });

    try {
      const response = await getParams({...headers, ...payload});
      console.log(response, 'sfsfsdf');
      if (response.status_code === 200) {
        set(prev => {
          prev.expenseInfo.expenses =
            response?.data || prev.expenseInfo.expenses;
        });
      } else if (response.status_code >= 400) {
        showSnackbar(response?.data?.error);
      }
      return response;
    } catch (error) {
      showSnackbar('Something went wrong !');
      return {status_code: 500, error: error};
    } finally {
      set(prev => {
        prev.loading = false;
        prev.expenseInfo.loading = false;
      });
    }
  },
});

export default ParamsSlice;
