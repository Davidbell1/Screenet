import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GENERAL, GENERAL_MEN, GENERAL_MEN_END, GENERAL_WOMEN, GENERAL_WOMEN_END, FOBT, COLOSCOPY5, COLOSCOPY1, EXAM24, EXAM6, MAMOGRAPH1, MAMOGRAPH2, ONCOLOGIST, PAP2, SEEK_EXPERT } from '../../../assets/json/answers';

import { QuestionsService } from '../../services/questions/questions.service';
import { GoogleapiService } from '../../services/apiservices/googleapi.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss'],
})

export class ResultsComponent implements OnInit {
	lat: number = -33.852029;
	lng: number = 151.210920;
	icon_link: string = '../../assets/images/ICON_doctor.png';
	place_name: string = '';
	place_address: string = '';
	questions: any;
	unfiltered_answers: any = [];
	answer_text: any = GENERAL.text;
	nearby_places: any = [];

	constructor( private element: ElementRef, private questions_service: QuestionsService, private googleapiservice: GoogleapiService, private router: Router ){}
	ngOnInit(){
		this.element.nativeElement.scrollIntoView();
		this.get_question();	
	}

	ngAfterViewInit() {
		this.getLocation();
	}
	
	getLocation(){
        if (navigator.geolocation) {
        	var self = this;
            navigator.geolocation.getCurrentPosition(function(response){
                self.init_map(response);
            }, function() {
            	alert("Unable to get GPS Location");
            }, {
            	enableHighAccuracy : true
            });
        }
        else {
        	alert("Geolocation is not supported by this browser.");
        }
    }

	display_information(name, address){
		this.place_name = name;
		this.place_address = address;
	}
	hide_information(){
		this.place_name = '';
		this.place_address = '';
	}

	init_map(position: any){
		this.lat = position.coords.latitude;
		this.lng = position.coords.longitude;
		this.get_nerby_gp();
	}

	get_nerby_gp(){
		this.googleapiservice.placeapi( this.lat, this.lng, 1500, 'doctor' )
			.then( data => {
				this.nearby_places = data.results
			});
	}

