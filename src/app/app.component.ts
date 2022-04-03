import { Component } from '@angular/core';
import { FormControl ,FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams}  from "@angular/common/http";

@Component
({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  
export class AppComponent 
{
    phoneno:any;
    otpget:any
    otpGet: boolean | undefined;
    otpSession: any;

    userform = new  FormGroup
    ({
        city : new FormControl('',[Validators.required]),
        pannumber : new FormControl('',[Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}"),Validators.maxLength(10)]),
        fullname : new FormControl('',[Validators.required,Validators.maxLength(140)]),
        email : new FormControl('',[Validators.required,Validators.email ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        mobileno : new FormControl('',[Validators.required ,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
    

    // submit()
    // {
    //     console.warn(this.userform.value)
    // }

    

    get f()
    {
        return this.userform.controls
    }

        httpOptions: any =
        {
            headers: new HttpHeaders({
        
            'Content-Type': 'application/json',
            }),
            params: new HttpParams(),
        };

        constructor(private http:HttpClient){}
   
    getotp()
    {
        console.log("phone no", this.phoneno);

        if (typeof this.phoneno == 'string' && this.phoneno.length == 10)
        {
            let url ='http://apps.thinkoverit.com/api/getOTP.php';
           
            this.http.get(url)
            .subscribe((res:any) =>
            {
                console.log("get res", res)
                if(res.Status == "Success")
                {
                    this.otpGet = true;
                    this.otpSession = res
                }
        })
    }  
    
    }
    
}


