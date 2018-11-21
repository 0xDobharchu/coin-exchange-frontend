const APPROVED = 'approved';
const PENDING = 'pending';
const LEVEL = {
  L1: 'level_1',
  L2: 'level_2',
  L3: 'level_3',
  L4: 'level_4',
};
const { L1, L2, L3, L4 } = LEVEL;

export const DOC_TYPES = [
  {
    label: 'Passport',
    value: 'passport',
  }, 
  {
    label: 'Driver License',
    value: 'driver_license'
  },
  {
    label: 'Government ID Card',
    value: 'id_card'
  },
];

export const getCurrentLevel = (level, status) => {
  switch(level) {
    case L1: return status === APPROVED ? 1 : 0;
    case L2: return status === APPROVED ? 2 : 1;
    case L3: return status === APPROVED ? 3 : 2;
    case L4: return status === APPROVED ? 4 : 3;
    default: return 0;
  }
};

export const getReachingLevel = (level, status) => {
  const statuss = [ PENDING, APPROVED ];
  switch(level) {
    case L1: return statuss.indexOf(status) >= 0 ? 1 : 0;
    case L2: return statuss.indexOf(status) >= 0 ? 2 : 1;
    case L3: return statuss.indexOf(status) >= 0 ? 3 : 2;
    case L4: return statuss.indexOf(status) >= 0 ? 4 : 3;
    default: return 0;
  }
};

const getLevelNumber = (level) => {
  switch(level) {
    case L1: return 1;
    case L2: return 2;
    case L3: return 3;
    case L4: return 4;
    default: return 0;
  }
};

export const getStatusByLevel = (specficLevel, level, status) => {
  const levelNumber = getLevelNumber(level);
  if (specficLevel > levelNumber) return '';
  if (specficLevel < levelNumber) return 'VERIFIED';
  if (specficLevel === levelNumber) {
    if (status === APPROVED) return 'VERIFIED';
    return status.toUpperCase();
  }
};
export const getColorByLevel = (specficLevel, level, status) => {
  const levelNumber = getLevelNumber(level);
  if (specficLevel > levelNumber) return 'danger';
  if (specficLevel < levelNumber) return 'success';
  if (specficLevel === levelNumber) {
    if (status === APPROVED) return 'success';
    return 'warning';
  }
};