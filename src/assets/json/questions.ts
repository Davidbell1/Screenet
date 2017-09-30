//introduction question
export const INTRODUCTION_QUESTIONS ={
	'question_0': {
		id: 'question_0',
		title: 'How old are you?',
		subtitle: 'Your age help us determine the number of time you should check any sign of cancer.',
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
		]
	},
	'question_1': {
		id: 'Whatsexareyou?',
		title: 'What sex are you?',
		subtitle: 'You sex determine the type of cancer you should be aware of.',
		answers: [
			{
				label: 'Male',
				value: 'male'
			},
			{
				label: 'Female',
				value: 'female'
			}
		]
	},
};

//introduction first degree loop
export const WOMEN_TYPE_OF_CANCER =[
	{
		id: 'Haveyoueverhadanyofthefollowingbefore?1',
		title: 'Have you ever had any of the following cancer before?',
		subtitle: 'First degree relatives include parents and siblings.',
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
				label: 'Breast',
				value: 'breast'
			},
			{
				label: 'Melanoma (or >5 dysplastic naevi)',
				value: 'melanoma'
			},
			{
				label: 'Non Melanomatous skin cancer',
				value: 'non melanomatous'
			},
			{
				label: 'Ovarian',
				value: 'ovarian'
			},
			{
				label: 'Cervical / a previous abnormal pap test',
				value: 'pap test'
			},
			{
				label: 'Other',
				value: 'other'
			},
			{
				label: 'None',
				value: 'none'
			}
		]
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
				value: 'melanoma'
			},
			{
				label: 'Non Melanomatous skin cancer',
				value: 'non melanomatous'
			},
			{
				label: 'Other',
				value: 'other'
			},
			{
				label: 'None',
				value: 'none'
			}
		]
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
			}
		]
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
				label: 'Other',
				value: 'other'
			}
		]
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
		]
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
				value: '2'
			},
			{
				label: 'more than 2',
				value: '> 2'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		]
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
			}
		]
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
			}
		]
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
				label: 'Other',
				value: 'other'
			}
		]
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
		]
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
				value: '2'
			},
			{
				label: 'More than 2',
				value: '> 2'
			},
			{
				label: 'Unknown',
				value: 'unknown'
			}
		]
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
			}
		]
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
				value: 'lynch syndrome'
			},
			{
				label: 'A personal or family history of BRCA',
				value: 'brca'
			},
			{
				label: 'A personal or family history of FAP',
				value: 'fap'
			},
			{
				label: 'Ashkenazi Heritage',
				value: 'ashkenazi heritage'
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
		]
	}
]

