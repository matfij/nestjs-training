import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageParams } from './messages.interfaces';

@Controller('messages')
export class MessagesController {

    @Get('get')
    getMessages() {
        
    }

    @Post('add')
    addMessage(@Body() params: MessageParams) {
        console.log(params)
    }

    @Get('get/:id') 
    getMessage(@Param('id') id: number) {
        console.log(id)
    }
}
