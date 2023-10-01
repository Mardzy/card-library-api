import { Entity, Column, OneToMany } from 'typeorm';

import { Base, Card } from '@entities';

@Entity('products')
export class Product extends Base {
    @Column({ type: 'text' })
    public manufacturer: string;

    @Column({ type: 'text' })
    public name: string;

    @Column({ type: 'text' })
    public year: string;

    @OneToMany(() => Card, ({ product }) => product, {
        cascade: ['insert']
    })
    public cards: Card[];
}
