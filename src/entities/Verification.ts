import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
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


    @BeforeInsert()
    createKey():void{
        if(this.target==="PHONE"){
            this.key = Math.floor(Math.random() * 100000).toString();
        }else if(this.target==="EMAIL"){
            this.key = Math.random().toString(36).substr(2);
        }
    }

}


export default Verification;