import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  render = "recipes";

  onNavigate(destination : string){
    this.render = destination
  }

  ngOnInit(): void {
      
  }
}
