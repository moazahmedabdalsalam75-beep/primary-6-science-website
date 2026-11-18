export interface GiveReasonQuestion {
  id: string;
  type: 'gr';
  question: string;
  answer: string;
}

export interface WhatHappensQuestion {
  id: string;
  type: 'whi';
  question: string;
  answer: string;
}

export interface ChooseQuestion {
  id: string;
  type: 'choose';
  question: string;
  options: { key: 'a' | 'b' | 'c' | 'd'; label: string }[];
  correctKey: 'a' | 'b' | 'c' | 'd';
}

export interface ScientificTermQuestion {
  id: string;
  type: 'term';
  question: string;
  answer: string;
  acceptedAnswers: string[];
}

export type ExamQuestion =
  | GiveReasonQuestion
  | WhatHappensQuestion
  | ChooseQuestion
  | ScientificTermQuestion;

export type MicroscopeSpecimenId =
  | 'respiratory-alveoli'
  | 'digestive-villi'
  | 'organs-heart-kidneys'
  | 'leaf-stomata'
  | 'plant-water-path';

export type ExperimentId =
  | 'burning-air'
  | 'burning-gases'
  | 'limewater-test'
  | 'breathing-stages'
  | 'saliva-starch'
  | 'sunlight-starch'
  | 'plant-gas-exchange'
  | 'transpiration-bag'
  | 'colored-water-path';

export interface LessonNoteBlock {
  label: string;
  items: string[];
}

export interface ActivityBlock {
  title: string;
  materials?: string[];
  steps: string[];
  explanation?: string;
  conclusion: string;
}

export interface LessonData {
  id: string;
  lessonNumber: number;
  title: string;
  summary: string;
  definitions: { term: string; text: string }[];
  keyFacts: LessonNoteBlock[];
  activity?: ActivityBlock;
  letsExpand?: { title: string; description: string }[];
  microscopeSpecimenId?: MicroscopeSpecimenId;
  experimentId?: ExperimentId;
  exam: ExamQuestion[];
}

export interface ChapterData {
  id: string;
  chapterNumber: number;
  title: string;
  monthLabel: string;
  accentColor: 'amber' | 'sky' | 'emerald' | 'rose' | 'teal' | 'indigo';
  lessons: LessonData[];
}

