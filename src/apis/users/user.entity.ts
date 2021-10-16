import { Exclude } from "class-transformer";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default: false})
    removed: boolean;

    @AfterInsert()
    logInsert() {
        console.log('inserted user -', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated user -', this.id);
    }

    @AfterRemove()
    logRemved() {
        console.log('temoved user -', this.id);
    }
}
