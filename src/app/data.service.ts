import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    result: any;
    title: string;
    page_url: string = '';

    constructor(private _http: HttpClient) {
    }

    getCount() {
        return this._http.get("/api/dbcount")
            .toPromise()
            .then(response => {
                this.result = response;
                return response
            })
    }

    getNews(page) {
        if (page != 1) {
            this.page_url = '?page=' + page;
        } else this.page_url = '';
        return this._http.get("/api/news" + this.page_url)
            .toPromise()
            .then(response => {
                this.result = response;
                return response
            })
    }

    getNewsFilterBy(catecgory) {
        let id_category = 'category_id=' + catecgory;
        let headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
        return this._http.post("/api/newsfilterby", id_category, headers)
            .map(result => this.result = result);
    }

    createNews(title, description, category) {
        let some = 'title=' + title + '&description=' + description + '&category=' + category;
        let headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
        return this._http.post("/api/news", some, headers)
            .map(result => {
                this.result = result;
            })
    }
}
