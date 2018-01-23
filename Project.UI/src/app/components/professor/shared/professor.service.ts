import { Injectable } from "@angular/core";
import { Professor } from "./professor.model";
import { HttpService } from '../../../shared/';

@Injectable()
export class ProfessorService {
	
    constructor(private httpService: HttpService) { }

    //Get demonstrators and courses
    public async getDemoCourses() : Promise<Object> {
        return [{"courseName":"Baze podataka","courseId":"id kolegija","students":["Marija","Lucija","Ana"]},
        {"courseName":"Programiranje I","courseId":"id kolegija","students":["Lovro","Duje","Roko"]}];
    }
	
}
