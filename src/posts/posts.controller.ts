import { Controller, Get, Body, Param, Post, Put, Delete } from '@nestjs/common';
import {PostsService} from './posts.service';
import createPostDto from './dto/createPost.dto';
import updatePostDto from './dto/updatePost.dto';

@Controller('post')
export class PostsController {
    constructor(
        private readonly postsService:PostsService
    ){}

    @Get() 
    getAll() {
        return this.postsService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id:string) {
        return this.postsService.getById(Number(id))
    }

    @Post()
    async createPost(@Body() post:createPostDto) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id:string, @Body() post:updatePostDto) {
        return this.postsService.replacePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id:string) {
        return this.postsService.deletePost(Number(id));
    }
}
