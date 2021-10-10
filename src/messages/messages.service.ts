import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";
import { MessageParams } from "./models/message-params.dto";

@Injectable()
export class MessagesService {


    constructor(
        private repo: MessagesRepository
    ) {}

    create(message: MessageParams) {
        return this.repo.create(message);
    }

     get(id: string) {
        return this.repo.getMessage(id);
    }

    getAll() {
        return this.repo.getMessages();
    }
}
 