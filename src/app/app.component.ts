import { Component } from '@angular/core';
// my-service.service.ts hoặc my-component.component.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { response } from 'express';
import { MyService } from './Service/my-services.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  title = 'PerfumeWebsite';
  login: boolean = false;
  type: number = 1;
  
  getDirect(value:number) {
    this.type = value;
  }
}
