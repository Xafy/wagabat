import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls:["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated: boolean = false;
    userSubscription!: Subscription;
    
    constructor(private dataStorageService : DataStorageService, private authService: AuthService){}

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSave(){
        this.dataStorageService.storeRecipes()
    }

    onFetch(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}