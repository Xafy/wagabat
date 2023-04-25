import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls:["./header.component.css"],
})
export class HeaderComponent{
    @Output() destination = new EventEmitter<string>
    navigate(render : string){
        this.destination.emit(render);
    }

}