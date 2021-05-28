import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  test = "How r u?";
  recurosBaseURL: string = 'https://email-sender-2021.herokuapp.com/';

  constructor(private http: HttpClient) { }


  httpGet(url) {
    return this.http.get(this.recurosBaseURL);
  }

  httpPost(url, {}) {
    return this.http.post(this.recurosBaseURL, { name: "Subrat" });
  }

  sendEmail(data) {
    return this.http.post(this.recurosBaseURL + 'sendmail', data);
  }
}
