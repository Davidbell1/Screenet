//introduction question
export const INTRODUCTION_QUESTIONS ={
	'question_0': {
		id: 'Howoldareyou?',
		title: 'How old are you?',
		subtitle: '',
		answers: [
			{
				label: 'younger than 40',
				value: '< 40'
			},
			{
				label: '40 - 45',
				value: '40 - 45'
			},
			{
				label: '45 - 50',
				value: '45 - 50'
			},
			{
				label: '50 - 55',
				value: '50 - 55'
			},
			{
				label: '55 - 70',
				value: '55 - 70'
			},
			{
				label: '70 - 75',
				value: '70 - 75'
			},
			{
				label: 'older than 75',
				value: '> 75'
			}
		],
		result: ''
	},
	'question_1': {
		id: 'Whatsexareyou?',
		title: 'What is your biological sex?',
		subtitle: '',
		answers: [
			{
				label: 'Male',
				value: 'male1'
			},
			{
				label: 'Female',
				value: 'female'
			}
		],
		result: ''
	},
};

//introduction first degree loop
export const WOMEN_TYPE_OF_CANCER =[
	{
		id: 'Haveyoueverhadanyofthefollowingbefore?1',
		title: 'Have you ever had any of the following cancers before?',
		subtitle: '',
		answers: [
			{
				label: 'Lung',
				value: 'lung'
			},
			{
				label: 'Breast',
				value: 'breast'
			},
			{
				label: 'Melanoma (or >5 dysplastic naevi)',
				value: 'melanoma1',
				additionnal_help: 'A mole that is usually larger and more irregular than normal, diagnosed on biopsy.'
			},
			{
				label: 'Non Melanomatous skin cancer',
				value: 'non melanomatous',
				additionnal_help: 'This include basal cell carcinoma and squamous cell carcinoma.'
			},
			{
				label: 'Ovarian',
				value: 'ovarian'
			},
			{
				label: 'Cervical / a previous abnormal pap test',
				value: 'cervical'
			},
			{
				label: 'Sarcoma',
				value: 'sarcoma'
			},
			{
				label: 'Other',
				value: 'other'
			},
			{
				label: 'None',
				value: 'none'
			}
		],
		result: ''
	}
];

//introduction first degree loop
export const MAN_TYPE_OF_CANCER =[
	{
		id: 'Haveyoueverhadanyofthefollowingbefore?',
		title: 'Have you ever had any of the following cancer before?',
		subtitle: '',
		answers: [
			{
				label: 'Colorectal',
				value: 'colorectal'
			},
			{
				label: 'Lung',
				value: 'lung'
			},
			{
				label: 'Prostate',
				value: 'prostate'
			},
			{
				label: 'Melanoma (or >5 dysplastic naevi)',
				value: 'melanoma1',
				additionnal_help: 'A mole that is usually larger and more irregular than normal, diagnosed on biopsy.'

			},
			{
				label: 'Non Melanomatous skin cancer',
				value: 'non melanomatous',
				additionnal_help: 'This include basal cell carcinoma and squamous cell carcinoma.'
			},
			{
				label: 'Sarcoma',
				value: 'sarcoma'
			},
			{
				label: 'Other',
				value: 'other'
			},
			{
				label: 'None',
				value: 'none'
			}
		],
		result: ''
	}
];

//introduction first degree loop
export const INTRODUCTION_FIST_DEGREE_LOOP =[
	{
		id: 'Haveanyfirstdegreerelativeshadcancer?',
		title: 'Have any first degree relatives had cancer?',
		subtitle: 'First degree relatives include parents and siblings.',
		answers: [
			{
				label: 'Yes',
				value: 'yes'
			},
			{
				label: 'No',
				value: 'no'
			},
			{
				label: 'Unsure',
				value: 'unsure'
			}
		],
		result: ''
	}
]

