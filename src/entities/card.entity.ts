import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity('cards')
export class Card extends Base {
    @Column({ type: 'text' })
    public set_name: string;

    @Column({ type: 'text' })
    public card: string;

    @Column({ type: 'text' })
    public description: string;

    @Column('text', { nullable: true })
    public team_city: string;

    @Column('text', { nullable: true })
    public team_name: string;

    @Column('text', { nullable: true })
    public rookie?: string;

    @Column('text', { nullable: true })
    public auto!: string;

    @Column('text', { nullable: true })
    public mem?: string;

    @Column('text', { nullable: true })
    public serial_numbered: string;

    @Column('text', { nullable: true })
    public odds: string;

    @Column({ type: 'integer' })
    public point: number;

    @Column('text')
    product_id: string;
    @ManyToOne(() => Product, ({ cards }: Product) => cards)
    @JoinColumn({ name: 'product_id' })
    public product!: Product;
}
