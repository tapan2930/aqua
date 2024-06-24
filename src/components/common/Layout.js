import {Box} from '@gluestack-ui/themed';
import NoTouchFull from './NoTouchFull';
import useStore from '../../store/useStore';
import {useEffect} from 'react';
import {themeColors} from '../../utils/theme';
import CreateAquarium from './CreateAquarium/CreateAquarium';

const Layout = ({children, showCreateAqaurium = false, ...props}) => {
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: themeColors.primary400,
        textColor: themeColors.white,
      });
    }
  }, [error]);
  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <Box position="relative" px={10} flex={1} bg="$background" {...props}>
        {loading && <NoTouchFull />}
        {showCreateAqaurium ? <CreateAquarium /> : children}
      </Box>
      {/* </SafeAreaView> */}
    </>
  );
};
export default Layout;
