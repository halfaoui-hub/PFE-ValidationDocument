import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document, DocumntService } from '@bluebits/utilisateur';
@Component({
  selector: 'admin-document-list',
  templateUrl: './document-list.component.html',
  styles: [
  ]
})
export class DocumentListComponent implements OnInit {

 documents:Document[] = [];
 imageDisplay1 : string | ArrayBuffer;
 
  constructor( private documentService: DocumntService, private router:Router) { }

  ngOnInit(): void {
    this._getDocument();
  }

  porterDocument(documentsId:string, event){
    this.router.navigateByUrl(`/document/compare/${documentsId}`)

    
      //console.log(event)
      const file = event.target.files[0];
      if(file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay1 = fileReader.result
        }
        fileReader.readAsDataURL(file);
      }
      console.log(this.imageDisplay1)

  }
  

  private _getDocument(){
    this.documentService.getDocument().subscribe((docm)=>{
      this.documents=docm;
    })
  }

}
