const { helpers, languageProcessing } = require("yoastseo");

// Premium researches and helpers
const keyphraseDistribution =
	languageProcessing.researches.keyphraseDistribution;
const wordComplexity = languageProcessing.researches.wordComplexity;
const getLongCenterAlignedTexts =
	languageProcessing.researches.getLongCenterAlignedTexts;
const getLanguagesWithWordComplexity = helpers.getLanguagesWithWordComplexity;

// Import all researchers statically
const EnglishResearcher =
	require("yoastseo/build/languageProcessing/languages/en/Researcher").default;
const GermanResearcher =
	require("yoastseo/build/languageProcessing/languages/de/Researcher").default;
const SpanishResearcher =
	require("yoastseo/build/languageProcessing/languages/es/Researcher").default;
const FrenchResearcher =
	require("yoastseo/build/languageProcessing/languages/fr/Researcher").default;
const ItalianResearcher =
	require("yoastseo/build/languageProcessing/languages/it/Researcher").default;
const DutchResearcher =
	require("yoastseo/build/languageProcessing/languages/nl/Researcher").default;
const RussianResearcher =
	require("yoastseo/build/languageProcessing/languages/ru/Researcher").default;
const IndonesianResearcher =
	require("yoastseo/build/languageProcessing/languages/id/Researcher").default;
const PortugueseResearcher =
	require("yoastseo/build/languageProcessing/languages/pt/Researcher").default;
const PolishResearcher =
	require("yoastseo/build/languageProcessing/languages/pl/Researcher").default;
const ArabicResearcher =
	require("yoastseo/build/languageProcessing/languages/ar/Researcher").default;
const SwedishResearcher =
	require("yoastseo/build/languageProcessing/languages/sv/Researcher").default;
const HebrewResearcher =
	require("yoastseo/build/languageProcessing/languages/he/Researcher").default;
const HungarianResearcher =
	require("yoastseo/build/languageProcessing/languages/hu/Researcher").default;
const NorwegianResearcher =
	require("yoastseo/build/languageProcessing/languages/nb/Researcher").default;
// const TurkishResearcher =
// require("yoastseo/build/languageProcessing/languages/tr/Researcher").default;
const CzechResearcher =
	require("yoastseo/build/languageProcessing/languages/cs/Researcher").default;
const SlovakResearcher =
	require("yoastseo/build/languageProcessing/languages/sk/Researcher").default;
const JapaneseResearcher =
	require("yoastseo/build/languageProcessing/languages/ja/Researcher").default;

// Create a lookup map for researchers
const RESEARCHERS = {
	en: EnglishResearcher,
	de: GermanResearcher,
	es: SpanishResearcher,
	fr: FrenchResearcher,
	it: ItalianResearcher,
	nl: DutchResearcher,
	ru: RussianResearcher,
	id: IndonesianResearcher,
	pt: PortugueseResearcher,
	pl: PolishResearcher,
	ar: ArabicResearcher,
	sv: SwedishResearcher,
	he: HebrewResearcher,
	hu: HungarianResearcher,
	nb: NorwegianResearcher,
	// tr: TurkishResearcher,
	cs: CzechResearcher,
	sk: SlovakResearcher,
	ja: JapaneseResearcher,
};

const MORPHOLOGY_VERSIONS = {
	en: "v6",
	de: "v11",
	es: "v10",
	fr: "v11",
	it: "v10",
	nl: "v9",
	ru: "v10",
	id: "v9",
	pt: "v9",
	pl: "v9",
	ar: "v9",
	sv: "v1",
	he: "v1",
	hu: "v2",
	nb: "v1",
	tr: "v1",
	cs: "v1",
	sk: "v1",
	ja: "v1",
};

/**
 * Retrieves a Researcher instance for a specific language.
 *
 * @param {string} language The language to get the Researcher for.
 * @returns {Researcher} The Researcher instance.
 * @throws {Error} If the language is not supported.
 */
const getResearcher = (language) => {
	if (!RESEARCHERS[language]) {
		throw new Error(`Language '${language}' is not supported.`);
	}

	const ResearcherClass = RESEARCHERS[language];
	const researcher = new ResearcherClass();

	// Add Yoast SEO Premium researches/helpers/configs (optional)
	researcher.addResearch("keyphraseDistribution", keyphraseDistribution);
	if (getLanguagesWithWordComplexity().includes(language)) {
		researcher.addResearch("wordComplexity", wordComplexity);
		researcher.addHelper(
			"checkIfWordIsComplex",
			helpers.getWordComplexityHelper(language),
		);
		researcher.addConfig(
			"wordComplexity",
			helpers.getWordComplexityConfig(language),
		);
	}
	researcher.addResearch(
		"getLongCenterAlignedTexts",
		getLongCenterAlignedTexts,
	);

	// Retrieve the morphology data (optional)
	// const dataVersion = MORPHOLOGY_VERSIONS[language];
	// // eslint-disable-next-line global-require
	// const premiumData = require(
	// 	`yoastseo/premium-configuration/data/morphologyData-${language}-${dataVersion}.json`,
	// );
	// researcher.addResearchData("morphology", premiumData);

	return researcher;
};

module.exports = { getResearcher };
