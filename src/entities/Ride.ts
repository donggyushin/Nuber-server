import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { RideStatus } from "src/types/types";

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

    @CreateDateColumn()
    createdAt: String;
    @UpdateDateColumn()
    updatedAt: String;
}

export default Ride;