import React, {useEffect, useMemo, useState} from 'react';
import {HStack, onChange} from '@gluestack-ui/themed';
import {useAquariumFacade} from '../../../store/facades';
import ValueSelector from '../ValueSelector/ValueSelector';

const AquariumSelector = ({style, onSelect, value, addOption = [], label}) => {
  const {aquariums} = useAquariumFacade();
  const [selected, setSelected] = useState(value);
  const [searchValue, setSearchValue] = useState('');
  const [filteredAquariums, setFilteredAquariums] = useState([]);

  const options = useMemo(() => {
    return addOption.concat(
      aquariums.map(aquarium => ({
        name: aquarium.name,
        value: aquarium.id,
      })),
    );
  }, [aquariums, addOption]);

  useEffect(() => {
    if (value?.length === 0 && options[0]) {
      onValueChange(options[0].value);
    }
    if (value !== selected) {
      setSelected(value);
    }
  }, [value]);

  onSearch = value => {
    setSearchValue(value);
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredAquariums(filtered);
  };

  const onValueChange = value => {
    onSelect(value);
  };
  return (
    <HStack>
      <ValueSelector
        isSearchable
        label={label}
        modalTitle={'Select Aquarium'}
        onChange={onValueChange}
        value={selected}
        searchValue={searchValue}
        options={filteredAquariums?.length ? filteredAquariums : options}
        onSearch={onSearch}
        style={
          style || {
            box: {borderWidth: 0, mt: 20, hardShadow: '2'},
            text: {fontWeight: '$bold', ml: 20},
          }
        }
      />
    </HStack>
  );
};
export default React.memo(AquariumSelector);
