import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service'

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    id: string;
    description: string;
    title: string;
    category = [{key: '1', value: 'Health'}, {key: '2', value: 'Life'}, {key: '3', value: 'Food'}];
    category_title: string;
    news_id: string;

    constructor(private route: ActivatedRoute, public _dataService: DataService) {
        this.route.params.subscribe(params => {
            this.news_id = params['id'];
        });
        for (let i = 0; i < this._dataService.result.length; i++) {
            if (this._dataService.result[i]._id == this.news_id) {
                this.id = this._dataService.result[i]._id;
                this.title = this._dataService.result[i].title;
                this.description = this._dataService.result[i].description;
                for (let y = 0; y < this.category.length; y++) {
                    if (this.category[y].key == this._dataService.result[i].category) {
                        this.category_title = this.category[y].value;
                    }

                }
            }
        }
    }

    ngOnInit() {
    }

}
