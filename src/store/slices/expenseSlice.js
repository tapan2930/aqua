import {createExpense, getExpenses} from '../../apis/Expense';
import {store} from '../initalStates';
const ExpenseSlice = (set, get) => ({
  expenseInfo: store.expenseInfo,
  createExpense: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.expenseInfo.loading = true;
      prev.expenseInfo.error = '';
    });

    const data = await createExpense({...headers, payload: payload});
    if (data.status_code === 200) {
      set(prev => {
        prev.expenseInfo.expenses = [...prev.expenseInfo.expenses, data.data];
      });
    } else if (data.status_code >= 400) {
      set(prev => {
        prev.expenseInfo.error = data.error;
      });
    }
    set(prev => {
      prev.loading = false;
      prev.expenseInfo.loading = false;
    });
    return data;
  },
  updateExpense: async payload => {},
  deleteExpense: async payload => {},
  getExpenses: async payload => {
    const headers = {
      sessionId: get().user.sessionId,
      userId: get().user.userId,
    };
    set(prev => {
      prev.loading = true;
      prev.expenseInfo.loading = true;
      prev.expenseInfo.error = '';
    });

    try {
      const response = await getExpenses(headers);
      if (response.status_code === 200) {
        set(prev => {
          prev.expenseInfo.expenses =
            response?.data || prev.expenseInfo.expenses;
        });
      } else if (response.status_code >= 400) {
        set(prev => {
          prev.config.error = response?.data?.error;
        });
      }
      return response;
    } catch (error) {
      console.log('error-----------------------------------------', error);
    } finally {
      set(prev => {
        prev.loading = false;
        prev.expenseInfo.loading = false;
      });
    }
  },
});

export default ExpenseSlice;
