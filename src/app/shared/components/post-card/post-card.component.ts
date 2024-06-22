import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iposts } from '../../models/posts';
import { MatDialog } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postObj !: Iposts;
  @Output() emitPost: EventEmitter<Iposts> = new EventEmitter<Iposts>();
  @Output() emitDeletedId: EventEmitter<string> = new EventEmitter<string>()
  constructor(
    private _matDialog: MatDialog,
    private _postsService: PostsService
  ) { }

  ngOnInit(): void { }

  onEdit() {
    this.emitPost.emit(this.postObj)
  }

  onDelete() {
    const dialogConf = this._matDialog.open(GetConfirmationComponent);

    dialogConf.afterClosed()
      .subscribe((getconfirm: boolean) => {
        console.log(getconfirm);
        if (getconfirm) {
          this._postsService.removePost(this.postObj.id)
            .subscribe(res => {
              this.emitDeletedId.emit(this.postObj.id);
            });
        } else {
          return
        }
      })
  }
}
