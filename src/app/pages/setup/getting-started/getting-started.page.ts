import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss'],
})
export class GettingStartedPage implements OnInit {

  constructor(private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
  }

}
