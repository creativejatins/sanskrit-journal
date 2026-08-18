import { config, fields, collection } from '@keystatic/core';

/**
 * Authoritative definition of the content model.
 * Prose in docs/CONTENT-MODEL.md; reasoning in docs/DECISIONS.md.
 *
 * TWO RULES THIS FILE ENFORCES
 *
 * 1. No Sanskrit value is supplied here. Every controlled list whose values are
 *    Sanskrit ships with a single TODO option so the gap is visible in the admin
 *    UI and impossible to miss. Fill them from a printed page — the page for each
 *    is in the "Values still to be entered" table in docs/CONTENT-MODEL.md.
 *
 * 2. Slugs are permanent. Keystatic's relationship field stores a slug as a plain
 *    string with no cascade, so renaming an entry silently breaks every reference
 *    to it. ASCII-folded IAST, disambiguator always appended.
 */

/** Placeholder for a list whose values must come from print. */
const TODO = [{ label: 'TODO — enter from a printed page', value: 'todo' }];

/** Short codes from docs/SOURCES.md. Codes are permanent. */
const SOURCE_CODES = [
  { label: 'BAPS-1 — प्रथमो भागः', value: 'BAPS-1' },
  { label: 'BAPS-2 — द्वितीयो भागः', value: 'BAPS-2' },
  { label: 'BAPS-3 — तृतीयो भागः', value: 'BAPS-3' },
  { label: 'PS-MAHATO', value: 'PS-MAHATO' },
  { label: 'PS-KALIDAS', value: 'PS-KALIDAS' },
  { label: 'LSK-GPS', value: 'LSK-GPS' },
  { label: 'DEVVANI', value: 'DEVVANI' },
];

/**
 * Provenance. On every entry in every collection, no exceptions.
 * An entry without a locator cannot be re-verified and should not be written.
 */
const provenance = {
  source_type: fields.select({
    label: 'Source type',
    options: [
      { label: 'Print', value: 'print' },
      { label: 'Video', value: 'video' },
    ],
    defaultValue: 'print',
  }),
  source: fields.select({
    label: 'Source',
    description: 'Short code from docs/SOURCES.md.',
    options: SOURCE_CODES,
    defaultValue: 'BAPS-1',
  }),
  locator: fields.text({
    label: 'Locator',
    description:
      'Page number for print (p. 31), mm:ss for video. Never repeat the book — the source code carries it.',
    validation: { isRequired: true },
  }),
};

const status = fields.select({
  label: 'Status',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
  defaultValue: 'draft',
});

const entryLanguage = fields.select({
  label: 'Language',
  description: 'Journal prose is written in one language per entry, not three.',
  options: [
    { label: 'ગુજરાતી', value: 'gu' },
    { label: 'हिन्दी', value: 'hi' },
    { label: 'English', value: 'en' },
  ],
  defaultValue: 'gu',
});

const topicRefs = fields.array(
  fields.relationship({ label: 'Topic', collection: 'topics' }),
  { label: 'Topics', itemLabel: (props) => props.value ?? 'Topic' },
);

/** A translatable field, as three suffixed siblings. Fallback gu → en → hi. */
const translatable = (label: string, opts: { required?: boolean } = {}) => ({
  [`${label}_gu`]: fields.text({
    label: `${label} (ગુજરાતી)`,
    validation: { isRequired: opts.required ?? false },
  }),
  [`${label}_hi`]: fields.text({ label: `${label} (हिन्दी)` }),
  [`${label}_en`]: fields.text({ label: `${label} (English)` }),
});

/**
 * Paradigm grids.
 *
 * Cell names follow the source's own ordering, NOT English person names:
 * the Sanskrit पुरुष sequence is the reverse of the English one, so naming these
 * first/second/third person would embed that mismatch permanently.
 *
 * These names transliterate the row labels as BAPS prints them.
 * Confirm the order against BAPS-2 p. 141 before entering data.
 */
const NUMBERS = ['eka', 'dvi', 'bahu'] as const;
const PERSONS = ['prathama', 'madhyama', 'uttama'] as const;
const CASES = [
  'prathama',
  'dvitiya',
  'trtiya',
  'caturthi',
  'pancami',
  'sasthi',
  'saptami',
  'sambodhana',
] as const;

