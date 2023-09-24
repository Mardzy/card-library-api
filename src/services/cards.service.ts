import { parse } from 'csv-parse/sync';

import { postgresDataSource } from '../connections';
import { Card } from '../entities';
import { lowercaseKeys } from '../utils';

const cardRepository = postgresDataSource.getRepository(Card);

type RawCardType = {
    'Set Name': string;
    Card: string;
    Description: string;
    'Team City': string;
    'Team Name': string;
    Rookie: string;
    Auto: string;
    Mem: string;
    "Serial #'d": string;
    Odds: string;
    Point: string;
};

export const insertCards = async (fileData: string, product_id: string) => {
    /**
     * Use csv-parse/sync to
     * parse CSV file data
     * from string to RawCardType[]
     */
    const cards = parse(fileData, {
        columns: true,
        from_line: 1
    });

    /**
     * Format keys to lowercase and underscores
     * from RawCardType[] to Card[]
     */
    const cardList: Card[] = cards.map((cardItem: RawCardType) => {
        const {
            set_name,
            card,
            description,
            team_name,
            rookie,
            auto,
            mem,
            serial_numbered,
            odds,
            point
        }: Partial<Card> = lowercaseKeys(cardItem);

        // if colum isn't available add as null
        return {
            product_id,
            set_name: set_name || null,
            card: card || null,
            description: description || null,
            team_name: team_name || null,
            rookie: rookie || null,
            auto: auto || null,
            mem: mem || null,
            serial_numbered: serial_numbered || null,
            odds: odds || null,
            point: Number(point)
        };
    });

    let message = `${cardList.length} items added to CARDS table.`;

    try {
        for (let i = 0; i < cardList.length; i++) {
            const cardItem = cardList[i];
            cardRepository.create(cardItem);

            await cardRepository.insert(cardItem);
        }

        return { message, status: 201 };
    } catch (err) {
        const error = err as Error;
        message = `CARDS table insert error ${error.message}`;
        console.log(message, error.stack);
        return { message, status: 500 };
    }
};
