import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Product } from './product';

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

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
    public rookie!: string;

    @Column('text', { nullable: true })
    public auto!: string;

    @Column('text', { nullable: true })
    public mem!: string;

    @Column({ type: 'smallint' })
    public serial_numbered: number;

    @Column({ type: 'text' })
    public odds: string;

    @Column({ type: 'smallint' })
    public point: number;

    @ManyToOne(() => Product, ({ cards }) => cards)
    @JoinColumn({ name: 'product_id' })
    public product: Product;
}
