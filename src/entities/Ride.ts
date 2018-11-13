import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column,  ManyToOne } from "typeorm";
import { RideStatus } from "src/types/types";
import User from "./User";

@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

@Column({type:"text"})
    status: RideStatus;
@Column({type:"text"})
    pickUpAddress: string;
@Column({type:"double precision", default:0})
    pickUpLat: number;
@Column({type:"double precision", default:0})
    pickUpLng: number;
@Column({type:"text"})
    dropOffAddress: string;
@Column({type:"double precision", default:0})
    dropOffLat: number;
@Column({type:"double precision", default:0})
    dropOffLng: number;
@Column({type:"double precision", default:0})
    price: number;
@Column({type:"text"})
    duration: string;
@Column({type:"text"})
    distance: string;

    @ManyToOne(type => User, user => user.ridesAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.ridesAsDriver)
    driver: User;

    @CreateDateColumn()
    createdAt: String;
    @UpdateDateColumn()
    updatedAt: String;
}

export default Ride;