const appInfoSlice = (set, get) => ({
  loading: false,
  error: null,
  app: {
    hasHydrated: false,
    initialLoad: 'LoginScreen',
  },
  setHasHydrated: payload =>
    set(prev => {
      prev.app.hasHydrated = payload;
    }),
  setInitialLoad: payload =>
    set(prev => {
      prev.app.initialLoad = payload;
    }),
  setLoading: payload =>
    set(prev => {
      prev.loading = payload;
    }),
});

export default appInfoSlice;
