import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    news: any;
    result = {data: []};
    isActive: { [index: string]: boolean } = {};
    isActivePage: { [index: string]: boolean } = {};
    pages = [];
    page: string = '1';
    page_count: any;
    filter: string;

    constructor(private _dataService: DataService) {
        this.isActive['1'] = false;
        this.isActive['2'] = false;
        this.isActive['3'] = false;
        if (localStorage.length != 0) {
            if (typeof localStorage.getItem('page') != 'undefined') {
                this.page = localStorage.getItem('page');

                this._dataService.getNews(this.page)

                    .then(res => {
                        this.news = res;

                    });
                this.isActivePage[this.page] = true;

            }
            if (typeof localStorage.getItem('filter') != 'undefined') {
                this.filter = localStorage.getItem('filter');
                this.FilterBy(this.filter);
                for (let key in this.isActive) {
                    this.isActive[key] = false;
                    this.isActive[this.filter] = true;
                }
            }
        } else {
            this._dataService.getCount()
                .then(res => {
                    this.page_count = res;
                    let count_page = Math.round(this.page_count / 5);
                    for (let i = 0; i < count_page; i++) {
                        this.pages.push(i + 1);
                        this.isActivePage[i + 1] = false;
                        this.isActivePage['1'] = true;
                    }
                })

            this._dataService.getNews(this.page)

                .then(res => {
                    this.news = res;

                })
        }
    }

    ngOnInit() {
    }

    FilterBy(value: string) {
        localStorage.setItem('filter', value);
        for (let key in this.isActive) {
            this.isActive[key] = false;
            this.isActive[value] = true;
        }
        this._dataService.getNewsFilterBy(value)
            .toPromise()
            .then(res => {
                this.news = res;
            })
    }

    NextPage(page) {
        localStorage.setItem('page', page);
        this._dataService.getNews(page)

            .then(res => {
                this.news = res;
            })
        for (let i = 0; i < this.pages.length; i++) {
            this.isActivePage[i + 1] = false;
            this.isActivePage[page] = true;
        }
    }

}
