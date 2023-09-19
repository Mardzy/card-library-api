import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Card } from './card';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'text' })
    public manufacturer: string;

    @Column({ type: 'text' })
    public year: string;

    @Column({ type: 'text' })
    public name: string;

    @OneToMany(() => Card, ({ card }) => card)
    public cards: Card[];
}
