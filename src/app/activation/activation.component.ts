import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivationService } from '../activation.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public loginUrl: String = environment.frontUrl + "/login";
  private subscription: Subscription;
  public activationCode: String = "";
  public activationSuccess: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
              private activationService: ActivationService) {
    this.subscription = activateRoute.params.subscribe(data => this.activationCode = data['activationCode']);
  }

  ngOnInit(): void {
    this.activation();
  }

  public activation(): void {
    this.activationService.activation(this.activationCode)
    .subscribe((data: String) => this.activationSuccess = true)
  }

  

}
