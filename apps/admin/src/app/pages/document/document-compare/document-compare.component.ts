import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumntService } from '@bluebits/utilisateur';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-document-compare',
  templateUrl: './document-compare.component.html',
  styles: [
  ]
})
export class DocumentCompareComponent implements OnInit {
  form:FormGroup;
  currentId:string;
  documents:Document[]=[];
  uploadedFiles: any[] = [];
  imageDisplay : string | ArrayBuffer;
  imageDisplay1 : string | ArrayBuffer;

  constructor(private formBuilder:FormBuilder,
    private documentService:DocumntService,
    private messageService: MessageService,
     private route : ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      doc:['', Validators.required],
      commentaire:['',Validators.required]
    });

    this.route.params.subscribe(params =>{
      if(params.id) {
        
        this.currentId=params.id;
        this.documentService.getDocumentById(params.id).subscribe(document=> {
          this.form.controls.doc.setValue(document.doc)
          this.imageDisplay1=document.doc
          

        })
      }
    })
    
  }

  onImageUpload(event){
      //console.log(event)
      const file = event.target.files[0];
      if(file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay = fileReader.result
        }
        fileReader.readAsDataURL(file);
      }
      console.log(this.imageDisplay)

  }

  // onUpload(event:any) {
  //     console.log('hi');
  //     console.log(event)
      
  //   }

  //   envoyer(){
  //     this.router.navigateByUrl("document")  

  //   }


  onSubmit(){
    console.log('hello')
  }

}
