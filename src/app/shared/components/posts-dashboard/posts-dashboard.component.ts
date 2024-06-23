import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostformComponent } from '../postform/postform.component';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {
  posts: Array<Iposts> = []
  constructor(
    private _postsService: PostsService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._postsService.getAllPosts()
      .subscribe(res => {
        this.posts = res
      })
    this._postsService.newPostSubObs$
      .subscribe((post: Iposts) => {
        this.posts.unshift(post)
      })

    this._postsService.updatePostSubObs$
      .subscribe((updatedPost: Iposts) => {
        let getIndex = this.posts.findIndex(post => {
          return post.id === updatedPost.id
        })
        this.posts[getIndex] = updatedPost;
      })
  }

  onAddPost() {
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.width = "400px";
    // dialogConf.data = "Sending Id to Post Form with a Dialog Comp"
    const dialogref = this._matDialog.open(PostformComponent, dialogConf)
  }

  patchEditValue(editPost: Iposts) {
    console.log(editPost);
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.width = "400px";
    dialogConf.data = editPost;
    const dialogref = this._matDialog.open(PostformComponent, dialogConf)

  }

  onRemovePost(id: string) {
    let getIndex = this.posts.findIndex(post => post.id === id);
    this.posts.splice(getIndex, 1)
  }

}