const grid = (rows: readonly string[]) =>
  Object.fromEntries(
    rows.flatMap((row) =>
      NUMBERS.map((num) => [
        `${row}_${num}`,
        fields.text({
          label: `${row} · ${num}`,
          validation: { isRequired: true },
        }),
      ]),
    ),
  );

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'sanskritgrammar.com' },
    navigation: {
      Journal: ['lessons', 'texts', 'notes'],
      Reference: ['dhatus', 'vocabulary', 'conjugations', 'declensions'],
      Structure: ['topics', 'books'],
    },
  },

  collections: {
    /* ------------------------------------------------------------------ */
    /* Structure                                                           */
    /* ------------------------------------------------------------------ */

    topics: collection({
      label: 'Topics',
      path: 'src/content/topics/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: {
            label: 'Slug',
            description: 'ASCII, permanent. Never change this.',
          },
        }),
        ...translatable('name', { required: true }),
        ...translatable('description'),
        first_varga: fields.integer({
          label: 'First वर्ग',
          description:
            'Where the syllabus first introduces it. Topics recur — this records the start, not the only pass.',
        }),
      },
    }),

    books: collection({
      label: 'Books',
      path: 'src/content/books/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: { label: 'Slug', description: 'Matches the source code, e.g. baps-1.' },
        }),
        title_as_printed: fields.text({
          label: 'Title as printed',
          description: 'From the title page, in its own script. Not translated.',
        }),
        part_number: fields.integer({ label: 'Part number' }),
        course_year: fields.integer({
          label: 'Course year',
          description: 'Not derivable from part number.',
        }),
        edition: fields.text({ label: 'Edition' }),
        published: fields.text({ label: 'Published', description: 'As printed.' }),
        varga_start: fields.integer({ label: 'First वर्ग' }),
        varga_end: fields.integer({ label: 'Last वर्ग' }),
        page_count: fields.integer({ label: 'Pages' }),
      },
    }),

    /* ------------------------------------------------------------------ */
    /* Journal                                                             */
    /* ------------------------------------------------------------------ */

    lessons: collection({
      label: 'Lessons',
      path: 'src/content/lessons/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'One topic within a वर्ग — not the whole वर्ग.',
          },
          slug: {
            description:
              'Carries its वर्ग for uniqueness, e.g. varga-07-sandhi. Permanent.',
          },
        }),
        date: fields.date({ label: 'Date' }),
        language: entryLanguage,
        ...provenance,
        book: fields.relationship({ label: 'Book', collection: 'books' }),
        varga: fields.integer({
          label: 'वर्ग',
          description:
            'Continuous across books — 1–41 today, extends with book four. Not per-book.',
          validation: { isRequired: true },
        }),
        sequence_in_varga: fields.integer({
          label: 'Sequence within वर्ग',
          description: 'Orders several topics inside one वर्ग.',
        }),
        topic: fields.relationship({
          label: 'Topic',
          collection: 'topics',
          validation: { isRequired: true },
        }),
        dhatus_introduced: fields.array(
          fields.relationship({ label: 'धातु', collection: 'dhatus' }),
          { label: 'धातु introduced', itemLabel: (p) => p.value ?? 'धातु' },
        ),
        vocabulary_introduced: fields.array(
          fields.relationship({ label: 'Word', collection: 'vocabulary' }),
          { label: 'Vocabulary introduced', itemLabel: (p) => p.value ?? 'Word' },
        ),
        status,
        body: fields.mdx({
          label: 'Body',
          description:
            'Your own words. Never paste source text here as a draft to be reworded later.',
        }),
      },
    }),

    texts: collection({
      label: 'Texts',
      path: 'src/content/texts/*',
      slugField: 'text_name',
      format: { contentField: 'body' },
      schema: {
        text_name: fields.slug({ name: { label: 'Text name' } }),
        date: fields.date({ label: 'Date' }),
        language: entryLanguage,
        ...provenance,
        topics: topicRefs,
        // मनोयत्नः passages do NOT belong here — they are BAPS's own text.
        // Write a `notes` entry about one instead. See docs/CONTENT-MODEL.md.
        verses: fields.array(
          fields.object({
            number: fields.text({ label: 'Verse number' }),
            mula: fields.text({ label: 'मूल', multiline: true }),
            sandhi_viccheda: fields.text({ label: 'सन्धि-विच्छेद', multiline: true }),
            words: fields.array(
              fields.object({
                word: fields.text({ label: 'Word' }),
                analysis: fields.text({ label: 'Analysis' }),
                meaning: fields.text({ label: 'Meaning' }),
              }),
              { label: 'Words', itemLabel: (p) => p.fields.word.value || 'Word' },
            ),
            anvaya: fields.text({ label: 'अन्वय', multiline: true }),
            translation: fields.text({ label: 'Translation', multiline: true }),
            notes: fields.mdx({ label: 'Notes' }),
          }),
          { label: 'Verses', itemLabel: (p) => p.fields.number.value || 'Verse' },
        ),
        status,
        body: fields.mdx({ label: 'Introduction' }),
      },
    }),

    notes: collection({
      label: 'Notes',
      path: 'src/content/notes/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        language: entryLanguage,
        ...provenance,
        topics: topicRefs,
        status,
        body: fields.mdx({ label: 'Body' }),
      },
    }),

    /* ------------------------------------------------------------------ */
    /* Reference — entered in Keystatic                                    */
    /* ------------------------------------------------------------------ */

    dhatus: collection({
      label: 'धातु',
      path: 'src/content/dhatus/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: {
            label: 'Slug',
            description: 'ASCII-folded IAST plus गण, e.g. bhu-1. Permanent.',
          },
        }),
        dhatu: fields.text({
          label: 'धातु',
          description: 'Devanagari, exactly as printed.',
          validation: { isRequired: true },
        }),
        dhatu_iast: fields.text({ label: 'IAST' }),

        // ENTRY HAZARD: in all three books गण and पद are SECTION HEADINGS, not
        // row values. Enter a whole table at a time, never a row at a time.
        gana: fields.select({ label: 'गण', options: TODO, defaultValue: 'todo' }),
        pada: fields.select({ label: 'पद', options: TODO, defaultValue: 'todo' }),

        kriyapada: fields.text({
          label: 'ક્રિયાપદ',
          description:
            'The third printed column — the form given beside each धातु. From the page, like any other form.',
        }),
        ...translatable('artha'),
        notes: fields.text({ label: 'Notes', multiline: true }),
        ...provenance,
        heading_locator: fields.text({
          label: 'Heading locator',
          description:
            'Page of the गण/पद heading, where it differs from the row. Guards the commonest error.',
        }),
        status,
      },
    }),

    vocabulary: collection({
      label: 'Vocabulary',
      path: 'src/content/vocabulary/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: {
            label: 'Slug',
            description: 'ASCII-folded IAST plus लिंग, e.g. deva-m. Permanent.',
          },
        }),
        word: fields.text({ label: 'Word', validation: { isRequired: true } }),
        word_iast: fields.text({ label: 'IAST' }),

        // The only controlled list already filled — from BAPS-1 p. 10.
        // It is the model for the rest: values in the source's own script,
        // with the page recorded.
        word_type: fields.select({
          label: 'Word type',
          description: 'The five parts of speech — BAPS-1 p. 10.',
          options: [
            { label: 'નામ', value: 'nama' },
            { label: 'વિશેષણ', value: 'visheshana' },
            { label: 'સર્વનામ', value: 'sarvanama' },
            { label: 'અવ્યય', value: 'avyaya' },
            { label: 'ક્રિયાપદ', value: 'kriyapada' },
          ],
          defaultValue: 'nama',
        }),

        linga: fields.select({ label: 'लिंग', options: TODO, defaultValue: 'todo' }),
        stem_ending: fields.select({
          label: 'Stem ending',
          options: TODO,
          defaultValue: 'todo',
        }),
        ...translatable('meaning'),
        ...translatable('usage'),
        from_dhatu: fields.relationship({ label: 'From धातु', collection: 'dhatus' }),
        ...provenance,
        status,
      },
    }),

    /* ------------------------------------------------------------------ */
    /* Reference — generated by script, NOT typed here                     */
    /*                                                                     */
    /* Defined so Keystatic can read and render them, and so the shape is  */
    /* type-checked. Authoring route is a spreadsheet mirroring the        */
    /* printed table, converted and validated. Typing 90 forms into a web  */
    /* form is where errors that cannot be caught get in.                  */
    /* ------------------------------------------------------------------ */

    conjugations: collection({
      label: 'Conjugations',
      path: 'src/content/conjugations/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: {
            label: 'Slug',
            description: '<dhatu>--<derivation>--<lakara>--<pada>. Permanent.',
          },
        }),
        dhatu: fields.relationship({
          label: 'धातु',
          collection: 'dhatus',
          validation: { isRequired: true },
        }),
        derivation: fields.select({
          label: 'Derivation',
          options: TODO,
          defaultValue: 'todo',
        }),
        lakara: fields.select({ label: 'लकार', options: TODO, defaultValue: 'todo' }),
        pada: fields.select({ label: 'पद', options: TODO, defaultValue: 'todo' }),
        ...grid(PERSONS),
        notes: fields.text({
          label: 'Notes',
          description:
            'A gap in a printed paradigm is a fact about the page and belongs here — never as a silently empty cell.',
          multiline: true,
        }),
        ...provenance,
        status,
      },
    }),

    declensions: collection({
      label: 'Declensions',
      path: 'src/content/declensions/*',
      slugField: 'slug_source',
      format: { data: 'yaml' },
      schema: {
        slug_source: fields.slug({
          name: { label: 'Slug', description: '<stem>--<linga>. Permanent.' },
        }),
        stem: fields.text({ label: 'Stem', validation: { isRequired: true } }),
        stem_iast: fields.text({ label: 'IAST' }),
        stem_class: fields.select({
          label: 'Stem class',
          options: TODO,
          defaultValue: 'todo',
        }),
        stem_ending: fields.select({
          label: 'Stem ending',
          options: TODO,
          defaultValue: 'todo',
        }),
        linga: fields.select({ label: 'लिंग', options: TODO, defaultValue: 'todo' }),
        // कृदन्त decline but derive from a धातु.
        from_dhatu: fields.relationship({ label: 'From धातु', collection: 'dhatus' }),
        ...grid(CASES),
        notes: fields.text({ label: 'Notes', multiline: true }),
        ...provenance,
        status,
      },
    }),
  },
});
