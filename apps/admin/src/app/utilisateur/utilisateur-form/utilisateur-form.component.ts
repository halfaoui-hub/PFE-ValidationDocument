import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur, UtilisateurService } from '@bluebits/utilisateur';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styles: [
  ]
})
export class UtilisateurFormComponent implements OnInit {

 form?: FormGroup;
 isSubmitted? :boolean = false;
 editmode? = false;
 currentId:string;

  constructor(private formBuilder:FormBuilder,
    private messageService: MessageService ,
    private utilisateurService:UtilisateurService , 
    private location: Location,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      cin:['', Validators.required],
      numeroTel:['',Validators.required],
      gender:['',Validators.required],
      password:['',Validators.required],
      isAdmin:[''],
      isSuperviseur:[''],
      filiere:['']
    });

    this._checkEditmode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const utilisateur: Utilisateur = {
      id:this.currentId,
      name:this.form.controls.name.value,
      prenom:this.form.controls.prenom.value,
      email:this.form.controls.email.value,
      cin:this.form.controls.cin.value,
      numeroTel:this.form.controls.numeroTel.value,
      gender:this.form.controls.gender.value,
      password:this.form.controls.password.value
    };
    if(this.editmode) {
      this._modifierUtilisateur(utilisateur)
    }else {
      this._ajouterUtilisateur(utilisateur)
    }
   
    
  }


  private _ajouterUtilisateur(utilisateur:Utilisateur){
    this.utilisateurService.crateUtilisateur(utilisateur).subscribe((response) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Utilisateur Ajoutée'});
      timer(2000)
      .toPromise()
      .then((done)=>{
        this.location.back();
      })
    },
    (error) => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Utilisateur nest pas crée'
      });
    });
  }
 
  private _modifierUtilisateur(utilisateur:Utilisateur){
    this.utilisateurService.modifierUtilisateur(utilisateur).subscribe((response) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Utilisateur modifiée'});
      timer(2000)
      .toPromise()
      .then((done)=>{
        this.location.back();
      })
    },
    (error) => {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Utilisateur nest pas modifiée'
      });
    });
  }


  private _checkEditmode(){
    this.route.params.subscribe(params =>{
      if(params.id) {
        this.editmode = true;
        this.currentId=params.id;
        this.utilisateurService.getUtilisateurById(params.id).subscribe(utilisateur=> {
          this.form.controls.name.setValue(utilisateur.name)
          this.form.controls.prenom.setValue(utilisateur.prenom)
          this.form.controls.email.setValue(utilisateur.email)
          this.form.controls.cin.setValue(utilisateur.cin)
          this.form.controls.numeroTel.setValue(utilisateur.numeroTel)
          this.form.controls.gender.setValue(utilisateur.gender)
          this.form.controls.password.setValue(utilisateur.password)

        })
      }
    })
  }

}
