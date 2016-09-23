import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/rx';

@Injectable()
export class ConfigService {
  private _baseServiceUrlSubject = new BehaviorSubject('http://demoquizapi.azurewebsites.net/api');

  constructor() {
    console.log('created new config service');
  }

  get baseUrl(): Observable<string> {
    return this._baseServiceUrlSubject;
  }

  setBaseUrl(url: string) {
    this._baseServiceUrlSubject.next(url);
    console.log('updated base url: ' + url);
  }

  get urlForAvailableQuizes(): Observable<string> {
    return this._baseServiceUrlSubject.map(u => u + '/Quizes');
  }

  get urlForQuizAttempts(): Observable<(quizid: string) => string> {
      return this._baseServiceUrlSubject.map(u =>
        function(quizid: string) {
          return u + `/Quizes/${quizid}/Attempts`;
        } );
  }

  get urlForScoring(): Observable<(quizid: string, attemptid: string) => string> {
    return this._baseServiceUrlSubject.map(u =>
      function(quizid: string, attemptid: string) {
        return u + `/Quizes/${quizid}/Attempts/${attemptid}/Score`;
      }
    );
  }
}