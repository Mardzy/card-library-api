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

export const addCards = async (fileData: string, product_id: string) => {
    /**
     * Use csv-parse/sync to
     * parse CSV file data
     * from string to RawCardType[]
     */
    const cards = parse(fileData, {
        columns: true,
        from_line: 3
    });

    /**
     * Format keys to lowercase and underscores
     * from RawCardType[] to Card[]
     */
    const cardList: Card[] = cards.map((card: RawCardType) => {
        const lowercaseObj: Partial<Card> = lowercaseKeys(card);
        const { serial_numbered, point } = lowercaseObj;
        return {
            ...lowercaseObj,
            serial_numbered: Number(serial_numbered),
            point: Number(point),
            product_id
        };
    });

    try {
        for (let i = 0; i < cardList.length; i++) {
            const cardItem = cardList[i];
            cardRepository.create(cardItem);

            await cardRepository.insert(cardItem);
        }
    } catch (err) {
        const error = err as Error;
        console.log('Cards table insert error', error.message, error.stack);
    }

    return { cardsLength: cardList.length };
};
