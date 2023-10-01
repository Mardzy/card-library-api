var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base, Product } from 'entities';
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Column({ type: 'text' }),
        __metadata("design:type", String)
    ], Card.prototype, "set_name", void 0);
    __decorate([
        Column({ type: 'text' }),
        __metadata("design:type", String)
    ], Card.prototype, "card", void 0);
    __decorate([
        Column({ type: 'text' }),
        __metadata("design:type", String)
    ], Card.prototype, "description", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "team_city", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "team_name", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "rookie", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "auto", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "mem", void 0);
    __decorate([
        Column('text', { nullable: true }),
        __metadata("design:type", String)
    ], Card.prototype, "serial_numbered", void 0);
    __decorate([
        Column({ type: 'text' }),
        __metadata("design:type", String)
    ], Card.prototype, "odds", void 0);
    __decorate([
        Column({ type: 'integer' }),
        __metadata("design:type", Number)
    ], Card.prototype, "point", void 0);
    __decorate([
        Column('text'),
        __metadata("design:type", String)
    ], Card.prototype, "product_id", void 0);
    __decorate([
        ManyToOne(function () { return Product; }, function (_a) {
            var cards = _a.cards;
            return cards;
        }),
        JoinColumn({ name: 'product_id' }),
        __metadata("design:type", Product)
    ], Card.prototype, "product", void 0);
    Card = __decorate([
        Entity('cards')
    ], Card);
    return Card;
}(Base));
export { Card };
