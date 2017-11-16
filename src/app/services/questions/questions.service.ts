import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QuestionsService {
  // public question: any;
  public question: any;

  constructor(){}

	set_question( questions ): void {
		this.question = questions;
	};

	get_question() {
		return this.question;
		
	};

}