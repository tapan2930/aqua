import Snackbar from 'react-native-snackbar';
import {themeColors} from './theme';

const showSnackbar = (message, duration = Snackbar.LENGTH_SHORT, props) => {
  if (typeof message === 'string') {
    Snackbar.show({
      text: message,
      duration: duration,
      backgroundColor: themeColors.primary0,
      textColor: themeColors.white,
      ...props,
    });
  } else {
    Snackbar.show({
      text: 'Something went wrong !',
      duration: duration,
      backgroundColor: themeColors.primary0,
      textColor: themeColors.white,
      ...props,
    });
  }
};

export default showSnackbar;
