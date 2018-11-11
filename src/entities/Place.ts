import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";


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

    @CreateDateColumn()
    createdAt: String;
    @UpdateDateColumn()
    updatedAt: String;
}

export default Place;