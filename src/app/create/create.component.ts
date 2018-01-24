import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service'
import {Router} from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
    id: string = '';
    title: string = '';
    category: string = '1';
    description: string = '';
    detail_data: any;

    constructor(public router: Router, public _dataService: DataService) {
    }

    ngOnInit() {
    }

    createNews(title, description, category) {
        this._dataService.createNews(title, description, category)
            .subscribe(data => {
                this.detail_data = data;
                this.router.navigate(['/']);
            })
    }

}
