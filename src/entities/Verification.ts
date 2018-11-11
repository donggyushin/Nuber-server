import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { VerificationTarget } from "src/types/types";

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"text"})    
    target: VerificationTarget;
    @Column({type:"text"})
    payload: string;
    @Column({type:"text"})
    key: string;

    @Column({type:"boolean", default:false})
    used:boolean;

    @CreateDateColumn()
    createdAt: string;
    @UpdateDateColumn()
    updatedAt: string;


}


export default Verification;