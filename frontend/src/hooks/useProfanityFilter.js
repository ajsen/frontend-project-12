import { useContext } from 'react';

import { ProfanityFilterContext } from '../contexts';

const useProfanityFilter = () => useContext(ProfanityFilterContext);

export default useProfanityFilter;
