import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    approved: boolean;

    @Column()
    price: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @ManyToOne(_ => User, x => x.reports)
    user: User;
}
