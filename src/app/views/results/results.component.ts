import { ElementRef, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
	lat: number = -33.852029;
	lng: number = 151.210920;

	constructor( private element: ElementRef ){}
	ngOnInit(){
		this.element.nativeElement.scrollIntoView();

		this.get_local_storage('questions')
			.then(questions => {
				if(questions = null){
					alert('You need to fill the questionnaire before accessing this page.');
				}else{
					this.analyze_questionnaire( questions );
				}
			});
	}

	get_local_storage( key ): any{
		return Promise.resolve().then(function () {
			return localStorage.getItem(key);
		});
	}

	analyze_questionnaire( questions ){

	}

}
