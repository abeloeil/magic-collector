import reqwest from 'reqwest';

const url = 'https://api.magicthegathering.io/v1';

export function searchCard (name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        reqwest(`${url}/cards?name=${name}`)
            .then(resolve)
            .fail(reject)
        ;
    });
}
