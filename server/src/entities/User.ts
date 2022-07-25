import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Column({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Column({ type: "text", unique: true })
  username!: string;

  @Field()
  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;
}
