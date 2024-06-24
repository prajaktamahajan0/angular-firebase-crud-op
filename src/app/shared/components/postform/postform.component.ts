import { Component, Inject, OnInit, getPlatform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../models/posts';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {
  postForm !: FormGroup;
  getPosts !: Iposts
  isInUpdateMode: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) editPost: any,
    private _dialogRef: MatDialogRef<PostformComponent>,
    private _postsService: PostsService
  ) 
  {
    this.createPostForm();
    this.getPosts = editPost;
    console.log(editPost);
    if (editPost) {
      this.isInUpdateMode = true;
      this.postForm.patchValue(this.getPosts)
    }
  }

  ngOnInit(): void {
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required])
    })
  }

  onPostSubmit() {
    console.log("post submited");
    if (this.postForm.valid) {
      //loder will start
      let obj = this.postForm.value;
      console.log(obj);
      this._postsService.createPost(obj)
        .subscribe(res => {
          console.log(res);
          this._postsService.sendNewPost({ ...obj, id: res.name });
          this.postForm.reset();
          this._dialogRef.close();
        }
          //loder will stop
        )   
    } 
  }

  onUpdate() {
    let updatedObj = { ...this.postForm.value, id: this.getPosts.id };
    console.log("updatedObj",updatedObj);
    
    this._postsService.updatePost(updatedObj)
   
    // this._postsService.updatePost(this.postForm.value, this.postForm.value.id)
      .subscribe((res:any) => {
        console.log(res);
        this._postsService.sendUpdatedPost(res);
        this.postForm.reset();
        this._dialogRef.close();
      })

  }

}
