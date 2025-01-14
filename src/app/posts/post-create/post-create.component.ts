import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isloading = false;
  private mode = 'create';
  private postId: string;


  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //when we start fetching show spinner
        this.isloading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          //hide spinner with result
          this.isloading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        //this.post = { id: null, title: '', content: '' }; // Initialize with default values
      }
    });
  }



  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isloading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
