import { MessagesRepository } from "./messages.repository";
import { MessageParams } from "./models/message-params.dto";

export class MessagesService {

    repository: MessagesRepository;

    constructor() {
        this.repository = new MessagesRepository();
    }

    create(message: MessageParams) {
        return this.repository.create(message);
    }

    get(id: string) {
        return this.repository.getMessage(id);
    }

    getAll() {
        return this.repository.getMessages();
    }
}
