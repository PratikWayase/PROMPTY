
// get api from env variables 

const API_URL = process.env.REACT_APP_URL ||  (
    process.env.NODE_ENV === "development" ? 'http://localhost:5000/v1'
    : 'https://prompt-enhancer.ai/v1'
)

// storage key for tokens 

const TOKEN_KEY = " "

const API_KEY = " "

const TOKEN_EXPIRY_KEY = " "


// FUNCRION TO GET API KEYS 

function getApiKey () {
    return process.env.REACT_APP_KEY || localStorage.getItem(API_KEY)
    
}


// get stored authentiation token 

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

// store auth token 

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY,token);

    // set expiry for 24 hrs in future 

    const expiry = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem(TOKEN_EXPIRY_KEY,expiry.toString());

}


{/* remove stored token */}

export const removeToken = () =>{
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem (TOKEN_EXPIRY_KEY);
}


{/* check if user is autheticated true if user has valid token */}

export const isAuthenticated = () => {
    const token = getToken ();
    if  (!token) return false;

    // check token exipry from our steod expiry time 

    const exipry = localStorage.getItem (TOKEN_EXPIRY_KEY);
    if (exipry && parseInt (exipry) > Date.now()){
        return true;
    }

    // if exipry isnt set or in past token is invalid 

    removeToken ();
    return false;
}

// fet autheticate token from server 

export const fetchToken = async () => {
    const apikey = getApiKey();

    if  (!apikey) {
        console.error("api key is not configure");
        throw new Error ("api key is not configure")
    }

    try {
        console.log("fetch new autht token");
        const response = await fetch (`${API_URL}/auth/token`,{
            method : "POST",
            Headers : {
                'content_Type' : "application/json",
                'X-API-KEY' : apikey
            },
            body : JSON.stringify ({
                clientId : "frontend-client",
                clientSecret : apikey
            })
        })

        const data = await response.json();
        const token = data.access_token;

        if (!token){
            throw new Error ( "no token received from server")
        }

        console.log ("token feteched sucessfully");

        //store token 
        setToken (token);
        return token;
    } catch (error){
        console.error("authentiation error" ,error)
        throw error;
    }
};

