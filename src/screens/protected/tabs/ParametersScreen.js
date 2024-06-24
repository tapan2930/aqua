import React, {useEffect, useState} from 'react';
import useStore from '../../../store/useStore';
import Layout from '../../../components/common/Layout';
import {Box, HStack, Icon, Pressable, ScrollView} from '@gluestack-ui/themed';
import {PlusCircle} from 'lucide-react-native';
import AquariumSelector from '../../../components/common/AquariumSelector/AquariumSelector';
import {useAquariumFacade, useParamFacade} from '../../../store/facades';
import CreateAquarium from '../../../components/common/CreateAquarium/CreateAquarium';

export default ParametersScreen = ({navigation}) => {
  const {aquariums} = useAquariumFacade();
  const {getParam, paramsByAquarium} = useParamFacade();
  const [aquariumId, setAquariumId] = useState(aquariums?.[0]?.id);

  useEffect(() => {
    if (aquariumId) {
      getParam({aquariumId});
    }
  }, [aquariumId]);

  console.log(paramsByAquarium);

  return (
    <Layout px={0} showCreateAqaurium={aquariums?.length > 0 ? false : true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AquariumSelector
          value={aquariumId}
          style={{
            box: {mx: 10, borderWidth: 0, mt: 20, hardShadow: '2'},
            text: {fontWeight: '$bold'},
          }}
        />
        {paramsByAquarium?.length > 0 &&
          paramsByAquarium?.map(param => (
            <HStack>
              <Text>{hello}</Text>
            </HStack>
          ))}
      </ScrollView>
      <Box
        bg="$primary0"
        position="absolute"
        bottom={'$10'}
        right={'$3'}
        borderRadius={'$full'}
        hardShadow="2">
        <Pressable
          p={'$3'}
          onPress={() => navigation.navigate('CreateParameterScreen')}>
          <Icon as={PlusCircle} size={30} color="white" />
        </Pressable>
      </Box>
    </Layout>
  );
};
