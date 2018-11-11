import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import { IsEmail } from "class-validator"
import bcrypt from "bcrypt";

//암호화 해줄 횟수
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;
  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;
  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "text" })
  password: string;
  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;
  @Column({ type: "boolean", default: false })
  isRiding: boolean;
  @Column({ type: "boolean", default: false })
  isTaken: boolean;
  @Column({ type: "double precision", default: 0 })
  lastLng: number;
  @Column({ type: "double precision", default: 0 })
  lastLat: number;
  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  //이 함수를 호출할때 await 함수로 호출하기 때문에 반환형은 Promise
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  
  public comparePassword(password:string) : Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  //새로운 object를 만들기 이전에 불려지는 메소드
  //object를 업데이트하기전에 불려지는 메소드
  //간단히 lifecircle 메소드라고 생각하면 됨. 
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    //async를 사용하기 때문에 반환형은 Promise
    if (this.password) {
        //hashpassword를 돌리는데에는 시간이 조금 걸릴 수 있기 때문에
        //await 을 해주는게 좋다.
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  
}

export default User;