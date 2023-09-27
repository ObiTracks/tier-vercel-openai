import { env } from "@/env.mjs";
var Airtable = require('airtable');
var base = new Airtable({ apiKey: env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base('appGTJJ1EDkWFEok5');


export function updateCount(recordString: string, operation: 'increment' | 'decrement'): Promise<number> {
    return new Promise((resolve, reject) => {
        base('Popular Usecases').select({
            filterByFormula: `{Usecase} = '${recordString}'`,
        }).firstPage((err: any, records: any) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (records.length === 0) {
                const error = 'No record found!';
                console.error(error);
                reject(error);
                return;
            }

            const record = records[0];
            let votes = record.get('Votes') || 0;

            // Determine the operation and update votes accordingly
            if (operation === 'increment') {
                votes += 1;
            } else if (operation === 'decrement') {
                votes = votes > 0 ? votes - 1 : 0; // Ensure votes do not go below 0
            }

            base('Popular Usecases').update([
                {
                    id: record.id,
                    fields: { Votes: votes },
                },
            ], function (err: any, records: any) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log(`${operation === 'increment' ? 'Incremented' : 'Decremented'} Votes for ${recordString} to ${votes}`);
                resolve(votes); // Resolving with the updated vote count.
            });
        });
    });
}




export function createRecord(recordString: string) {
    base('Popular Usecases').create([
        {
            fields: {
                Votes: 0,
                Usecase: recordString,
            },
        },
    ], function (err: any, records: any) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Created new record with ID ${records[0].getId()} and Usecase ${recordString}`);
    });
}

export function searchRecord(recordString: any) {
    base('Popular Usecases').select({
        filterByFormula: `FIND('${recordString}', {Usecase})`,
    }).firstPage(function (err: any, records: any) {
        if (err) {
            console.error(err);
            return;
        }

        records.forEach(function (record: any) {
            console.log(`Found record with ID ${record.getId()} and Usecase ${record.get('Usecase')}`);
        });
    });
}


export function getTopPopularUsecases(n: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
        base('Popular Usecases').select({
            maxRecords: n,
            sort: [{ field: 'Votes', direction: 'desc' }],
        }).firstPage((err: any, records: any) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(records);
        });
    });
}
