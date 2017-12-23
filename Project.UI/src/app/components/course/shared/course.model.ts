export class Course {
    public id:number;
    public name:string;
    public programme:string;

    constructor(id:number,name:string,programme:string){
        this.id=id;
        this.name=name;
        this.programme=programme;
    }
}