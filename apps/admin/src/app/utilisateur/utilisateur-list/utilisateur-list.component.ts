import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur, UtilisateurService } from '@bluebits/utilisateur';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styles: [
  ]
})
export class UtilisateurListComponent implements OnInit {
 utilisateurs : Utilisateur[] = []
 
  constructor(private utilisateurService: UtilisateurService, 
    private messageService: MessageService, 
    private location : Location, 
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getUtilisateur();
   
  }
  deleteUtilisateur(utilisateurId: string){
    
    this.confirmationService.confirm({
      message: 'êtes-vous sûr de supprimer cet utilisateur ?',
      header: 'Supprimer Utilisateur',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe(()=>{
          this._getUtilisateur();
          this.messageService.add({
            severity:'success',
           summary:'Success', 
           detail:'Utilisateur Supprimée'});
         
         }
        ,
        (error) => {
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Utilisateur n est pas supprimé'
          });
        }
        )      
      }
      
      
  });
  
 
  }
  
  

  EditUtilisateur(utilisateurId:string) {
    
     this.router.navigateByUrl(`/utilisateur/form/${utilisateurId}`)  
     }

  private _getUtilisateur(){
    this.utilisateurService.getUtilisateur().subscribe((ut)=>{
      this.utilisateurs=ut;
    })
  }

}
