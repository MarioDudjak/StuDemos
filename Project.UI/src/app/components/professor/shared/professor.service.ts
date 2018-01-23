import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

	private professorSource = new BehaviorSubject<any>("");
    currentProfessor = this.professorSource.asObservable();

    constructor(private httpService: HttpService) { }
    
    changeCourse(professor: any) {
        this.professorSource.next(professor)
      }

    async GetAllProfessors():Promise<any>{
        return await this.httpService.getAll("accounts/professors");
    }

    async deleteProfessor(professorID:string):Promise<any>{
        //return await this.httpService.delete("accounts/")
    }

    async createProfessor(professor:any):Promise<any>{
        return await this.httpService.post(professor,"accounts/create");
    }
}
