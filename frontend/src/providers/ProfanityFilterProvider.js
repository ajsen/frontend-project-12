import filter from 'leo-profanity';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ProfanityFilterContext } from '../contexts';
import { selectCurrentLng } from '../slices/selectors';

const ProfanityFilterProvider = ({ children }) => {
  const currentLng = useSelector(selectCurrentLng);

  const currentLngDict = filter.getDictionary(currentLng);
  filter.add(currentLngDict);

  const removeProfanity = useCallback((text) => filter.clean(text), []);

  const values = useMemo(() => ({
    removeProfanity,
  }), [removeProfanity]);

  return (
    <ProfanityFilterContext.Provider value={values}>
      {children}
    </ProfanityFilterContext.Provider>
  );
};

export default ProfanityFilterProvider;
