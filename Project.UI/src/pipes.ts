import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {

        let textArr = term;
        if(term != undefined) {
    //console.log('term', term);
            if(term.indexOf('|') !== -1)  {
                textArr = term.split('|');

    //console.log("Postoji");
//console.log("if");             
                let a = term 
                    ? items.filter(item => textArr.indexOf(item.name) === -1)
                    : items;
                //ChangeDetectorRef.apply(this.transform);
                return a;
            }else {
//console.log("else");
    //console.log("NEPostoji");
    //console.log(term?items.filter(item => item.name.indexOf(term) === -1):items);
                let b = term 
                    ? items.filter(item => item.name.indexOf(term) === -1)
                    : items;
                //ChangeDetectorRef.apply(this.transform);
                return b;
            }
        }
    }
}
