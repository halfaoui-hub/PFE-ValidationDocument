import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/utilisateur';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  logoutUtilisateur(){
   this.authService.logout();
  }

  ngOnInit(): void {
  }


}
