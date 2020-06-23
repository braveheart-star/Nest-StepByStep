import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import createPostDto from './dto/createPost.dto';
import {post} from './post.interface';
import updatePostDto from './dto/updatePost.dto';

@Injectable()
export class PostsService {
    private lastId = 0;
    private posts:post[] = [];

    getAll() {
        return this.posts;
    }

    getById(id) {
     const post = this.posts.find(post => post.id === id);
     if(post) {
         return post;
     }
     throw new HttpException('Post not found',HttpStatus.NOT_FOUND);
    }

    createPost(post:createPostDto) {
        const newPost = {
            id:++this.lastId,
            ...post
        }
        this.posts.push(newPost)
        return this.posts;
    }

    replacePost(id:number,post:updatePostDto) {
        const index = this.posts.findIndex(post=>post.id === id);
        if(index>-1) {
            this.posts[index] = post;
            return this.posts;
        }
        throw new HttpException('Post not found',HttpStatus.NOT_FOUND)
    }

    deletePost(id: number) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
          this.posts.splice(postIndex, 1);
        } else {
          throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
      }
    
}
