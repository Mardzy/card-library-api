import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import Base from './base.entity';

@Entity('products')
export class Product extends Base {
    @Column({ type: 'text' })
    public manufacturer: string;

    @Column({ type: 'text' })
    public year: string;

    @Column({ type: 'text' })
    public name: string;

    @OneToMany(() => Card, ({ product }) => product, {
        cascade: ['insert']
    })
    public cards: Card[];
}
