export interface Config {
  production: boolean;
  apiEndPoint: string;
  urlProfileImg: string;
  neshanBaseUrl: any;
  neshanApiKey: string;
  mapboxToken: string;
}
export const environment: Config = {
  production: true,
  // SERVER_API: 'https://api.example.com',
  apiEndPoint: 'http://localhost:8080/v1/',
  urlProfileImg: 'http://localhost:8080/imgProfile/',
  neshanBaseUrl: 'https://api.neshan.org',
  neshanApiKey: 'service.KVVe90o9etGdBaZMu1jT2tlhVuc2yXdMDcYkYded',
  mapboxToken:
    'pk.eyJ1Ijoic2FtYW5laGJhc21lY2hpIiwiYSI6ImNrb3p0MHZsZDEzNnIydXFnb2ZzMHRkcXUifQ.5U7YQXoqKOsIMuIJR6OVgA',
  //  ' pk.eyJ1IjoiYWxpYWtiYXJlc21hZWlsaSIsImEiOiJjbHp6ODI1ZDAwdjBpMmxyMjZpcjdvZzZlIn0.kQouXthroqQGvAYDArZ3uQ'
};
