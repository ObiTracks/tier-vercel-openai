import { env } from "@/env.mjs";
import Airtable from "airtable";

var base = new Airtable({ apiKey: env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base('appGTJJ1EDkWFEok5');

export function updateCount(recordString: string, operation: 'increment' | 'decrement'): Promise<number> {
    return new Promise((resolve, reject) => {
        base('Popular Usecases').select({
            filterByFormula: `{Usecase} = '${recordString.toLowerCase()}'`,
        }).firstPage((err: any, records: any) => {
            if (err) {
                if (err.statusCode === 429) {
                    console.error("Too many requests. Please wait 30 seconds before trying again.");
                    reject("Too many requests. Please wait 30 seconds before trying again.");
                } else {
                    console.error(err);
                    reject(err);
                }
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


export async function createRecord(recordString: string, initialVotes: number = 1): Promise<UseCase> {
    try {
        const records = await base('Popular Usecases').create([{
            fields: {
                Votes: initialVotes,
                Usecase: recordString.toLowerCase(),
            },
        }]);

        const createdRecord = records[0];
        const useCase: UseCase = {
            id: createdRecord.getId(),
            useCaseText: createdRecord.get('Usecase'),
            votes: createdRecord.get('Votes'),
        };

        console.log(`Created new record: `, useCase);
        return useCase; // Directly returning the UseCase shaped object.
    } catch (err: any) {
        console.error(err);
        throw err;
    }
}



export function searchRecord(recordString: any): Promise<any> {
    return new Promise((resolve, reject) => {
        base('Popular Usecases').select({
            filterByFormula: `FIND('${recordString}', LOWER({Usecase}))`,
        }).firstPage(function (err: any, records: any) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            const foundRecords = records.map((record: any) => {
                console.log(`Found record with ID ${record.getId()} and Usecase ${record.get('Usecase')}`);
                return record;
            });

            resolve(foundRecords);
        });
    });
}

export async function searchAndCreateUsecase(recordString: string): Promise<any> {
    try {
        const records = await searchRecord(recordString);

        // If similar record(s) found, don't create a new one
        if (records.length > 0) {
            console.log(`Record(s) already exist with the same or similar Usecase: ${recordString}`);            
            const record = records[0];
            const useCase: UseCase = {
                id: record.getId(),
                useCaseText: record.get('Usecase'),
                votes: record.get('Votes'),
            };;
            console.log("Discovered usecase ", useCase)
            return useCase;
        }

        // If no similar records are found, create a new one
        const newUsecase = await createRecord(recordString);
        console.log("New usecase created ", newUsecase)
        return newUsecase;

    } catch (error) {
        console.error('Error in searchAndCreateUsecase:', error);
        throw error;
    }
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

export async function addEmailToAirtable(email: string): Promise<void> {
    try {
        await base('Inbound Emails (Landing Page)').create([
            { fields: { Email: email } },
        ]);
        console.log('Email submitted successfully to Airtable');
    } catch (error) {
        console.error('There was a problem submitting the email to Airtable:', error);
        throw error;
    }
}

async function exponentialBackoff<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
    let retries = 0;
    
    async function attempt(): Promise<T> {
      try {
        return await fn();
      } catch (err: any) {
        if (err.statusCode === 429 && retries < maxRetries) {
          retries += 1;
          const delay = Math.pow(2, retries) * 100;
          console.log(`Retrying in ${delay} ms...`);
          await new Promise(res => setTimeout(res, delay));
          return attempt();
        } else {
          throw err;
        }
      }
    }
  
    return attempt();
  }
  