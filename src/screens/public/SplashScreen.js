import {Box, Image, Text} from '@gluestack-ui/themed';
import Layout from '../../components/common/Layout';

const SplashScreen = () => {
  return (
    <Layout>
      <Box justifyContent="center" alignItems="center" flex={1}>
        <Image
          source={require('../../assets/images/splashlogo.png')}
          alt="logo"
          width={'$1/2'}
          height={120}
        />
      </Box>
    </Layout>
  );
};

export default SplashScreen;
