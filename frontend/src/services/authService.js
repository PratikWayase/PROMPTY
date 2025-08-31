
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