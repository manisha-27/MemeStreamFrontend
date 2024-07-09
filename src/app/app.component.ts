import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MemedataService } from './memedata.service';
import { MemeRestAPI } from './memerest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memestream';
  somedata: string="";
  memeList: any[] | undefined;
  meme : MemeRestAPI=new MemeRestAPI();  
  memeId: number | undefined;

  constructor(private memeservice: MemedataService){}

  ngOnInit(): void{
    this.loadmeme();
  }
  
  loadmeme(){
    return this.memeservice.GetMemeAPI().subscribe((data: any)=>{
      this.memeList=data;
    })
  }

  // searchMeme(){
  //   const searchvalue=document.getElementById("search-meme") as HTMLInputElement;
  //   return this.memeservice.GetBySearch(searchvalue.value).subscribe((data: any)=>{
  //     this.memeList=data;
  //     console.log("Clicked"+ searchvalue);
  //     console.log(data);
  //     console.log("===========");
  //   })
  // }

  deleteMeme(id: string) {
    console.log("Deleted");
    this.memeservice.DeleteMeme(id).subscribe();
    // location.reload();
  }

  submitMeme(){
    console.log("Submitted");
    const nameInput = document.getElementById("user-name") as HTMLInputElement;
    const captionInput = document.getElementById("meme-caption") as HTMLInputElement;
    const urlInput = document.getElementById("meme-url") as HTMLInputElement;
    const body = {
      name: nameInput.value,
      caption: captionInput.value,
      url: urlInput.value
    };
    this.memeservice.postMeme(body).subscribe(res=>{
      console.log(res);
    })
    // location.reload();
  }

  editMeme(obj: any){
    console.log("Editted Meme");
    const nameInput = document.getElementById("recipient-name-edit") as HTMLInputElement;
    const captionInput = document.getElementById("meme-caption-edit") as HTMLInputElement;
    const urlInput = document.getElementById("meme-url-edit") as HTMLInputElement;
    nameInput.value=obj.name;
    captionInput.value=obj.caption;
    urlInput.value=obj.url;
    this.memeId=obj.id;
  }
  saveEditMeme(){
    console.log("Saved Editted Meme");
    const nameInput = document.getElementById("recipient-name-edit") as HTMLInputElement;
    const captionInput = document.getElementById("meme-caption-edit") as HTMLInputElement;
    const urlInput = document.getElementById("meme-url-edit") as HTMLInputElement;
    const body = {
      name: nameInput.value,
      caption: captionInput.value,
      url: urlInput.value
    };
    if (this.memeId !== undefined) {
      this.memeservice.GetMemeById(this.memeId, body).subscribe(res => {
        console.log(this.memeId);
      });
    }
    // location.reload();
  }
}
