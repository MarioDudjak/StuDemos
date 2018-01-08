import {Component} from '@angular/core';

@Component({
    selector : 'student-sidebar',
    templateUrl: './student-sidebar.component.html',
    styleUrls: ['./student-sidebar.component.less'],
})

export class StudentSidebarComponent{

    constructor(){
        
    }

    private setActiveClass(id:string) {
        if (document.getElementsByClassName("active")[0] !== undefined) {
        document.getElementsByClassName("active")[0].classList.remove("active");
        }
        document.getElementById(id).classList.add("active");
    }

    private returnNormalSchedule() {
        let displayNormal:NodeListOf<Element> = document.querySelectorAll(".element-display-none");
        [].forEach.call(displayNormal, function(dn) {
            dn.classList.remove("element-display-none");
        });
    }

    private normalSchedule(id:string) {
        this.setActiveClass(id);
        this.returnNormalSchedule();
    }

    private mySchedule(id:string) {
        this.setActiveClass(id);
        this.returnNormalSchedule();
        let myCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-demo-available, .schedule-demo-my, .schedule-demo-chosen");
        [].forEach.call(myCourses, function(dc) {
            dc.parentElement.classList.add("element-display-none");
        });
    }

    private demoSchedule(id:string) {
        this.setActiveClass(id);
        this.returnNormalSchedule();
        let demoCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
        [].forEach.call(demoCourses, function(dc) {
            if(dc.classList.length === 1) {
            dc.parentElement.classList.add("element-display-none");
            }
        });
    }

    private chosenDemo(id:string) {
        this.setActiveClass(id);
        this.returnNormalSchedule();
        let selectedCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
        [].forEach.call(selectedCourses, function(sc) {
            if(!sc.classList.contains('schedule-demo-my')) {
            sc.parentElement.classList.add("element-display-none");
            }
        });
    }

    private availableDemo(id:string) {
        this.setActiveClass(id);
        this.returnNormalSchedule();
        let availableCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
        [].forEach.call(availableCourses, function(ac) {
            if(!ac.classList.contains('schedule-demo-available')) {
            ac.parentElement.classList.add("element-display-none");
            }
        });
    }

}