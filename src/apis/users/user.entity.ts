import { Exclude } from "class-transformer";
import { UserRole } from "src/definitions/enums/user-role";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "../reports/report.entity";

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
    @Exclude()
    removed: boolean;

    @Column({default: UserRole.User})
    role: UserRole;

    @OneToMany(_ => Report, x => x.user)
    reports: Report[];

    /**
     * Procedures
     */

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