//first degree loop
export const FIST_DEGREE_LOOP =[	
	{
		id: 'Whatsortofcancerwasit?',
		title: 'What sort of cancer was it?',
		subtitle: '',
		answers: [
			{
				label: 'Colorectal',
				value: 'colorectal'
			},
			{
				label: 'Breast',
				value: 'breast'
			},
			{
				label: 'Prostate',
				value: 'prostate'
			},
			{
				label: 'Ovarian',
				value: 'ovarian'
			},
			{
				label: 'Melanoma',
				value: 'melanoma'
			},
			{
				label: 'Other skin cancer',
				value: 'other skin cancer'
			},
			{
				label: 'Sarcoma',
				value: 'sarcoma'
			},
			{
				label: 'Other',
				value: 'other1'
			}
		],
		result: ''
	},
	{
		id: 'Howoldweretheywhendiagnosed?',
		title: 'How old were they when diagnosed?',
		subtitle: '',
		answers: [
			{
				label: 'younger than 40',
				value: '< 40'
			},
			{
				label: '40 - 45',
				value: '40 - 45'
			},
			{
				label: '45 - 50',
				value: '45 - 50'
			},
			{
				label: '50 - 55',
				value: '50 - 55'
			},
			{
				label: '55 - 70',
				value: '55 - 70'
			},
			{
				label: '70 - 75',
				value: '70 - 75'
			},
			{
				label: 'older than 75',
				value: '> 75'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		],
		result: ''
	},
	{
		id: 'Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?',
		title: 'How many other first degree relatives on the same side of your family had the same cancer?',
		subtitle: '',
		answers: [
			{
				label: '0',
				value: '0'
			},
			{
				label: '1',
				value: '1'
			},
			{
				label: '2',
				value: '2x'
			},
			{
				label: 'more than 2',
				value: '> 2'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		],
		result: ''
	},
	{
		id: 'Haveanyfirstdegreerelativeshadadifferentcancer?',
		title: 'Have any first degree relatives had a different cancer?',
		subtitle: 'First degree relatives include parents and siblings.',
		answers: [
			{
				label: 'Yes',
				value: 'yes'
			},
			{
				label: 'No',
				value: 'no'
			},
			{
				label: 'Unsure',
				value: 'unsure'
			}
		],
		result: ''
	}
];

//introduction second degree loop
export const INTRODUCTION_SECOND_DEGREE_LOOP =[
	{
		id: 'Haveanyseconddegreerelativeshadcancer?',
		title: 'Have any second degree relatives had cancer?',
		subtitle: 'Second degree relatives include uncles, aunts, nephews, nieces, grandparents, grandchildren, half-siblings, and double cousins.',
		answers: [
			{
				label: 'Yes',
				value: 'yes'
			},
			{
				label: 'No',
				value: 'no'
			},
			{
				label: 'Unsure',
				value: 'unsure'
			}
		],
		result: ''
	}
]

//second degree loop
export const SECOND_DEGREE_LOOP =[
	{
		id: 'Whatsortofcancerwasit?',
		title: 'What sort of cancer was it?',
		subtitle: '',
		answers: [
			{
				label: 'Colorectal',
				value: 'colorectal'
			},
			{
				label: 'Breast',
				value: 'breast'
			},
			{
				label: 'Prostate',
				value: 'prostate'
			},
			{
				label: 'Ovarian',
				value: 'ovarian'
			},
			{
				label: 'Melanoma',
				value: 'melanoma'
			},
			{
				label: 'Other skin cancer',
				value: 'other skin cancer'
			},
			{
				label: 'Sarcoma',
				value: 'sarcoma'
			},
			{
				label: 'Other',
				value: 'other1'
			}
		],
		result: ''
	},
	{
		id: 'Howoldweretheywhendiagnosed?',
		title: 'How old were they when diagnosed?',
		subtitle: '',
		answers: [
			{
				label: 'younger than 40',
				value: '< 40'
			},
			{
				label: '40 - 45',
				value: '40 - 45'
			},
			{
				label: '45 - 50',
				value: '45 - 50'
			},
			{
				label: '50 - 55',
				value: '50 - 55'
			},
			{
				label: '55 - 70',
				value: '55 - 70'
			},
			{
				label: '70 - 75',
				value: '70 - 75'
			},
			{
				label: 'older than 75',
				value: '> 75'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		],
		result: ''
	},
	{
		id: 'Howmanyotherseconddegreerelativesonthesamesideofyourfamilyhadthesamecancer?',
		title: 'How many other second degree relatives on the same side of your family had the same cancer?',
		subtitle: 'Second degree relatives include uncles, aunts, nephews, nieces, grandparents, grandchildren, half-siblings, and double cousins.',
		answers: [
			{
				label: '0',
				value: '0'
			},
			{
				label: '1',
				value: '1'
			},
			{
				label: '2',
				value: '2x'
			},
			{
				label: 'More than 2',
				value: '> 2'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		],
		result: ''
	},
	{
		id: 'Haveanyseconddegreerelativeshadadifferentcancer?',
		title: 'Have any second degree relatives had a different cancer?',
		subtitle: 'Second degree relatives include uncles, aunts, nephews, nieces, grandparents, grandchildren, half-siblings, and double cousins.',
		answers: [
			{
				label: 'Yes',
				value: 'yes'
			},
			{
				label: 'No',
				value: 'no'
			},
			{
				label: 'Unsure',
				value: 'unsure'
			}
		],
		result: ''
	}
];

// closure questions
export const CLOSURE_QUESTION =[
	{
		id: 'Areyouawareofanygeneticmutationsinyouorinyourfamily?',
		title: 'Do you have any of the following.',
		subtitle: '',
		answers: [
			{
				label: 'A personal or family history of Lynch Syndrome',
				value: 'lynch syndrome',
				additionnal_help: 'Otherwise known as HNPCC (hereditary nonpolyposis colorectal cancer), Lynch Syndrome is a genetic condition that leads to a high risk of developing colorectal cancer as well as other cancers including endometrial, ovarian, gastric, hepatobiliary, small bowel, urinary tract, brain and skin cancer. '

			},
			{
				label: 'A personal or family history of BRCA',
				value: 'brca',
				additionnal_help: 'Mutations in either BRCA1 or BRCA2 genes result in significantly higher risk of developing breast and ovarian cancer.'
			},
			{
				label: 'A personal or family history of FAP',
				value: 'fap',
				additionnal_help: 'Familial adenomatous polyposis is a genetic condition which leads to the formation of multiple polyps in the colon. Though benign, these polyps can become malignant.'
			},
			{
				label: 'Ashkenazi Heritage',
				value: 'ashkenazi heritage',
				additionnal_help: 'Jewish people with Eastern European ancestry.'

			},
			{
				label: 'Immunosuppression',
				value: 'immunosuppression'
			},
			{
				label: 'A history of current or previous heavy smoking',
				value: 'a history of current or previous heavy smoking'
			},
			{
				label: 'Fair skin',
				value: 'fair skin'
			},
			{
				label: 'None',
				value: 'none'
			}
		],
		result: ''
	}
]

