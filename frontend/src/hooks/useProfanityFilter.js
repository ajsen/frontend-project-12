import { useContext } from 'react';

import { ProfanityFilterContext } from '../providers/ProfanityFilterProvider';

const useProfanityFilter = () => useContext(ProfanityFilterContext);

export default useProfanityFilter;
