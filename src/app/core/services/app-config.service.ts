import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAppConfig } from '../models/app-config.model';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
    static settings: IAppConfig;
    
    private http: HttpClient;

    constructor(private httpBackEnd: HttpBackend) {
        this.http = new HttpClient(httpBackEnd);
    }

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfigService.settings = response;
                resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
