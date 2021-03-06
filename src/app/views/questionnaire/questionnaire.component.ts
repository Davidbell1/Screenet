import { ElementRef, Component, OnInit } from '@angular/core';
import { INTRODUCTION_QUESTIONS, WOMEN_TYPE_OF_CANCER, MAN_TYPE_OF_CANCER, INTRODUCTION_FIST_DEGREE_LOOP, FIST_DEGREE_LOOP, INTRODUCTION_SECOND_DEGREE_LOOP, SECOND_DEGREE_LOOP, CLOSURE_QUESTION } from '../../../assets/json/questions';
import { Router } from '@angular/router';

import { QuestionsService } from '../../services/questions/questions.service';

@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.scss'],
})

export class QuestionnaireComponent implements OnInit {
	id: number = 0;
	question_id: string = 'question_0';
	questions: any = INTRODUCTION_QUESTIONS;
	women_type_of_cancer: any = WOMEN_TYPE_OF_CANCER;
	man_type_of_cancer: any = MAN_TYPE_OF_CANCER;
	introduction_first_degree_loop: any = INTRODUCTION_FIST_DEGREE_LOOP;
	first_degree_loop: any = FIST_DEGREE_LOOP;
	introduction_second_degree_loop: any = INTRODUCTION_SECOND_DEGREE_LOOP;
	second_degree_loop: any = SECOND_DEGREE_LOOP;
	closure_question: any = CLOSURE_QUESTION;
	question_history: any = [0];

	constructor( private element: ElementRef, private router: Router, private questions_service: QuestionsService ){}
	ngOnInit() { this.element.nativeElement.scrollIntoView(); }

	is_it_in_the_array( array, element ){
		for( var i=0; i < array.length; i++ ) {
			if(element == array[i]){ return true; }
		}
		return false; 
	}

	save_answer( question_id, answer ){
		if( this.questions[question_id].id == 'Areyouawareofanygeneticmutationsinyouorinyourfamily?'){
			if( !this.questions[question_id].result ){
				this.questions[question_id].result = [];
			}
			if( !this.is_it_in_the_array( this.questions[question_id].result, answer ) ){
				this.questions[question_id].result.push( answer );
			}else{
				let index = this.questions[question_id].result.indexOf(answer);
				if ( index > -1) {
					this.questions[question_id].result.splice(index, 1);
				}
			}
		}else{
			this.questions[question_id].result = answer;
		}
	}

	questionnaire_builder(){
		switch( this.questions[this.question_id].id ){
			case 'Whatsexareyou?':
				if( this.questions[this.question_id].result == 'male1' ){
					this.questions['question_'+(this.id+1)] = this.man_type_of_cancer[0];
				}else{
					this.questions['question_'+(this.id+1)] = this.women_type_of_cancer[0];
				}
				break;
			case 'Haveyoueverhadanyofthefollowingbefore?':
			case  'Haveyoueverhadanyofthefollowingbefore?1':
				this.questions['question_'+(this.id+1)] = this.introduction_first_degree_loop[0];
				break;
			case 'Haveanyfirstdegreerelativeshadcancer?':
				if( this.questions[this.question_id].result == 'yes' ){
					let duplicate_obj = JSON.parse(JSON.stringify(this.first_degree_loop));
					for( var i=0; i<duplicate_obj.length; i++ ){
						duplicate_obj[i].result = '';
						this.questions['question_'+(this.id+(i+1))] = duplicate_obj[i];
					}
				}else{
					this.questions['question_'+(this.id+1)] = this.introduction_second_degree_loop[0];
				}
				break;
			case 'Haveanyfirstdegreerelativeshadadifferentcancer?':
				if( this.questions[this.question_id].result == 'yes' ){
					let duplicate_obj = JSON.parse(JSON.stringify(this.first_degree_loop));
					for( var i=0; i<duplicate_obj.length; i++ ){
						duplicate_obj[i].result = '';
						this.questions['question_'+(this.id+(i+1))] = duplicate_obj[i];
					}
				}else{
					this.questions['question_'+(this.id+1)] = this.introduction_second_degree_loop[0];
				}
				break;
			case 'Haveanyseconddegreerelativeshadcancer?':
			case 'Haveanyseconddegreerelativeshadadifferentcancer?':
				if( this.questions[this.question_id].result == 'yes' ){
					let duplicate_obj = JSON.parse(JSON.stringify(this.second_degree_loop));
					for( var i=0; i<duplicate_obj.length; i++ ){
						duplicate_obj[i].result = '';
						this.questions['question_'+(this.id+(i+1))] = duplicate_obj[i];
					}
				}else{
					this.questions['question_'+(this.id+1)] = this.closure_question[0];
				}
				break;
			case 'Areyouawareofanygeneticmutationsinyouorinyourfamily?':
				break;
		}
	}

	next(){
		if( this.questions['question_'+this.id].result ){
			this.questionnaire_builder();

			var size = this.get_obj_size( this.questions );
			if( this.id < (size - 1) && this.questions['question_'+this.id].result){
				this.id = this.id + 1;
				this.question_history.push(this.id);
				this.question_id = 'question_' + this.id;
				window.scrollTo(0, 0);
			}else{
				this.questions_service.set_question( this.questions );
				this.router.navigate(['/results']);
			}
		}
	}

	back(){
		window.scrollTo(0, 0);
		if( this.question_history[this.question_history.length - 1] ){
			this.id = this.question_history[this.question_history.length - 1];
			this.question_history.splice((this.question_history.length -1), 1);
			this.questions['question_' + this.id].result = '';
		}
		this.id = this.question_history[(this.question_history.length-1)];
		this.question_id = 'question_' + this.id;
	}

	get_obj_size(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};
}