	get_question(){
		this.questions = this.questions_service.get_question();
		if( this.questions != undefined ){
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
			second_degree_loop = [],
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
						break;
				}
			}
		}

		this.analyze_general( what_sex );
		this.analyze_breast_cancer( what_sex, how_old, first_degree_loop, second_degree_loop, genetic_mutation );
		this.analyze_cervical_cancer( what_sex, how_old, type_of_cancer );
		this.analyze_colorectal( how_old, type_of_cancer, first_degree_loop, genetic_mutation );
		this.analyze_skin( type_of_cancer, genetic_mutation, first_degree_loop );

		this.filter_answers( what_sex );
	}

	analyze_general( what_sex ){
		if( what_sex == 'female'){
			this.unfiltered_answers.push( GENERAL_WOMEN );
		}else{
			this.unfiltered_answers.push( GENERAL_MEN );
		}
	}


	convert_string_to_number( first_degree_element ){
			switch( first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] ){
				case '0':
					first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] = 0;
					break;
				case '1':
					first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] = 1;
					break;
				case '2x':
					first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] = 2;
					break;
				case '> 2':
					first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] = 3;
					break;
				case 'unknown':
					first_degree_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'] = 1;
					break;
				default:
					break;
			}

			return first_degree_element;
	}

	analyze_breast_cancer( what_sex, how_old, first_degree_loop, second_degree_loop, genetic_mutation ){
		if( what_sex == 'female' ){
			let how_many_first_degree_with_breast_before_50: number = 0;
			let how_many_first_degree_with_breast_after_50: number = 0;
			let how_many_first_degree_with_sarcoma_before_50: number = 0;
			let how_many_first_degree_with_ovarian_before_50: number = 0;



			if( first_degree_loop || second_degree_loop ){
				if( first_degree_loop.length > 0 ){
					for( let i = 0; i < first_degree_loop.length; i++){
						let converted_element = this.convert_string_to_number( first_degree_loop[i] );
						if( converted_element['Howoldweretheywhendiagnosed?'] == '< 40' || converted_element['Howoldweretheywhendiagnosed?'] == '40 - 45' || converted_element['Howoldweretheywhendiagnosed?'] == '45 - 50' ){
							if( converted_element['Whatsortofcancerwasit?'] == 'breast'){
								how_many_first_degree_with_breast_before_50 = converted_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'];
							}
							if( converted_element['Whatsortofcancerwasit?'] == 'sarcoma'){
								how_many_first_degree_with_sarcoma_before_50 = converted_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'];
							}
							if( converted_element['Whatsortofcancerwasit?'] == 'ovarian'){
								how_many_first_degree_with_ovarian_before_50 = converted_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'];
							}
						}else{
							if( converted_element['Whatsortofcancerwasit?'] == 'breast'){
								how_many_first_degree_with_breast_after_50 = converted_element['Howmanyotherfirstdegreerelativesonthesamesideofyourfamilyhadthesamecancer?'];
							}
						}
					}
				}
				// if( second_degree_loop.length > 0 ){
				// 	for( let j = 0; j < second_degree_loop.length; j++){}
				// }
			}


			//No 2nd degree loop used ?
			// MAM1 is basically every women between 50 and 74


			//If brca gene 
			if( genetic_mutation.indexOf( 'brca' ) > -1 ){
				this.unfiltered_answers.push( ONCOLOGIST );
			}else if( (how_many_first_degree_with_breast_before_50 + how_many_first_degree_with_sarcoma_before_50 + how_many_first_degree_with_ovarian_before_50 ) > 2 ){
				this.unfiltered_answers.push( ONCOLOGIST );
			}else if( how_old != '< 40' || how_old != '> 75' ){
				if( how_many_first_degree_with_breast_before_50 > 0 || ( how_many_first_degree_with_breast_before_50 + how_many_first_degree_with_breast_after_50 ) > 1 ){
					this.unfiltered_answers.push( MAMOGRAPH1 );
				}else if( how_old != '40 - 45' || how_old != '45 - 50' ){
					this.unfiltered_answers.push( MAMOGRAPH2 );
				}
			}
		}
	}

	analyze_cervical_cancer( what_sex, how_old, type_of_cancer ){
		// If women
		if( what_sex == 'female' ){
			// If > 70
			if( how_old != '70 - 75' || how_old != '> 75' ){
				this.unfiltered_answers.push( PAP2 );
			}	
			// If a previous in cervical
			if( type_of_cancer == 'cervical' ){
				this.unfiltered_answers.push( SEEK_EXPERT );
			}
		}
	}

	analyze_colorectal( how_old, type_of_cancer, first_degree_loop, genetic_mutation ){
		let is_first_degree_with_colorectal_before_55: any = false;
		let is_first_degree_with_colorectal_before_50: boolean = false;
		let is_more_than_one_first_degree_with_colorectal: boolean = false;
		
		//If >50 or <75
		if( how_old == '50 - 55' || how_old == '55 - 70' || how_old == '70 - 75' ){
			this.unfiltered_answers.push( FOBT );
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
			this.unfiltered_answers.push( COLOSCOPY5 );
		}

		//If >1 1st relative with colorectal <50
		if( is_more_than_one_first_degree_with_colorectal == true && is_first_degree_with_colorectal_before_50 == true ){
			this.unfiltered_answers.push( COLOSCOPY1 );
		} 

		// If lynchsyndrome or fap
		if( genetic_mutation.indexOf( 'lynch syndrome' ) > -1 || genetic_mutation.indexOf( 'fap' ) > -1 ){
			this.unfiltered_answers.push( COLOSCOPY1 );
		}

		if( type_of_cancer == 'colorectal'){
			this.unfiltered_answers.push( COLOSCOPY1 );
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
			this.unfiltered_answers.push( EXAM24 );
		}

		//If Non melanome and fair skin
		if( genetic_mutation.indexOf( 'fair skin' ) > -1 && type_of_cancer == 'non melanomatous'){
			this.unfiltered_answers.push( EXAM24 );
		}

		//If melanoma1 or 
		if(  type_of_cancer == 'melanoma1' ){
			this.unfiltered_answers.push( EXAM6 );
		}
	}

	check_duplicate( array, value ){
		if(value != 'general'){
			let array_of_value = array.map(function(item){ return item.category });	
			let is_duplicate = array_of_value.some(function(item, index){
				return array_of_value.indexOf(item) != index;
			});
	
			if( is_duplicate == false ){
				return is_duplicate ;
			}else{
				let is_value_equal = false;

				for( let j = 0; j < array.length; j++ ){
					if( array[j].category == value ){
						is_value_equal = array[j].order;
					}
				}

				return is_value_equal;
			}
		}else{
			return false;
		}
	}

	filter_answers( what_sex ){
		// filter duplicate
		let filtered_answers = [];
		for( var i = 0; i < this.unfiltered_answers.length; i++ ){
			let is_duplicate = this.check_duplicate( filtered_answers, this.unfiltered_answers[i].category );

			if( typeof(is_duplicate) === "boolean" ){
				filtered_answers.push( this.unfiltered_answers[i] );
			}else{
				if( is_duplicate > this.unfiltered_answers[i].order ){
					filtered_answers.push( this.unfiltered_answers[i] );
				}
			}
		}

		this.compile_answers( what_sex, filtered_answers );
	}


	sort_the_answers( filtered_array ): Promise<any>{
		return new Promise(resolve => {
			if( filtered_array.indexOf( 'GENERAL_MEN' ) != -1 ){
				filtered_array.splice( filtered_array.indexOf( 'GENERAL_MEN' ), 1);
				filtered_array.splice( filtered_array.indexOf( 'GENERAL_MEN_END' ), 1);
				if( filtered_array.length == 0 ){
					filtered_array.push('NONE');
				}
				filtered_array.splice( 0, 0, 'GENERAL_MEN' );
				filtered_array.splice( filtered_array.length, 0, 'GENERAL_MEN_END' );
			}else{
				filtered_array.splice( filtered_array.indexOf( 'GENERAL_WOMEN' ), 1 );
				filtered_array.splice( filtered_array.indexOf( 'GENERAL_WOMEN_END' ), 1 );
				if( filtered_array.length == 0 ){
					filtered_array.push('NONE');
				}
				filtered_array.splice( 0, 0, 'GENERAL_WOMEN' );
				filtered_array.splice( filtered_array.length, 0, 'GENERAL_WOMEN_END' );
			}
			resolve( filtered_array );
		});
	}


	compile_answers( what_sex, filtered_array ){
		// this.sort_the_answers( filtered_array ).then(sorted_answer => {
			console.log(filtered_array);
			let results = [];
			for (var i = 0; i < filtered_array.length; i++) {
				console.log(this.answer_text);
				this.answer_text += filtered_array[i].text;
			}

			if( what_sex == 'female' ){
				this.answer_text += GENERAL_WOMEN_END.text;
			}else{
				this.answer_text += GENERAL_MEN_END.text;
			}
		// });
	}
}