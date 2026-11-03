// Sample procedures copied from the HTML prototype (Step 1).
// Later this data will come from your backend (Supabase or Firebase).
export const procedures = [
  {
    id: 'proc-1',
    title: 'Peripheral IV Catheter Insertion',
    discipline: 'nursing',
    category: 'clinical',
    duration: '05:45',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    description: 'Standard peripheral venous access procedure focusing on vein selection, aseptic preparation, and catheter insertion.',
    regionNotes: {
      african: 'African protocol emphasizes resource-conscious tourniquet usage, skin sterilization with available povidone-iodine or isopropyl alcohol, and manual vein palpation.',
      european: 'European protocol standardizes single-use closed IV catheters with integrated safety locks and ultrasound guidance for low-visibility veins.'
    },
    steps: [
      'Perform hand hygiene and don clean gloves.',
      'Apply tourniquet 10-15 cm above insertion site and select suitable vein.',
      'Cleanse skin thoroughly in circular motion and allow to dry completely.',
      'Insert catheter bevel-up at a 10-30 degree angle until blood flashback is observed.',
      'Advance catheter cannula, release tourniquet, and secure with transparent sterile dressing.'
    ]
  },
  {
    id: 'proc-2',
    title: 'Tracheostomy Care & Airway Suction',
    discipline: 'nursing',
    category: 'emergency',
    duration: '08:12',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    description: 'Airway maintenance, inner cannula cleaning, and sterile suctioning techniques for tracheostomy patients.',
    regionNotes: {
      african: 'Utilizes sterile open-suction catheters with manual occlusion valves where closed inline suction systems are unavailable.',
      european: 'Mandates closed inline suction systems for mechanically ventilated ICU patients to minimize aerosol contamination.'
    },
    steps: [
      'Assess breath sounds, oxygen saturation, and need for suctioning.',
      'Hyperoxygenate patient with 100% O2 prior to procedure.',
      'Don sterile gloves and maintain sterile hand technique.',
      'Insert suction catheter without applying suction until resistance is felt.',
      'Apply intermittent suction while gently rotating catheter upon withdrawal (<10 secs).'
    ]
  },
  {
    id: 'proc-3',
    title: 'Aseptic Wound Dressing Change',
    discipline: 'nursing',
    category: 'clinical',
    duration: '06:30',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80',
    description: 'Sterile wound assessment, cleansing with normal saline, and application of non-adherent dressing.',
    regionNotes: {
      african: 'Incorporate honey-infused gauze or local topical antimicrobial formulations where synthetic foam dressings are limited.',
      european: 'Utilizes hydrocolloid, silicone foam, or negative-pressure wound therapy systems based on exudate level.'
    },
    steps: [
      'Prepare sterile field and open dressing materials cleanly.',
      'Remove old dressing gently using non-sterile gloves and inspect exudate.',
      'Perform hand hygiene and don sterile gloves.',
      'Cleanse wound bed using normal saline from center outward.',
      'Apply appropriate primary and secondary dressing and secure with tape.'
    ]
  },
  {
    id: 'proc-4',
    title: 'Surgical Hand Scrub & Gloving',
    discipline: 'surgical',
    category: 'surgical',
    duration: '07:20',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
    description: 'Pre-operative surgical hand antisepsis using brush or alcohol-based rub, followed by closed gowning and gloving.',
    regionNotes: {
      african: 'Allows WHO-approved alcohol-based hand rub formulation when clean running scrub water supply is variable.',
      european: 'Requires automated scrub sinks with elbow/sensor taps and regulated chlorhexidine scrub protocols.'
    },
    steps: [
      'Remove jewelry, check nails, and adjust surgical mask and cap.',
      'Pre-wash hands and forearms with non-medicated soap.',
      'Scrub nails, fingers, hands, and forearms up to 2 inches above elbow for 3-5 minutes.',
      'Dry hands with sterile towel using separate ends for each arm.',
      'Perform closed gowning and gloving technique without exposing hands.'
    ]
  },
  {
    id: 'proc-5',
    title: 'Urinary Catheterization (Male & Female)',
    discipline: 'nursing',
    category: 'clinical',
    duration: '09:15',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    description: 'Insertion of Foley indwelling catheter under strict sterile conditions for urinary retention monitoring.',
    regionNotes: {
      african: 'Standard Foley silicone/latex catheters with pre-filled sterile water syringes.',
      european: 'Prefers hydrogel-coated catheter kits with pre-attached temperature sensor probes.'
    },
    steps: [
      'Position patient comfortably and drape with sterile drapes.',
      'Organize sterile tray and lubricate catheter tip generously.',
      'Cleanse urethral meatus thoroughly with antiseptic solution.',
      'Insert catheter smoothly until urine flow is confirmed in tubing.',
      'Inflate balloon with 10ml sterile water and connect drainage bag.'
    ]
  },
  {
    id: 'proc-6',
    title: 'Pediatric Vital Signs & Triage Assessment',
    discipline: 'nursing',
    category: 'pediatric',
    duration: '04:50',
    thumbnail: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80',
    description: 'Systematic pediatric primary assessment including apical heart rate, respiratory rate, oxygen saturation, and temperature.',
    regionNotes: {
      african: 'Emphasizes WHO ETAT (Emergency Triage Assessment and Treatment) guidelines for fast identification of shock and severe dehydration.',
      european: 'Utilizes PEWS (Pediatric Early Warning Score) digital charting integrated with EHR monitors.'
    },
    steps: [
      'Observe infant/child quietly before disturbing for respiratory rate count.',
      'Measure apical pulse for 1 full minute in young children.',
      'Obtain non-invasive blood pressure with appropriate cuff size.',
      'Assess capillary refill time (<2 seconds normal) on central chest/forehead.',
      'Document findings on pediatric triage chart and score alert level.'
    ]
  }
];
