// Diadikasia procedure categories. Edit titles here and every screen updates.
// "short" is the label used on the filter chips; "title" is the full name.
export const nursingCategories = [
  { key: 'fundamentals', short: 'Fundamentals', title: 'Fundamentals of Nursing Procedures', description: 'Basic nursing skills and foundational clinical practices.' },
  { key: 'medication', short: 'Medication', title: 'Medication Administration Procedures', description: 'Safe medication preparation and administration.' },
  { key: 'iv-therapy', short: 'IV Therapy', title: 'IV Therapy Procedures', description: 'Intravenous access, infusion and related procedures.' },
  { key: 'wound-care', short: 'Wound Care', title: 'Wound Care Procedures', description: 'Wound assessment, dressing and wound management.' },
  { key: 'gastrointestinal', short: 'Gastrointestinal', title: 'Gastrointestinal Nursing Procedures', description: 'Gastrointestinal assessment and nursing interventions.' },
  { key: 'renal-urinary', short: 'Renal & Urinary', title: 'Renal, Urinary & Urological Nursing Procedures', description: 'Urinary assessment, catheterization and related procedures.' },
  { key: 'cardiovascular', short: 'Cardiovascular', title: 'Cardiovascular Nursing Procedures', description: 'Cardiovascular assessment and clinical interventions.' },
  { key: 'emergency-trauma', short: 'Emergency & Trauma', title: 'Emergency & Trauma Nursing Procedures', description: 'Emergency response, resuscitation and trauma care.' },
  { key: 'neuro-sensory', short: 'Neurological', title: 'Neurological & Sensory Nursing Procedures', description: 'Neurological assessment and sensory-system care.' },
  { key: 'musculoskeletal', short: 'Musculoskeletal', title: 'Musculoskeletal & Orthopedic Nursing Procedures', description: 'Musculoskeletal assessment, positioning and orthopedic care.' },
];

// Placeholder until the surgical categories are decided.
export const surgicalCategories = [
  { key: 'surgical-tech', short: 'Surgical Tech', title: 'Surgical Tech', description: '' },
];

export const allCategories = [...nursingCategories, ...surgicalCategories];

export const categoriesFor = (discipline) =>
  discipline === 'nursing' ? nursingCategories : discipline === 'surgical' ? surgicalCategories : allCategories;

export const categoryLabel = (key) => {
  const c = allCategories.find((x) => x.key === key);
  return c ? c.short : key;
};
