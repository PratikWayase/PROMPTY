
import authService  from "./authService";

const API_BASE_URL  = process.env.REACT_APP_API_URL  || 
(process.env.NODE_ENV ===  'development' ?
    'http://localhost:5000/v1'
    : 'https://prompt-enhancer.abc/v1'
);

// debug log doe api config only in dev mode 

if  (process.env.NODE_ENV === 'development') {
    console.log ('api configure : ', {
        baseUrl : API_BASE_URL,
        environment : process.env.NODE_ENV
    });
}


function isAuthError  (error){
    return (
        error.code === 'auth_error' || 
        error.statusCode === 401 || 
        error.statusCode === 403 || 

        (error.message && (
            error.message.includes ('authentiation falied') ||
            error.message.includes ('unauthorizes') ||
            (error.message.includes ('token') && (
                error.message.includes('invalid') ||
                error.message.includes('expiry')
            ))
        ))
    );
}


// utility func for logging 

function logApiError (context , error) {
    console.error (`[api service ] ${context}`,{
        message : error.message,
        name : error.name,
        stack : error.stack,
        type : typeof error
    })
}


// error handling ++

async function apiFetch(url , options = {}) {

    let attempts  = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts){
        attempts++

        try {

            // get current auth token 
            const token = await authService.initializeAuth();
            const apikey = authService.getApiKey ();

            if  (!token){
                console.error("failed to auth token")
                throw new Error ("auth failed")
            }

            const defaultHeaders = {
                'content_Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
                'X-API_KEY' : apikey
            }

            const config = {
                method : options.method || 'POST',
                ... options,
                Headers : {
                    ... defaultHeaders,
                    ... options.Headers
                }
            };

            // ensure body is stringfy if its an object 

            if (config.bodt && typeof config.body !== "string"){
                config.body = JSON.stringify (config.body)
            }

            console.log ('make api request to :', url)

            // add timeout to fetch 

            



        } catch (error){

        }
    }
    
}