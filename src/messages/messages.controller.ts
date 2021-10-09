import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageParams } from './models/message-params.dto';

@Controller('messages')
export class MessagesController {

    service: MessagesService;

    constructor() {
        this.service = new MessagesService();
    }

    @Get('get')
    getMessages() {
        return this.service.getAll();
    }

    @Post('add')
    addMessage(@Body() params: MessageParams) {
        return this.service.create(params);
    }

    @Get('get/:id') 
    async getMessage(@Param('id') id: number) {
        return await this.service.get(id.toString()) ?? new NotFoundException();
    }
}
