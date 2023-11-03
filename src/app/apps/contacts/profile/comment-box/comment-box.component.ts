import { Component, Input, OnInit } from '@angular/core';

// types
import { Post } from '../profile.model';

@Component({
  selector: 'app-profile-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input() posts: Post[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
