import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';

@Injectable()
export class ProfessorService {
	
    constructor(private httpService: HttpService) { }
	
}
