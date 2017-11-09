import { ElementRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GENERAL, GENERAL_MEN, GENERAL_WOMEN, FOBT, COLOSCOPY5, COLOSCOPY1, EXAM24, EXAM6, MAMOGRAPH1, MAMOGRAPH2, ONCOLOGIST, PAP2, SEEK_EXPERT } from '../../../assets/json/answers';


import { QuestionsService } from '../../services/questions/questions.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss'],
})

export class ResultsComponent implements OnInit {
	lat: number = -33.852029;
	lng: number = 151.210920;
	questions: any;
	answer_array: any;
	answer_text: any = GENERAL;

	constructor( private element: ElementRef, private questions_service: QuestionsService, private router: Router ){}
	ngOnInit(){
		this.element.nativeElement.scrollIntoView();
		this.get_question();
	}

	get_question(){
		this.questions = this.questions_service.get_question();
		if( this.questions != undefined ){
			this.questions = this.questions;
			this.analyze_questionnaire( this.questions );
		}else{
			this.router.navigate(['/home']);
		}
	}

	analyze_questionnaire( questions ){
		let how_old,
			what_sex,
			type_of_cancer,
			first_degree_loop = [],
			second_degree_loop =[],
			genetic_mutation;

		for (var key_lvl1 in questions) {
			if (questions.hasOwnProperty(key_lvl1)) {
				switch( questions[key_lvl1].id ){
					case 'Howoldareyou?':
						how_old = questions[key_lvl1].result;
						break;
					case 'Whatsexareyou?':
						what_sex = questions[key_lvl1].result;
						break;
					case 'Haveyoueverhadanyofthefollowingbefore?1':
					case 'Haveyoueverhadanyofthefollowingbefore?':
						type_of_cancer = questions[key_lvl1].result;
						break;
					case 'Areyouawareofanygeneticmutationsinyouorinyourfamily?':
						genetic_mutation = questions[key_lvl1].result;
						break;
					case 'Haveanyfirstdegreerelativeshadcancer?':
						if(questions[key_lvl1].result == 'yes'){
							let how_many_first_loop = [];
							for ( var key_lvl2 in questions ){
								if ( questions.hasOwnProperty( key_lvl1 )){
									if( questions[key_lvl2].id == 'Haveanyfirstdegreerelativeshadadifferentcancer?' ){
										how_many_first_loop.push( key_lvl2 );
									}
								}
							}
							for( var i = 0; i < how_many_first_loop.length; i++){
								let id = how_many_first_loop[i].substr(how_many_first_loop[i].indexOf("_") + 1);
								first_degree_loop.push({
									'Whatsortofcancerwasit?' : questions[  'question_' + (id-3)  ].result,
									'Howoldweretheywhendiagnosed?' : questions[  'question_' + (id-2)  ].result,
									'Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?' : questions[  'question_' + (id-1)  ].result,
								});
							}
						}
						break;
					case 'Haveanyseconddegreerelativeshadcancer?':
						if(questions[key_lvl1].result == 'yes'){
							let how_many_second_loop = [];
							for ( var key_lvl2 in questions ){
								if ( questions.hasOwnProperty( key_lvl1 )){
									if( questions[key_lvl2].id == 'Haveanyseconddegreerelativeshadadifferentcancer?' ){
										how_many_second_loop.push( key_lvl2 );
									}
								}
							}
							for( var i = 0; i < how_many_second_loop.length; i++){
								let id = how_many_second_loop[i].substr(how_many_second_loop[i].indexOf("_") + 1);
								second_degree_loop.push({
									'Whatsortofcancerwasit?' : questions[  'question_' + (id-3)  ].result,
									'Howoldweretheywhendiagnosed?' : questions[  'question_' + (id-2)  ].result,
									'Howmanyotherseconddegreerelativesonthesamesideofyourfamilyhadthesamecancer?' : questions[  'question_' + (id-1)  ].result,
								});
							}
						}
						break;
					default:
						// console.log( questions[key_lvl1] );
						break;
				}
			}
		}

		this.analyze_general( what_sex );
		this.analyze_breast_cancer( first_degree_loop, second_degree_loop, genetic_mutation );
		this.analyze_cervical_cancer( what_sex, how_old, type_of_cancer );
		this.analyze_colorectal( how_old, type_of_cancer, first_degree_loop, genetic_mutation );
		this.analyze_skin( type_of_cancer, genetic_mutation, first_degree_loop );

		this.compile_answers();
	}

	analyze_general( what_sex ){
		if( what_sex == 'female'){
			this.answer_array.push('GENERAL_WOMEN');
		}else{
			this.answer_array.push('GENERAL_MEN');
		}
	}

