import { NgModule } from "@angular/core";
import { DataStorageService } from "./shared/data.storage.service";
import { UserService } from "./auth/user.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
 


@NgModule({
    providers: [
        // DataStorageService, UserService, 
        // {provide: HTTP_INTERCEPTORS, 
        //     useClass: AuthInterceptorService, multi: true
        // }
    ]
})

export class CoreModule {}