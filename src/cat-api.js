const API_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_5YP6rjv28UVqmyLmTkPzHdr09dR9MoYcVbJ8XlJPndNDs0drQqIEVhmjacrIjura';

const API_HEADERS = new Headers({
    'Content-Type': 'application/json',
    'x-api-key' : API_KEY,
});

function fetchBreeds(){   
       return fetch(`${API_URL}breeds`,{method:"GET", headers:API_HEADERS})
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
           return resp.json()})
        .then(res => {
           return res.map(obj => ({
                id: obj.id,
                name: obj.name
            }))
        })
        .catch(error =>console.log(error)); 
}
    
function fetchCatByBreed(breedId){     
        return fetch(`${API_URL}images/search?breed_ids=${breedId}`, {method:"GET",headers:API_HEADERS}).then(req => 
            {if(!req.ok){
                throw new Error(req.error);
            }
            return req.json();
        })
    }

export { fetchBreeds, fetchCatByBreed };
