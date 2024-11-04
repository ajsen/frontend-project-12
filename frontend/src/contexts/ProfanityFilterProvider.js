import filter from 'leo-profanity';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLng } from '../slices/userUiSlice';

const ProfanityFilterContext = createContext();

export const useProfanityFilter = () => useContext(ProfanityFilterContext);

const ProfanityFilterProvider = ({ children }) => {
  const currentLng = useSelector(selectCurrentLng);

  filter.loadDictionary(currentLng);

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
