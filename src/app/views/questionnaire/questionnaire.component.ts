import { ElementRef, Component, OnInit } from '@angular/core';
import {QUESTIONS} from '../../../assets/json/questions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
	questions: any = QUESTIONS;
	results: any = {};
	question_id: number = 0;

  constructor(private element: ElementRef, private router: Router) { }

  ngOnInit() {
  	this.element.nativeElement.scrollIntoView();
  	console.log(this.questions);

  }
save_answers( id, value){
	this.results[id]=value;
	console.log(this.results);
}
next(){
	if(this.question_id < (this.questions.length-1)){
		window.scrollTo(0, 0);
		this.question_id= this.question_id +1;
		console.log(this.question_id);
	} else{
		// this.router.navigate(["/results"], {"result": this.results});
	}
}
back(){
window.scrollTo(0, 0);
this.question_id= this.question_id -1;
console.log(this.question_id);
}
}
