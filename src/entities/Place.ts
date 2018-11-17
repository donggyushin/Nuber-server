import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import User from "./User";


@Entity()
class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

@Column({type:"text"})
    name: string;
@Column({type:"double precision", default: 0})
    lat: number;
@Column({type:"double precision", default:0})
    lng:number;
@Column({type:"text"})
    address: string;
@Column({type:"boolean"})
    isFavorite:boolean;

    @ManyToOne(type => User, user => user.places)
    user: User;
    @Column({type:"number", nullable:true})
    userId: number;

    @CreateDateColumn()
    createdAt: String;
    @UpdateDateColumn()
    updatedAt: String;
}

export default Place;