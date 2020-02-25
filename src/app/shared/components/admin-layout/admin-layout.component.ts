import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {menuButtonAnimation, sideMenuAnimation} from '../../../app.animations';
import {AuthService} from '../../servises/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less'],
  animations: [sideMenuAnimation, menuButtonAnimation],
})
export class AdminLayoutComponent implements OnInit {

  visible = false;
  slide = false;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
