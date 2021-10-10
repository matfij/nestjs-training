import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";
import { MessageParams } from "./models/message-params.dto";


@Injectable()
export class MessagesRepository {

    private readonly DATA_SOURCE = 'data.json';

    async getMessages() {
        const data = await readFile(this.DATA_SOURCE, 'utf8');
        const messages = JSON.parse(data);

        return messages;
    }

    async getMessage(id: string) {
        const data = await readFile(this.DATA_SOURCE, 'utf8');
        const messages = JSON.parse(data);

        return messages[id];
    }

    async create(message: MessageParams) {
        const data = await readFile(this.DATA_SOURCE, 'utf8');
        const messages = JSON.parse(data);

        const id = Math.ceil(Math.random() * 999);
        messages[id] = { id, ...message };

        await writeFile(this.DATA_SOURCE, JSON.stringify(messages));

        return id;
    }
}