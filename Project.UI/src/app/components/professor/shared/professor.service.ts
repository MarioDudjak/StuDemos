import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

	private professorSource = new BehaviorSubject<any>("");
    currentProfessor = this.professorSource.asObservable();

    constructor(private httpService: HttpService) { }

    //Get demonstrators and courses
    public async getDemoCourses() : Promise<Object> {
        return [{"courseName":"Baze podataka","courseId":"id kolegija","students":["Marija","Lucija","Ana"]},
        {"courseName":"Programiranje I","courseId":"id kolegija","students":["Lovro","Duje","Roko"]}];
    }
    
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