	analyze_breast_cancer( first_degree_loop, second_degree_loop, genetic_mutation ){
		let is_first_degree_with_breast_before_45: boolean = false;
		let is_second_degree_with_breast_before_45: boolean = false;
		let is_first_degree_with_sarcoma_before_45: boolean = false;
		let is_second_degree_with_sarcoma_before_45: boolean = false;


		//If brca gene 
		if( genetic_mutation.indexOf( 'brca' ) > -1 ){
			console.log('Oncologist');
			this.answer_array.push('ONCOLOGIST');
		}

		if( first_degree_loop || second_degree_loop ){

			if( first_degree_loop.length > 0 ){
				for( var i = 0; i < first_degree_loop.length; i++){
					//If 1st relative with breast < 45
					if( first_degree_loop[i]['Whatsortofcancerwasit?'] == 'breast'){
						if( first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' ){
							is_first_degree_with_breast_before_45 = true;
						}
					}
					//If 1st relative with sarcoma < 45
					if( first_degree_loop[i]['Whatsortofcancerwasit?'] == 'sarcoma'){
						if( first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' ){
							is_first_degree_with_sarcoma_before_45 = true;
						}
					}
				}
			}else if( second_degree_loop.length > 0 ){
				for( var i = 0; i < second_degree_loop.length; i++){
					//If 2nd relative with breast < 45
					if( second_degree_loop[i]['Whatsortofcancerwasit?'] == 'breast'){
						if( second_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || second_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' ){
							is_second_degree_with_breast_before_45 = true;
						}
					}
					//If 2nd relative with sarcoma < 45
					if( second_degree_loop[i]['Whatsortofcancerwasit?'] == 'sarcoma'){
						if( second_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || second_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' ){
							is_second_degree_with_sarcoma_before_45 = true;
						}
					}
				}
			}

		}

		//If 1st relative or 2nd relative with breast <45 and 1st relative or 2nd relative with sarcoma <45
		if( (is_first_degree_with_breast_before_45 || is_second_degree_with_breast_before_45) && (is_first_degree_with_sarcoma_before_45 || is_second_degree_with_sarcoma_before_45) ){
			console.log('Oncologist');
			this.answer_array.push('ONCOLOGIST');
		}
	}

	analyze_cervical_cancer( what_sex, how_old, type_of_cancer ){
		// If women
		if( what_sex == 'female'){
			// If > 70
			if( how_old == '70 - 75' || how_old == '> 75' ){
				console.log('PAP test');
				this.answer_array.push('PAP2');

			}	
			// If a previous in cervical
			if( type_of_cancer == 'cervical' ){
				console.log('Seek specialist');
				this.answer_array.push('SEEK_EXPERT');
			}
		}
	}

	analyze_colorectal( how_old, type_of_cancer, first_degree_loop, genetic_mutation ){
		let is_first_degree_with_colorectal_before_55: any = false;
		let is_first_degree_with_colorectal_before_50: boolean = false;
		let is_more_than_one_first_degree_with_colorectal: boolean = false;
		
		//If >50 or <75
		if( how_old == '50 - 55' || how_old == '55 - 70' || how_old == '70 - 75' ){
			console.log( 'FOBT' );
			this.answer_array.push('FOBT');
		}

		if( first_degree_loop.length > 0 ){
			for( var i = 0; i < first_degree_loop.length; i++){
				if( first_degree_loop[i]['Whatsortofcancerwasit?'] == 'colorectal' ){
					if( first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '45 - 50' ){
						is_first_degree_with_colorectal_before_50 = true;
					}
					if( first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '< 40' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '40 - 45' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '45 - 50' || first_degree_loop[i]['Howoldweretheywhendiagnosed?'] == '50 - 55' ){
						is_first_degree_with_colorectal_before_55 = true;
					}
					if( first_degree_loop[i]['Howmanyotherseconddegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] == '2x' || first_degree_loop[i]['Howmanyotherseconddegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] == '> 2' ){
						is_more_than_one_first_degree_with_colorectal = true;
					}
				}
			}
		}

		//If 1st relative with colorectal <55 or >1 1st degree 
		if( is_first_degree_with_colorectal_before_55 == true || is_more_than_one_first_degree_with_colorectal == true ){
			console.log( 'Coloscopy5' );
			this.answer_array.push('COLOSCOPY5');
		}

		//If >1 1st relative with colorectal <50
		if( is_more_than_one_first_degree_with_colorectal == true && is_first_degree_with_colorectal_before_50 == true ){
			console.log( 'Coloscopy1' );
			this.answer_array.push('COLOSCOPY1');
		} 

		// If lynchsyndrome or fap
		if( genetic_mutation.indexOf( 'lynch syndrome' ) > -1 || genetic_mutation.indexOf( 'fap' ) > -1 ){
			console.log( 'Coloscopy1' );
			this.answer_array.push('COLOSCOPY1');
		}

		if( type_of_cancer == 'colorectal'){
			console.log( 'Coloscopy1' );
			this.answer_array.push('COLOSCOPY1');
		}
	}

	analyze_skin( type_of_cancer, genetic_mutation, first_degree_loop ){
		let is_first_degree_with_melanoma: boolean = false;

		//If 1rs relative with melanoma1
		if( first_degree_loop.length > 0 ){
			for( var i = 0; i < first_degree_loop.length; i++){
				if( first_degree_loop[i]['Whatsortofcancerwasit?'] == 'melanoma' ){
					is_first_degree_with_melanoma = true;
				}
			}
		}
		if( is_first_degree_with_melanoma === true ){
			console.log( 'Exam24' );
			this.answer_array.push('EXAM24');
		}

		//If Non melanome and fair skin
		if( genetic_mutation.indexOf( 'fair skin' ) > -1 && type_of_cancer == 'non melanomatous'){
			console.log( 'Exam24' );
			this.answer_array.push('EXAM24');
		}

		//If melanoma1 or 
		if(  type_of_cancer == 'melanoma1' ){
			console.log( 'Exam6' );
			this.answer_array.push('EXAM6');
		}
	}

	compile_answers(){
		console.log( this.answer_array );
	}
}