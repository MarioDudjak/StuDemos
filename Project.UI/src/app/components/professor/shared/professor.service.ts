import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';

@Injectable()
export class ProfessorService {
	
    constructor(private httpService: HttpService) { }
    
    async GetAllProfessors():Promise<any>{
        return await this.httpService.getAll("accounts/professors");
    }
}
