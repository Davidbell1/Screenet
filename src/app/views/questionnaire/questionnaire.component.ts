import { ElementRef, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.scss']
})

export class QuestionnaireComponent implements OnInit {
	constructor(private element: ElementRef){}

	ngOnInit() {
		this.element.nativeElement.scrollIntoView();

	}
}