export const CURRICULUM_CHAPTERS: ChapterData[] = [
  {
    id: 'chapter-1',
    chapterNumber: 1,
    title: 'Conditions For Burning',
    monthLabel: 'October Curriculum',
    accentColor: 'amber',
    lessons: [
      {
        id: 'ch1-l1',
        lessonNumber: 1,
        title: 'How Things Burn and Air',
        summary: 'Combustion (Burning) and the role of fresh air renewal in keeping a flame burning.',
        definitions: [
          {
            term: 'Combustion (Burning)',
            text: 'Combustion (Burning) is a reaction (combination) that occurs between oxygen and a substance that produces heat and light.',
          },
        ],
        keyFacts: [
          {
            label: 'Role of Air in Combustion',
            items: [
              'Closed jar: air inside is used up, and once it runs out, the candle goes out.',
              'Open jar (top and bottom): air is constantly renewed from outside, allowing the candle to continue burning.',
              'Fresh air must constantly flow in and out for things to continue burning.',
            ],
          },
        ],
        activity: {
          title: 'The role of air in burning things',
          materials: ['Wooden board', 'Clay', 'Candle', 'Bottomless glass jar', 'Metal lid', 'Lighter'],
          steps: [
            'Fix candle on clay, cover with bottomless jar (top open).',
            'Close jar with metal lid: Flame weakens and goes out.',
            'Leave a small gap at bottom: Flame goes out after longer time.',
            'Leave a gap at top and bottom: Flame continues to burn.',
          ],
          explanation:
            'Closed jar: air inside is used up, once it runs out, candle goes out. Open jar (top and bottom): air is constantly renewed from outside, allowing candle to continue burning.',
          conclusion:
            'Air has a role in burning. Fresh air must constantly flow in and out for things to continue burning.',
        },
        experimentId: 'burning-air',
        exam: [
          {
            id: 'ch1-l1-q1',
            type: 'gr',
            question: 'A burning candle goes out when covered completely with a metal lid.',
            answer: 'Because the air inside is used up and not renewed.',
          },
          {
            id: 'ch1-l1-q2',
            type: 'gr',
            question: 'A candle continues to burn if there are gaps at both the top and bottom of the jar.',
            answer: 'Because fresh air constantly flows in and out, renewing the air.',
          },
          {
            id: 'ch1-l1-q3',
            type: 'gr',
            question: 'Air is considered a primary condition for combustion.',
            answer: 'Because oxygen in the air reacts with burning substances to produce heat and light.',
          },
          {
            id: 'ch1-l1-q4',
            type: 'whi',
            question: 'You cover a burning candle with a tightly closed glass jar.',
            answer: 'The flame gradually weakens and goes out.',
          },
          {
            id: 'ch1-l1-q5',
            type: 'whi',
            question: 'You leave a small gap at the bottom of the jar covering a burning candle.',
            answer: 'The candle flame goes out after a slightly longer time.',
          },
          {
            id: 'ch1-l1-q6',
            type: 'whi',
            question: 'Fresh air is prevented from renewing around a burning object.',
            answer: 'The object cannot continue burning and the fire goes out.',
          },
          {
            id: 'ch1-l1-q7',
            type: 'choose',
            question: 'The process of combining oxygen with a substance producing heat and light is called',
            options: [
              { key: 'a', label: 'Melting' },
              { key: 'b', label: 'Combustion' },
              { key: 'c', label: 'Freezing' },
              { key: 'd', label: 'Evaporation' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch1-l1-q8',
            type: 'choose',
            question: 'When a jar covering a candle has both top and bottom openings, the candle flame',
            options: [
              { key: 'a', label: 'Goes out immediately' },
              { key: 'b', label: 'Continues to burn' },
              { key: 'c', label: 'Explodes' },
              { key: 'd', label: 'Changes color' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch1-l1-q9',
            type: 'term',
            question: 'A reaction that occurs between oxygen and a substance producing heat and light.',
            answer: 'Combustion / Burning',
            acceptedAnswers: ['combustion', 'burning', 'combustion / burning', 'combustion (burning)'],
          },
          {
            id: 'ch1-l1-q10',
            type: 'term',
            question: 'The condition where fresh air constantly flows in and out to keep things burning.',
            answer: 'Air renewal',
            acceptedAnswers: ['air renewal', 'renewal of air'],
          },
        ],
      },
      {
        id: 'ch1-l2',
        lessonNumber: 2,
        title: 'The Role of Oxygen',
        summary: 'Composition of atmospheric air and how oxygen, nitrogen, and carbon dioxide affect burning.',
        definitions: [],
        keyFacts: [
          {
            label: 'Atmospheric Air Composition',
            items: [
              'Oxygen gas: 21% (helps in continuation of burning).',
              'Nitrogen gas: 78% (does not help in burning).',
              'Carbon dioxide gas: 0.04% (does not help in burning), and other gases.',
            ],
          },
        ],
        activity: {
          title: 'Effect of different gases on burning',
          steps: [
            'Oxygen jar: Flame becomes stronger, brighter, and goes out after a long period of time.',
            'Nitrogen jar: Flame gradually weakens and goes out.',
            'Carbon dioxide jar: Flame goes out quickly.',
          ],
          conclusion: 'Oxygen helps things in burning. Nitrogen and carbon dioxide do not help things in burning.',
        },
        letsExpand: [
          {
            title: 'Gas Detector Tube',
            description: 'Changes color when reacting with a specific gas to measure its amount/percentage.',
          },
          {
            title: 'Gas Monitor',
            description: 'Uses a sensor to show percentage on a screen in digital numbers.',
          },
        ],
        experimentId: 'burning-gases',
        exam: [
          {
            id: 'ch1-l2-q1',
            type: 'gr',
            question: 'Oxygen gas has a major role in the continuation of fire.',
            answer: 'Because its percentage is about 21% and it helps in continuation of burning.',
          },
          {
            id: 'ch1-l2-q2',
            type: 'gr',
            question: 'A candle flame goes out quickly inside a jar containing carbon dioxide.',
            answer: 'Because carbon dioxide does not help in burning.',
          },
          {
            id: 'ch1-l2-q3',
            type: 'gr',
            question: 'Nitrogen gas does not support combustion.',
            answer: 'Because it does not help in burning, even though it makes up 78% of atmospheric air.',
          },
          {
            id: 'ch1-l2-q4',
            type: 'whi',
            question: 'You quickly insert a burning candle into a jar filled with oxygen gas.',
            answer: 'The burning of the candle flame increases, becomes stronger and brighter, and goes out after a long period of time.',
          },
          {
            id: 'ch1-l2-q5',
            type: 'whi',
            question: 'You place a burning candle inside a jar filled with carbon dioxide gas.',
            answer: 'The candle flame goes out quickly.',
          },
          {
            id: 'ch1-l2-q6',
            type: 'whi',
            question: 'Oxygen runs out in a closed container during combustion.',
            answer: 'The flame cannot continue and goes out.',
          },
          {
            id: 'ch1-l2-q7',
            type: 'choose',
            question: 'The percentage of oxygen gas in the atmosphere is about',
            options: [
              { key: 'a', label: '78%' },
              { key: 'b', label: '21%' },
              { key: 'c', label: '0.04%' },
              { key: 'd', label: '50%' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch1-l2-q8',
            type: 'choose',
            question: 'Which gas makes up about 78% of atmospheric air?',
            options: [
              { key: 'a', label: 'Oxygen' },
              { key: 'b', label: 'Carbon dioxide' },
              { key: 'c', label: 'Nitrogen' },
              { key: 'd', label: 'Hydrogen' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch1-l2-q9',
            type: 'term',
            question: 'A gas that makes up about 21% of air and helps in the continuation of burning.',
            answer: 'Oxygen gas',
            acceptedAnswers: ['oxygen', 'oxygen gas'],
          },
          {
            id: 'ch1-l2-q10',
            type: 'term',
            question: 'A device that uses a sensor to show the percentage of a gas on a screen in digital numbers.',
            answer: 'Gas Monitor',
            acceptedAnswers: ['gas monitor'],
          },
        ],
      },
      {
        id: 'ch1-l3',
        lessonNumber: 3,
        title: 'Air After Burning',
        summary: 'How oxygen decreases and carbon dioxide increases after burning, detected using clear limewater.',
        definitions: [
          {
            term: 'Limewater',
            text: 'Limewater is a colorless clear liquid that turns milky white when it reacts with carbon dioxide gas.',
          },
        ],
        keyFacts: [
          {
            label: 'Changes in Air After Burning',
            items: [
              'After things burn, oxygen decreases, while carbon dioxide increases.',
              'Limewater is a colorless clear liquid that turns milky white when it reacts with carbon dioxide gas.',
            ],
          },
        ],
        activity: {
          title: 'Detecting carbon dioxide after burning',
          steps: [
            'Insert lit candle into jar (1) until flame goes out.',
            'Shake limewater in jar (1): limewater becomes milky white.',
            'Jar (2) control (no burning inside): limewater remains clear.',
          ],
          conclusion:
            'Burning produces carbon dioxide gas and its percentage increases in the air surrounding the burning object, turning limewater milky white.',
        },
        experimentId: 'limewater-test',
        exam: [
          {
            id: 'ch1-l3-q1',
            type: 'gr',
            question: 'Clear limewater turns milky white when shaken inside a jar where a candle has burned out.',
            answer: 'Because burning produces carbon dioxide gas which reacts with limewater to turn it milky.',
          },
          {
            id: 'ch1-l3-q2',
            type: 'gr',
            question: 'Oxygen amount decreases after a combustion process occurs in a closed jar.',
            answer: 'Because oxygen is consumed/used up during the burning process.',
          },
          {
            id: 'ch1-l3-q3',
            type: 'gr',
            question: 'Safety goggles are important when handling limewater during chemistry tests.',
            answer: 'To protect the eyes from limewater splashes.',
          },
          {
            id: 'ch1-l3-q4',
            type: 'whi',
            question: 'You add clear limewater to a jar containing a high concentration of carbon dioxide produced by burning.',
            answer: 'The clear limewater becomes milky white.',
          },
          {
            id: 'ch1-l3-q5',
            type: 'whi',
            question: 'A candle burns completely inside a sealed glass container for a long time.',
            answer: 'Oxygen decreases, carbon dioxide increases, and the limewater test turns milky.',
          },
          {
            id: 'ch1-l3-q6',
            type: 'whi',
            question: 'You shake clear limewater in a control jar that had no burning inside.',
            answer: 'The limewater remains clear as it is without change.',
          },
          {
            id: 'ch1-l3-q7',
            type: 'choose',
            question: 'Clear limewater turns milky white in the presence of',
            options: [
              { key: 'a', label: 'Oxygen' },
              { key: 'b', label: 'Nitrogen' },
              { key: 'c', label: 'Carbon dioxide' },
              { key: 'd', label: 'Water vapor' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch1-l3-q8',
            type: 'choose',
            question: 'During combustion, the amount of oxygen in a closed container',
            options: [
              { key: 'a', label: 'Increases' },
              { key: 'b', label: 'Decreases' },
              { key: 'c', label: 'Remains constant' },
              { key: 'd', label: 'Doubles' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch1-l3-q9',
            type: 'term',
            question: 'A colorless clear liquid that turns milky white when it reacts with carbon dioxide gas.',
            answer: 'Limewater',
            acceptedAnswers: ['limewater', 'lime water'],
          },
          {
            id: 'ch1-l3-q10',
            type: 'term',
            question: 'The process that consumes oxygen and produces carbon dioxide and heat.',
            answer: 'Combustion / Burning',
            acceptedAnswers: ['combustion', 'burning', 'combustion / burning'],
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-2',
    chapterNumber: 2,
    title: 'Respiration',
    monthLabel: 'October Curriculum',
    accentColor: 'sky',
    lessons: [
      {
        id: 'ch2-l1',
        lessonNumber: 1,
        title: 'How Breathing Works',
        summary: 'Breathing (Respiration) definition and the stages of inhalation and exhalation.',
        definitions: [
          {
            term: 'Breathing (Respiration)',
            text: 'Breathing (Respiration) is the process by which the body takes in oxygen and lets out (gets rid of) carbon dioxide.',
          },
        ],
        keyFacts: [
          {
            label: 'Stages of Breathing',
            items: [
              '1. Inhalation (Breathing in): Air containing oxygen enters the body. Chest moves up. Inhaled air contains a large amount of oxygen and a small amount of carbon dioxide.',
              '2. Exhalation (Breathing out): Air containing carbon dioxide leaves the body. Chest moves down. Exhaled air contains a large amount of carbon dioxide and a small amount of oxygen.',
            ],
          },
        ],
        experimentId: 'breathing-stages',
        exam: [
          {
            id: 'ch2-l1-q1',
            type: 'gr',
            question: 'The human chest moves up during the inhalation process.',
            answer: 'Because air containing oxygen enters the body and expands the chest cavity.',
          },
          {
            id: 'ch2-l1-q2',
            type: 'gr',
            question: 'Exhaled air contains a large amount of carbon dioxide.',
            answer: 'Because the body gets rid of waste carbon dioxide produced by cells.',
          },
          {
            id: 'ch2-l1-q3',
            type: 'gr',
            question: 'Breathing is essential for human life.',
            answer: 'Because it supplies the body with needed oxygen and expels carbon dioxide.',
          },
          {
            id: 'ch2-l1-q4',
            type: 'whi',
            question: 'You breathe in (inhale) deeply.',
            answer: 'Your chest moves up and oxygen-rich air enters your body.',
          },
          {
            id: 'ch2-l1-q5',
            type: 'whi',
            question: 'You breathe out (exhale).',
            answer: 'Your chest moves down and air rich in carbon dioxide leaves your body.',
          },
          {
            id: 'ch2-l1-q6',
            type: 'whi',
            question: 'Living organisms are deprived of breathing air.',
            answer: 'They cannot get oxygen and cannot survive.',
          },
          {
            id: 'ch2-l1-q7',
            type: 'choose',
            question: 'During inhalation, the chest moves',
            options: [
              { key: 'a', label: 'Down' },
              { key: 'b', label: 'Up' },
              { key: 'c', label: 'Backward' },
              { key: 'd', label: 'Sideways' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch2-l1-q8',
            type: 'choose',
            question: 'Inhaled air contains a large amount of',
            options: [
              { key: 'a', label: 'Carbon dioxide' },
              { key: 'b', label: 'Nitrogen' },
              { key: 'c', label: 'Oxygen' },
              { key: 'd', label: 'Smoke' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch2-l1-q9',
            type: 'term',
            question: 'The process by which the body takes in oxygen and lets out carbon dioxide.',
            answer: 'Breathing / Respiration',
            acceptedAnswers: ['breathing', 'respiration', 'breathing / respiration'],
          },
          {
            id: 'ch2-l1-q10',
            type: 'term',
            question: 'The breathing stage where air containing carbon dioxide leaves the body and the chest moves down.',
            answer: 'Exhalation / Breathing out',
            acceptedAnswers: ['exhalation', 'breathing out', 'exhalation / breathing out'],
          },
        ],
      },
      {
        id: 'ch2-l2',
        lessonNumber: 2,
        title: 'How Lungs Work',
        summary: 'Path of air through the respiratory system, gas exchange in alveoli, and respiration in other organisms.',
        definitions: [],
        keyFacts: [
          {
            label: 'Respiratory System Path',
            items: [
              'Nose (first organ; air enters the body through the nose or mouth).',
              'Windpipe (Trachea) (allows air to pass to left and right lungs).',
              'Lungs (contain Alveoli / air sacs where gas exchange takes place).',
            ],
          },
          {
            label: 'Gas Exchange & Other Organisms',
            items: [
              'Gas exchange: Oxygen in air moves into blood; Carbon dioxide in blood moves into air.',
              'Fish depend on gills to absorb dissolved oxygen in water.',
              'Cats breathe air using lungs.',
            ],
          },
        ],
        microscopeSpecimenId: 'respiratory-alveoli',
        exam: [
          {
            id: 'ch2-l2-q1',
            type: 'gr',
            question: 'Alveoli are considered the main site of gas exchange in the body.',
            answer: 'Because they contain tiny air sacs where oxygen passes into the blood and carbon dioxide passes out.',
          },
          {
            id: 'ch2-l2-q2',
            type: 'gr',
            question: 'Fish can breathe underwater easily.',
            answer: 'Because they depend on gills to absorb oxygen dissolved in water.',
          },
          {
            id: 'ch2-l2-q3',
            type: 'gr',
            question: 'Air can enter the body through the mouth as well as the nose.',
            answer: 'Because the mouth is an alternative pathway to the respiratory system.',
          },
          {
            id: 'ch2-l2-q4',
            type: 'whi',
            question: 'Oxygen reaches the alveoli inside the lungs.',
            answer: 'Gas exchange occurs and oxygen moves into the surrounding blood vessels.',
          },
          {
            id: 'ch2-l2-q5',
            type: 'whi',
            question: 'A fish is taken completely out of water into dry air.',
            answer: 'Its gills cannot absorb oxygen from air and it cannot breathe.',
          },
          {
            id: 'ch2-l2-q6',
            type: 'whi',
            question: 'Dust enters the nose.',
            answer: 'The nose filters and traps it before air reaches the lungs.',
          },
          {
            id: 'ch2-l2-q7',
            type: 'choose',
            question: 'The first organ of the air path in the human body is the',
            options: [
              { key: 'a', label: 'Lung' },
              { key: 'b', label: 'Heart' },
              { key: 'c', label: 'Nose' },
              { key: 'd', label: 'Stomach' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch2-l2-q8',
            type: 'choose',
            question: 'Fish breathe in water using',
            options: [
              { key: 'a', label: 'Lungs' },
              { key: 'b', label: 'Gills' },
              { key: 'c', label: 'Skin' },
              { key: 'd', label: 'Heart' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch2-l2-q9',
            type: 'term',
            question: 'The tiny air sacs inside the lungs where gas exchange takes place.',
            answer: 'Alveoli',
            acceptedAnswers: ['alveoli', 'air sacs'],
          },
          {
            id: 'ch2-l2-q10',
            type: 'term',
            question: 'The tube that allows air to pass from the throat to the left and right lungs.',
            answer: 'Windpipe / Trachea',
            acceptedAnswers: ['windpipe', 'trachea', 'windpipe / trachea'],
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-3',
    chapterNumber: 3,
    title: 'Digestion',
    monthLabel: 'October Curriculum',
    accentColor: 'emerald',
    lessons: [
      {
        id: 'ch3-l1',
        lessonNumber: 1,
        title: 'Where Food Goes',
        summary: 'Digestion definition and the organs of the digestive tract from mouth to anus.',
        definitions: [
          {
            term: 'Digestion',
            text: 'Digestion is the process of breaking down food and changing it into a form that is easy to absorb.',
          },
          {
            term: 'Digestive tract',
            text: 'The path of food inside the human body, starting from the mouth to the anus.',
          },
        ],
        keyFacts: [
          {
            label: 'Organs of the Digestive Tract',
            items: [
              '1. Mouth: contains teeth (cut and grind food) and saliva (digests starch into sugar, giving a sweet taste when chewing bread slowly).',
              '2. Pharynx (Throat).',
              '3. Food pipe (Esophagus).',
              '4. Stomach: secretes digestive juice onto food.',
              '5. Small intestine: absorbs nutrients.',
              '6. Large intestine: absorbs more water from undigested food, coming out as feces through the anus.',
            ],
          },
        ],
        microscopeSpecimenId: 'digestive-villi',
        exam: [
          {
            id: 'ch3-l1-q1',
            type: 'gr',
            question: 'You may notice a sweet taste when chewing a piece of bread slowly.',
            answer: 'Because saliva changes some of the starch in food into sugar.',
          },
          {
            id: 'ch3-l1-q2',
            type: 'gr',
            question: 'The human body needs a digestive system.',
            answer: 'To break down complex food into simple substances that can be easily absorbed.',
          },
          {
            id: 'ch3-l1-q3',
            type: 'gr',
            question: 'Digestion starts in the mouth.',
            answer: 'Because teeth grind food and saliva begins digesting starch.',
          },
          {
            id: 'ch3-l1-q4',
            type: 'whi',
            question: 'Food passes through the stomach and small intestine.',
            answer: 'Digestive juices break it down further and nutrients are absorbed into the blood.',
          },
          {
            id: 'ch3-l1-q5',
            type: 'whi',
            question: 'Undigested food reaches the large intestine.',
            answer: 'More water is absorbed from it, and waste leaves the body as feces through the anus.',
          },
          {
            id: 'ch3-l1-q6',
            type: 'whi',
            question: 'Saliva mixes with starchy food in the mouth.',
            answer: 'Chemical digestion of starch begins, turning it into simpler sugar.',
          },
          {
            id: 'ch3-l1-q7',
            type: 'choose',
            question: 'The path of food inside the human body starting from the mouth to the anus is called',
            options: [
              { key: 'a', label: 'Respiratory system' },
              { key: 'b', label: 'Digestive tract' },
              { key: 'c', label: 'Circulatory system' },
              { key: 'd', label: 'Urinary system' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch3-l1-q8',
            type: 'choose',
            question: 'Which organ absorbs most of the nutrients from digested food?',
            options: [
              { key: 'a', label: 'Stomach' },
              { key: 'b', label: 'Mouth' },
              { key: 'c', label: 'Small intestine' },
              { key: 'd', label: 'Esophagus' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch3-l1-q9',
            type: 'term',
            question: 'The process of breaking down food into simple substances that can be easily absorbed.',
            answer: 'Digestion',
            acceptedAnswers: ['digestion'],
          },
          {
            id: 'ch3-l1-q10',
            type: 'term',
            question: 'A muscular tube that carries food from the pharynx to the stomach.',
            answer: 'Food pipe / Esophagus',
            acceptedAnswers: ['food pipe', 'esophagus', 'food pipe / esophagus'],
          },
        ],
      },
      {
        id: 'ch3-l2',
        lessonNumber: 2,
        title: 'The Function of Saliva',
        summary: 'How saliva digests starch into sugar, tested with iodine solution at 40 degrees Celsius.',
        definitions: [
          {
            term: 'Saliva',
            text: 'Saliva is a digestive juice that digests starch and changes it into sugar.',
          },
          {
            term: 'Iodine solution',
            text: 'Iodine solution detects starch by turning blue-black.',
          },
        ],
        keyFacts: [
          {
            label: 'Detecting Starch with Iodine',
            items: [
              'Iodine solution detects starch (turns blue-black).',
              'Saliva digests starch and changes it into sugar.',
            ],
          },
        ],
        activity: {
          title: 'Saliva changes starch',
          steps: [
            'Prepare two warmed test tubes (40 degrees Celsius) with dilute starch solution.',
            'Tube 1: Add cotton swab soaked with saliva -> starch disappears and changes into sugar (iodine color does not change to blue-black because starch digested).',
            'Tube 2: Add starch + water -> starch remains, iodine turns blue-black.',
          ],
          conclusion: 'Saliva is a digestive juice that digests starch and changes it into sugar.',
        },
        experimentId: 'saliva-starch',
        exam: [
          {
            id: 'ch3-l2-q1',
            type: 'gr',
            question: 'Iodine solution changes color to blue-black when added to pure starch.',
            answer: 'Because iodine is a chemical reagent used to detect starch.',
          },
          {
            id: 'ch3-l2-q2',
            type: 'gr',
            question: 'Iodine solution does not change to blue-black in the test tube mixed with saliva after a few minutes.',
            answer: 'Because saliva digested the starch and turned it into sugar.',
          },
          {
            id: 'ch3-l2-q3',
            type: 'gr',
            question: 'Test tubes in the saliva activity are placed in warm water at 40 degrees Celsius.',
            answer: 'To make the temperature the same as inside the human body.',
          },
          {
            id: 'ch3-l2-q4',
            type: 'whi',
            question: 'Iodine solution is added to a solution where saliva has completely digested the starch.',
            answer: 'The color of the iodine solution does not change / stays brown.',
          },
          {
            id: 'ch3-l2-q5',
            type: 'whi',
            question: 'You test starch mixed only with water using iodine solution.',
            answer: 'The iodine solution turns blue-black because starch is still present.',
          },
          {
            id: 'ch3-l2-q6',
            type: 'whi',
            question: 'Saliva acts on starch for a sufficient time at body temperature.',
            answer: 'Starch is broken down and changed into sugar.',
          },
          {
            id: 'ch3-l2-q7',
            type: 'choose',
            question: 'Iodine solution is used to detect the presence of',
            options: [
              { key: 'a', label: 'Water' },
              { key: 'b', label: 'Starch' },
              { key: 'c', label: 'Oxygen' },
              { key: 'd', label: 'Salt' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch3-l2-q8',
            type: 'choose',
            question: 'When iodine reacts with starch, its color changes to',
            options: [
              { key: 'a', label: 'Red' },
              { key: 'b', label: 'Green' },
              { key: 'c', label: 'Blue-black' },
              { key: 'd', label: 'Yellow' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch3-l2-q9',
            type: 'term',
            question: 'A liquid chemical substance used to check and detect the presence of starch by turning blue-black.',
            answer: 'Iodine solution',
            acceptedAnswers: ['iodine', 'iodine solution'],
          },
          {
            id: 'ch3-l2-q10',
            type: 'term',
            question: 'A digestive juice secreted in the mouth that digests starch and changes it into sugar.',
            answer: 'Saliva',
            acceptedAnswers: ['saliva'],
          },
        ],
      },
      {
        id: 'ch3-l3',
        lessonNumber: 3,
        title: 'How Absorption Works',
        summary: 'Role of villi in the small intestine, transport to the liver, and water absorption in the large intestine.',
        definitions: [
          {
            term: 'Villi',
            text: 'Very small bumps on the inner wall of the small intestine that increase the surface area for nutrient absorption.',
          },
        ],
        keyFacts: [
          {
            label: 'Absorption and Nutrient Transport',
            items: [
              'Villi contain blood capillaries that carry absorbed nutrients to the liver and then to all body parts.',
              'The liver stores some nutrients.',
              'Large intestine absorbs more water from undigested food, eliminating waste as feces through the anus.',
            ],
          },
        ],
        microscopeSpecimenId: 'digestive-villi',
        exam: [
          {
            id: 'ch3-l3-q1',
            type: 'gr',
            question: 'The small intestine contains villi on its inner wall.',
            answer: 'To increase the surface area to absorb nutrients efficiently.',
          },
          {
            id: 'ch3-l3-q2',
            type: 'gr',
            question: 'Absorbed nutrients are carried by blood from the villi to the liver before body parts.',
            answer: 'Because the liver stores some nutrients and handles blood processing.',
          },
          {
            id: 'ch3-l3-q3',
            type: 'gr',
            question: 'The large intestine is important for the digestive system.',
            answer: 'Because it absorbs water from undigested food and removes waste as feces.',
          },
          {
            id: 'ch3-l3-q4',
            type: 'whi',
            question: 'Nutrients pass through the villi in the small intestine.',
            answer: 'They are absorbed into the blood vessels and carried to the rest of the body.',
          },
          {
            id: 'ch3-l3-q5',
            type: 'whi',
            question: 'Undigested food reaches the large intestine.',
            answer: 'More water is absorbed from it, and waste leaves through the anus.',
          },
          {
            id: 'ch3-l3-q6',
            type: 'whi',
            question: 'Villi were absent in the small intestine.',
            answer: 'Nutrient absorption surface area would be very small and inefficient.',
          },
          {
            id: 'ch3-l3-q7',
            type: 'choose',
            question: 'The main organ where digested food is absorbed is the',
            options: [
              { key: 'a', label: 'Stomach' },
              { key: 'b', label: 'Small intestine' },
              { key: 'c', label: 'Mouth' },
              { key: 'd', label: 'Large intestine' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch3-l3-q8',
            type: 'choose',
            question: 'Tiny structures that cover the inner wall of the small intestine are called',
            options: [
              { key: 'a', label: 'Alveoli' },
              { key: 'b', label: 'Villi' },
              { key: 'c', label: 'Gills' },
              { key: 'd', label: 'Kidneys' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch3-l3-q9',
            type: 'term',
            question: 'Very small bumps on the inner wall of the small intestine that absorb nutrients.',
            answer: 'Villi',
            acceptedAnswers: ['villi'],
          },
          {
            id: 'ch3-l3-q10',
            type: 'term',
            question: 'The organ that absorbs more water from undigested food and forms feces.',
            answer: 'Large intestine',
            acceptedAnswers: ['large intestine'],
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-4',
    chapterNumber: 4,
    title: 'Blood Circulation and Excretion',
    monthLabel: 'November Curriculum',
    accentColor: 'rose',
    lessons: [
      {
        id: 'ch4-l1',
        lessonNumber: 1,
        title: 'Heart and Blood',
        summary: 'How the heart pumps blood, pulse points, blood circulation, and oxygen vs carbon dioxide blood.',
        definitions: [
          {
            term: 'Blood circulation',
            text: 'The continuous movement of blood through a network of blood vessels spread throughout the body.',
          },
        ],
        keyFacts: [
          {
            label: 'Heart, Pulse, and Blood Vessels',
            items: [
              'Heart works like a pump, sending blood to all parts of the body through blood vessels and then receiving it again.',
              'Heartbeat travels through blood vessels and can be felt as a pulse at certain points (wrist, neck, ankle).',
              'Heart beats faster during effort/exercise because it pumps blood faster to provide more oxygen and nutrients for energy.',
              'Red = blood rich in oxygen; Blue = blood rich in carbon dioxide.',
            ],
          },
        ],
        microscopeSpecimenId: 'organs-heart-kidneys',
        exam: [
          {
            id: 'ch4-l1-q1',
            type: 'gr',
            question: 'The human heart beats faster during effort or exercise.',
            answer: 'Because the heart pumps blood faster to provide the body with more oxygen and nutrients needed to produce energy.',
          },
          {
            id: 'ch4-l1-q2',
            type: 'gr',
            question: 'A pulse can be felt at the wrist or neck.',
            answer: 'Because the continuous pumping movement of the heart creates a heartbeat felt through blood vessels.',
          },
          {
            id: 'ch4-l1-q3',
            type: 'gr',
            question: 'Blood is pumped through a large network of blood vessels.',
            answer: 'To deliver oxygen and nutrients to all body parts.',
          },
          {
            id: 'ch4-l1-q4',
            type: 'whi',
            question: 'You run or jump lightly for a minute.',
            answer: 'Your heart beats faster and your pulse rate increases.',
          },
          {
            id: 'ch4-l1-q5',
            type: 'whi',
            question: 'The heart stops pumping blood through blood vessels.',
            answer: 'Body organs do not receive oxygen and nutrients, stopping life functions.',
          },
          {
            id: 'ch4-l1-q6',
            type: 'whi',
            question: 'Blood rich in carbon dioxide reaches the lungs.',
            answer: 'Carbon dioxide is let out and oxygen is taken in.',
          },
          {
            id: 'ch4-l1-q7',
            type: 'choose',
            question: 'The continuous movement of blood through a network of blood vessels in the body is called',
            options: [
              { key: 'a', label: 'Digestion' },
              { key: 'b', label: 'Blood circulation' },
              { key: 'c', label: 'Respiration' },
              { key: 'd', label: 'Excretion' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l1-q8',
            type: 'choose',
            question: 'An organ that works like a pump sending blood to all parts of the body is the',
            options: [
              { key: 'a', label: 'Kidney' },
              { key: 'b', label: 'Heart' },
              { key: 'c', label: 'Lung' },
              { key: 'd', label: 'Stomach' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l1-q9',
            type: 'term',
            question: 'The continuous movement of the heart as it pumps blood.',
            answer: 'Heartbeat',
            acceptedAnswers: ['heartbeat', 'heart beat'],
          },
          {
            id: 'ch4-l1-q10',
            type: 'term',
            question: 'The system responsible for pumping and circulating blood throughout the body.',
            answer: 'Circulatory system',
            acceptedAnswers: ['circulatory system'],
          },
        ],
      },
      {
        id: 'ch4-l2',
        lessonNumber: 2,
        title: 'How the Kidneys Work',
        summary: 'Excretion, urine formation by the kidneys, ureters, and urinary bladder.',
        definitions: [
          {
            term: 'Excretion',
            text: 'Eliminating unnecessary waste products produced after the body benefits from oxygen and nutrients.',
          },
          {
            term: 'Urine',
            text: 'A liquid containing waste products and extra water produced when kidneys filter the blood.',
          },
        ],
        keyFacts: [
          {
            label: 'The Urinary System',
            items: [
              'Filters blood, removing waste products and excess water forming urine.',
              'Urine passes through ureters to the urinary bladder where it is temporarily stored until discharged.',
            ],
          },
        ],
        microscopeSpecimenId: 'organs-heart-kidneys',
        exam: [
          {
            id: 'ch4-l2-q1',
            type: 'gr',
            question: 'The urinary system is vital for the human body.',
            answer: 'Because it filters blood to remove harmful waste products and excess water, forming urine.',
          },
          {
            id: 'ch4-l2-q2',
            type: 'gr',
            question: 'Urine is temporarily stored in the urinary bladder.',
            answer: 'Until it is discharged from the body through the urinary tube.',
          },
          {
            id: 'ch4-l2-q3',
            type: 'gr',
            question: 'Waste products like extra water and toxins must be eliminated from the body.',
            answer: 'Because keeping them causes harm and disease.',
          },
          {
            id: 'ch4-l2-q4',
            type: 'whi',
            question: 'Blood passes through the two kidneys.',
            answer: 'Kidneys filter the blood, removing waste products and extra water.',
          },
          {
            id: 'ch4-l2-q5',
            type: 'whi',
            question: 'Ureters are blocked.',
            answer: 'Urine cannot pass from the kidneys to the urinary bladder.',
          },
          {
            id: 'ch4-l2-q6',
            type: 'whi',
            question: 'Harmful waste products accumulate in the blood without excretion.',
            answer: 'The body gets poisoned and organs fail.',
          },
          {
            id: 'ch4-l2-q7',
            type: 'choose',
            question: 'A liquid containing waste products and extra water produced when kidneys filter blood is',
            options: [
              { key: 'a', label: 'Saliva' },
              { key: 'b', label: 'Urine' },
              { key: 'c', label: 'Sweat' },
              { key: 'd', label: 'Water' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l2-q8',
            type: 'choose',
            question: 'The organs responsible for filtering blood and removing waste products as urine are',
            options: [
              { key: 'a', label: 'Lungs' },
              { key: 'b', label: 'Kidneys' },
              { key: 'c', label: 'Heart' },
              { key: 'd', label: 'Stomach' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l2-q9',
            type: 'term',
            question: 'The process of eliminating unnecessary waste products from the body.',
            answer: 'Excretion',
            acceptedAnswers: ['excretion'],
          },
          {
            id: 'ch4-l2-q10',
            type: 'term',
            question: 'Tubes where urine passes from the kidneys to the urinary bladder.',
            answer: 'Ureters',
            acceptedAnswers: ['ureters', 'ureter'],
          },
        ],
      },
      {
        id: 'ch4-l3',
        lessonNumber: 3,
        title: 'Various Organs',
        summary: 'Arrangement and integration of organs inside the chest cavity, abdomen, and lower back.',
        definitions: [],
        keyFacts: [
          {
            label: 'Organs Arrangement and Integration',
            items: [
              'Organs are arranged close together inside body cavities because they work together to perform functions.',
              'Chest cavity: Right and left lungs, and heart between them, protected by ribs.',
              'Abdomen: Stomach (upper abdomen, below heart/lungs), Small intestine (below stomach), Large intestine (surrounds small intestine).',
              'Back: Two kidneys (lower back, one on each backbone side).',
              'Connected by blood vessels.',
            ],
          },
        ],
        microscopeSpecimenId: 'organs-heart-kidneys',
        exam: [
          {
            id: 'ch4-l3-q1',
            type: 'gr',
            question: 'Body organs are connected to one another by blood vessels.',
            answer: 'Because blood carries oxygen and nutrients to organs and removes waste products.',
          },
          {
            id: 'ch4-l3-q2',
            type: 'gr',
            question: 'The heart and lungs are protected inside the chest cavity by the ribs.',
            answer: 'Because they are vital organs that need rigid protection from injuries.',
          },
          {
            id: 'ch4-l3-q3',
            type: 'gr',
            question: 'The kidneys are located in the lower back on each side of the backbone.',
            answer: 'To effectively filter blood flowing through the lower body trunk.',
          },
          {
            id: 'ch4-l3-q4',
            type: 'whi',
            question: 'Body organs work independently without integration.',
            answer: 'The body cannot coordinate its functions to survive.',
          },
          {
            id: 'ch4-l3-q5',
            type: 'whi',
            question: 'A sharp injury hits the chest without rib protection.',
            answer: 'The heart and lungs could be severely damaged.',
          },
          {
            id: 'ch4-l3-q6',
            type: 'whi',
            question: 'Blood vessels are cut off from an organ.',
            answer: 'The organ loses oxygen and nutrients and stops working.',
          },
          {
            id: 'ch4-l3-q7',
            type: 'choose',
            question: 'The heart and lungs are located inside the',
            options: [
              { key: 'a', label: 'Abdomen' },
              { key: 'b', label: 'Chest cavity' },
              { key: 'c', label: 'Lower back' },
              { key: 'd', label: 'Head' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l3-q8',
            type: 'choose',
            question: 'The stomach is located in the',
            options: [
              { key: 'a', label: 'Lower back' },
              { key: 'b', label: 'Upper abdomen' },
              { key: 'c', label: 'Leg' },
              { key: 'd', label: 'Neck' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch4-l3-q9',
            type: 'term',
            question: 'The cavity in the body that contains the right and left lungs and the heart.',
            answer: 'Chest cavity',
            acceptedAnswers: ['chest cavity'],
          },
          {
            id: 'ch4-l3-q10',
            type: 'term',
            question: 'The process where different body organs work together and integrate to perform functions.',
            answer: 'Integration of body organs',
            acceptedAnswers: ['integration of body organs', 'integration'],
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-5',
    chapterNumber: 5,
    title: 'Photosynthesis',
    monthLabel: 'November Curriculum',
    accentColor: 'teal',
    lessons: [
      {
        id: 'ch5-l1',
        lessonNumber: 1,
        title: 'Sunlight and Starch',
        summary: 'How green plants use sunlight, water, and carbon dioxide to make sugar stored as starch and release oxygen.',
        definitions: [
          {
            term: 'Photosynthesis',
            text: 'A process in which green plants use light to make food inside their leaves.',
          },
        ],
        keyFacts: [
          {
            label: 'Requirements & Products of Photosynthesis',
            items: [
              'If sunlight is blocked from some leaves, they will not make food.',
              'Needs: 1. Sunlight (absorbed from sun by leaves), 2. Water (absorbed from soil by roots), 3. Carbon dioxide gas (enters leaves from air).',
              'Produces: Sugar (stored as starch) and Oxygen (released to air).',
            ],
          },
        ],
        activity: {
          title: 'Testing leaves for starch after blocking sunlight',
          steps: [
            'Block sunlight from part of the leaf beforehand to remove previously stored starch.',
            'Expose plant to sunlight.',
            'Use ethanol to remove green color so iodine color change can be clearly observed.',
            'Add iodine solution: exposed part turns blue-black (starch present); blocked part does not turn blue-black.',
          ],
          conclusion: 'Green plants need light to make food (sugar stored as starch) inside their leaves.',
        },
        microscopeSpecimenId: 'leaf-stomata',
        experimentId: 'sunlight-starch',
        exam: [
          {
            id: 'ch5-l1-q1',
            type: 'gr',
            question: 'Plants whose leaves are blocked from sunlight for a few days turn yellow and do not grow well.',
            answer: 'Because they cannot make their food through photosynthesis without light.',
          },
          {
            id: 'ch5-l1-q2',
            type: 'gr',
            question: 'Green leaves release oxygen gas during daylight.',
            answer: 'As a product of the photosynthesis process.',
          },
          {
            id: 'ch5-l1-q3',
            type: 'gr',
            question: 'Water is essential for plant growth and food production.',
            answer: 'Because it is absorbed by roots and used in photosynthesis.',
          },
          {
            id: 'ch5-l1-q4',
            type: 'whi',
            question: 'Sunlight is blocked from a green plant\'s leaves for several days.',
            answer: 'The leaves cannot make food and will not grow as well as exposed leaves.',
          },
          {
            id: 'ch5-l1-q5',
            type: 'whi',
            question: 'Carbon dioxide gas is missing from a plant\'s environment.',
            answer: 'The plant cannot complete photosynthesis to produce food.',
          },
          {
            id: 'ch5-l1-q6',
            type: 'whi',
            question: 'Roots absorb water and leaves absorb sunlight and carbon dioxide.',
            answer: 'The plant performs photosynthesis, producing sugar and oxygen.',
          },
          {
            id: 'ch5-l1-q7',
            type: 'choose',
            question: 'The process in which green plants use light to make food inside their leaves is',
            options: [
              { key: 'a', label: 'Respiration' },
              { key: 'b', label: 'Photosynthesis' },
              { key: 'c', label: 'Digestion' },
              { key: 'd', label: 'Combustion' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch5-l1-q8',
            type: 'choose',
            question: 'During photosynthesis, green plants produce oxygen and',
            options: [
              { key: 'a', label: 'Salt' },
              { key: 'b', label: 'Sugar stored as starch' },
              { key: 'c', label: 'Oil' },
              { key: 'd', label: 'Vinegar' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch5-l1-q9',
            type: 'term',
            question: 'The process where green plants use light to make food inside their leaves.',
            answer: 'Photosynthesis',
            acceptedAnswers: ['photosynthesis'],
          },
          {
            id: 'ch5-l1-q10',
            type: 'term',
            question: 'The gas absorbed by plant leaves from the air during photosynthesis.',
            answer: 'Carbon dioxide gas',
            acceptedAnswers: ['carbon dioxide', 'carbon dioxide gas', 'co2'],
          },
        ],
      },
      {
        id: 'ch5-l2',
        lessonNumber: 2,
        title: 'Gas Exchange in Plants',
        summary: 'Relationship between light, photosynthesis, and respiration in plants during day and night.',
        definitions: [],
        keyFacts: [
          {
            label: 'Photosynthesis and Respiration in Plants',
            items: [
              'Air is important for plant life for both photosynthesis and respiration.',
              'During respiration, a plant takes in oxygen and releases carbon dioxide.',
              'During day (Light present): Photosynthesis and respiration occur together. Photosynthesis is more active. Plant takes in carbon dioxide and releases oxygen at a greater rate than it uses oxygen during respiration.',
              'At night (Light absent): Plant continues to respire. Photosynthesis stops. Plant takes in oxygen and releases carbon dioxide.',
            ],
          },
        ],
        activity: {
          title: 'Identifying gas used/produced during photosynthesis',
          steps: [
            'Put bag over plant exposed to sunlight for an hour.',
            'Blow into bag: carbon dioxide increases.',
            'After leaving plant in sunlight: oxygen increases, carbon dioxide decreased.',
          ],
          conclusion: 'During daylight, photosynthesis is more active than respiration, taking in carbon dioxide and releasing oxygen.',
        },
        experimentId: 'plant-gas-exchange',
        exam: [
          {
            id: 'ch5-l2-q1',
            type: 'gr',
            question: 'Photosynthesis stops at night while respiration continues.',
            answer: 'Because light is absent at night, which is required for photosynthesis.',
          },
          {
            id: 'ch5-l2-q2',
            type: 'gr',
            question: 'Plants take in more carbon dioxide than they release during the day.',
            answer: 'Because photosynthesis is more active than respiration during daylight.',
          },
          {
            id: 'ch5-l2-q3',
            type: 'gr',
            question: 'Plants need air for both photosynthesis and respiration.',
            answer: 'To take in carbon dioxide for food making and oxygen for breathing/respiration.',
          },
          {
            id: 'ch5-l2-q4',
            type: 'whi',
            question: 'A plant is left in complete darkness at night.',
            answer: 'Photosynthesis stops, and the plant only respires, taking in oxygen and releasing carbon dioxide.',
          },
          {
            id: 'ch5-l2-q5',
            type: 'whi',
            question: 'You test the air inside a bag covering a plant exposed to sunlight for an hour.',
            answer: 'Oxygen increases and carbon dioxide decreases.',
          },
          {
            id: 'ch5-l2-q6',
            type: 'whi',
            question: 'A plant breathes and performs photosynthesis simultaneously during the day.',
            answer: 'It releases oxygen at a greater rate than it uses oxygen for respiration.',
          },
          {
            id: 'ch5-l2-q7',
            type: 'choose',
            question: 'During the day, photosynthesis is',
            options: [
              { key: 'a', label: 'Slower than respiration' },
              { key: 'b', label: 'More active than respiration' },
              { key: 'c', label: 'Stopped completely' },
              { key: 'd', label: 'Equal to respiration' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch5-l2-q8',
            type: 'choose',
            question: 'At night, the plant',
            options: [
              { key: 'a', label: 'Stops all life processes' },
              { key: 'b', label: 'Continues to respire' },
              { key: 'c', label: 'Produces starch' },
              { key: 'd', label: 'Absorbs sunlight' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch5-l2-q9',
            type: 'term',
            question: 'The process that stops at night in plants due to the absence of light.',
            answer: 'Photosynthesis',
            acceptedAnswers: ['photosynthesis'],
          },
          {
            id: 'ch5-l2-q10',
            type: 'term',
            question: 'The process that continues day and night in plants for breathing.',
            answer: 'Respiration',
            acceptedAnswers: ['respiration', 'breathing'],
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-6',
    chapterNumber: 6,
    title: 'Transportation of Water in Plants',
    monthLabel: 'November Curriculum',
    accentColor: 'indigo',
    lessons: [
      {
        id: 'ch6-l1',
        lessonNumber: 1,
        title: 'Transpiration',
        summary: 'How plants lose water vapor through stomata on leaves.',
        definitions: [
          {
            term: 'Transpiration',
            text: 'Transpiration is the process by which a plant loses water as vapor to the air.',
          },
          {
            term: 'Stomata',
            text: 'Small pores found mostly on the lower surface of leaves that act as exits for water vapor.',
          },
        ],
        keyFacts: [
          {
            label: 'Transpiration Process',
            items: [
              'Water leaves through stomata as vapor and condenses into water drops on the inside surface of a plastic bag.',
              'Stomata are small pores found mostly on the lower surface of leaves.',
            ],
          },
        ],
        activity: {
          title: 'Transpiration in plants',
          steps: [
            'Cover Plant (1) with leaves and Plant (2) with leaves removed in plastic bags.',
            'Place both plants in a sunny place.',
            'Plant (1) forms water drops inside bag; Plant (2) does not form water drops.',
          ],
          conclusion:
            'Plant carries out transpiration, during which water leaves through stomata as vapor and condenses into water drops on the inside surface of the plastic bag.',
        },
        microscopeSpecimenId: 'leaf-stomata',
        experimentId: 'transpiration-bag',
        exam: [
          {
            id: 'ch6-l1-q1',
            type: 'gr',
            question: 'Water drops form on the inside surface of a plastic bag covering a leafy plant placed in the sun.',
            answer: 'Due to transpiration where water vapor escapes through stomata and condenses.',
          },
          {
            id: 'ch6-l1-q2',
            type: 'gr',
            question: 'Plant (2) with all leaves removed does not form water drops inside its plastic bag.',
            answer: 'Because leaves contain stomata through which transpiration occurs.',
          },
          {
            id: 'ch6-l1-q3',
            type: 'gr',
            question: 'Transpiration is important for plants.',
            answer: 'It helps release excess water and pulls water upward from roots.',
          },
          {
            id: 'ch6-l1-q4',
            type: 'whi',
            question: 'A plant with all its leaves is left in a sunny place inside a sealed plastic bag.',
            answer: 'Water drops form on the inside surface of the bag due to transpiration.',
          },
          {
            id: 'ch6-l1-q5',
            type: 'whi',
            question: 'Stomata are completely absent or blocked on a plant leaf.',
            answer: 'Water vapor cannot escape easily through transpiration.',
          },
          {
            id: 'ch6-l1-q6',
            type: 'whi',
            question: 'Excess water absorbed by roots is not released.',
            answer: 'Plants use transpiration to regulate water levels.',
          },
          {
            id: 'ch6-l1-q7',
            type: 'choose',
            question: 'The process by which a plant loses water as vapor to the air is',
            options: [
              { key: 'a', label: 'Photosynthesis' },
              { key: 'b', label: 'Transpiration' },
              { key: 'c', label: 'Respiration' },
              { key: 'd', label: 'Digestion' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch6-l1-q8',
            type: 'choose',
            question: 'Small pores found mostly on the lower surface of leaves that act as exits for water vapor are',
            options: [
              { key: 'a', label: 'Villi' },
              { key: 'b', label: 'Alveoli' },
              { key: 'c', label: 'Stomata' },
              { key: 'd', label: 'Gills' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch6-l1-q9',
            type: 'term',
            question: 'The process by which a plant loses water as vapor to the air.',
            answer: 'Transpiration',
            acceptedAnswers: ['transpiration'],
          },
          {
            id: 'ch6-l1-q10',
            type: 'term',
            question: 'Small pores found on the underside of leaves acting as exits for water vapor.',
            answer: 'Stomata',
            acceptedAnswers: ['stomata'],
          },
        ],
      },
      {
        id: 'ch6-l2',
        lessonNumber: 2,
        title: 'The Path of Water',
        summary: 'Water transport from roots through stems to leaves, observed using red-colored water.',
        definitions: [
          {
            term: 'Path of water',
            text: 'Roots -> Stems -> Leaves.',
          },
        ],
        keyFacts: [
          {
            label: 'Water Transport Inside Plants',
            items: [
              'When a wilted plant is watered, its leaves recover because water is transported to them.',
              'Path of water: Roots -> Stems -> Leaves.',
            ],
          },
        ],
        activity: {
          title: 'Observing path of water inside a plant',
          steps: [
            'Immerse roots in red-colored water.',
            'Examine with magnifying glass or microscope: specific parts in roots, stems, and veins of leaves turn red.',
          ],
          conclusion: 'Water travels upward inside the plant from roots through stems to the veins of leaves.',
        },
        microscopeSpecimenId: 'plant-water-path',
        experimentId: 'colored-water-path',
        exam: [
          {
            id: 'ch6-l2-q1',
            type: 'gr',
            question: 'A wilted plant recovers and stands upright after being watered.',
            answer: 'Because water is transported from roots through stems to the leaves.',
          },
          {
            id: 'ch6-l2-q2',
            type: 'gr',
            question: 'The veins of plant leaves turn red when the roots are immersed in red-colored water.',
            answer: 'Because water travels upward from roots through the stem into the leaf veins.',
          },
          {
            id: 'ch6-l2-q3',
            type: 'gr',
            question: 'Roots, stems, and leaves form an integrated path for water in plants.',
            answer: 'To distribute water and minerals to all parts of the plant.',
          },
          {
            id: 'ch6-l2-q4',
            type: 'whi',
            question: 'You immerse the washed roots of a plant in red-colored water.',
            answer: 'Specific parts of roots, stems, and the leaf veins turn red.',
          },
          {
            id: 'ch6-l2-q5',
            type: 'whi',
            question: 'A plant is deprived of water in the soil.',
            answer: 'It wilts because water cannot reach the leaves.',
          },
          {
            id: 'ch6-l2-q6',
            type: 'whi',
            question: 'Water is absorbed by the roots of a green plant.',
            answer: 'It travels upward through the stem to the leaves.',
          },
          {
            id: 'ch6-l2-q7',
            type: 'choose',
            question: 'Water is transported to all parts of the plant in the order of',
            options: [
              { key: 'a', label: 'Leaves -> Stems -> Roots' },
              { key: 'b', label: 'Roots -> Stems -> Leaves' },
              { key: 'c', label: 'Stems -> Leaves -> Roots' },
              { key: 'd', label: 'Leaves -> Roots -> Stems' },
            ],
            correctKey: 'b',
          },
          {
            id: 'ch6-l2-q8',
            type: 'choose',
            question: 'When a plant\'s roots are placed in red-colored water, the parts that turn red include the veins of the',
            options: [
              { key: 'a', label: 'Roots only' },
              { key: 'b', label: 'Flowers' },
              { key: 'c', label: 'Leaves' },
              { key: 'd', label: 'Stems only' },
            ],
            correctKey: 'c',
          },
          {
            id: 'ch6-l2-q9',
            type: 'term',
            question: 'The sequence path through which water moves inside a plant.',
            answer: 'Roots to Stems to Leaves',
            acceptedAnswers: ['roots to stems to leaves', 'roots -> stems -> leaves'],
          },
          {
            id: 'ch6-l2-q10',
            type: 'term',
            question: 'The instrument used to closely examine the red-colored vascular parts inside the plant stem and roots.',
            answer: 'Microscope / Magnifying glass',
            acceptedAnswers: ['microscope', 'magnifying glass', 'microscope / magnifying glass'],
          },
        ],
      },
    ],
  },
];

export const ALL_LESSONS = CURRICULUM_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((lesson) => ({ chapter: ch, lesson }))
);
