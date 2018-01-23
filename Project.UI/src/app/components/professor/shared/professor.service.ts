import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {CourseService} from '../../course/shared';

@Injectable()
export class ProfessorService {

	private professorSource = new BehaviorSubject<any>("");
    currentProfessor = this.professorSource.asObservable();

    constructor(private httpService: HttpService,
    private courseService:CourseService) { }
    
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

    async getDemonstrators():Promise<any>{ 
        let profId = localStorage.getItem('userId');
        let courses = await this.courseService.getAllCourses();
        var response = new Array({});
        courses.forEach(element => {
            if(element["professors"]){
            if(element["professors"].includes(profId)){
                if(element["studentsNames"]){
                    let courseCode=element["courseCode"];
                    let professorNames = element["studentsNames"].split(",");  
                    var students={
                        courseCode:professorNames
                    };
                    response.push(students);
                }
            }
            }
    
        });
        return response;
    }
}
