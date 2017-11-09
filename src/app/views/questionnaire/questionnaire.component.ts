import { ElementRef, Component, OnInit } from '@angular/core';
import {QUESTIONS} from '../../../assets/json/questions';
import {Router} from '@angular/router';

@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.scss']
})

export class QuestionnaireComponent implements OnInit {
	question_id: number = 0;
	questions: any = QUESTIONS;
	results: any = {};

	constructor(private element: ElementRef){}

	ngOnInit() {
		this.element.nativeElement.scrollIntoView();
	}

	save_answer( question_id, answer ){
		this.results[question_id] = answer;

		console.log( this. results );
	}

	next(){
		if( this.questions[ this.question_id ].id && this.question_id < (this.questions.length - 1) ){
			window.scrollTo(0, 0);
			this.question_id = this.question_id + 1;
		}
	}

	back(){
		window.scrollTo(0, 0);
		this.question_id = this.question_id - 1;
	}
}
