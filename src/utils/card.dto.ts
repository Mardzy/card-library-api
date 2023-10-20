import { Card } from '@entities';

type CardType = {
    id: string;
    setName: string;
    card: string;
    description: string;
    teamCity: string;
    teamName: string;
    rookie?: string;
    auto?: string;
    mem?: string;
    serialNumbered?: string;
    odds?: string;
    point: number;
    productId: string;
};

export const cleanEmptyFalsyCardProps = (cards: Card[]): CardType[] =>
    cards.map(
        ({
            id,
            set_name,
            card,
            description,
            team_city,
            team_name,
            rookie,
            auto,
            mem,
            serial_numbered,
            odds,
            point,
            product_id
        }) => {
            const response: CardType = {
                id,
                setName: set_name,
                card,
                description,
                teamCity: team_city,
                teamName: team_name,
                point,
                productId: product_id
            };

            if (auto) response.auto = auto;
            if (mem) response.mem = mem;
            if (odds) response.odds = odds;
            if (rookie) response.rookie = rookie;
            if (serial_numbered) response.serialNumbered = serial_numbered;

            return response;
        }
    );
