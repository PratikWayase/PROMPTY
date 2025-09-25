
import authService from "./authService";

const API_BASE_URL = process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === 'development' ?
        'http://localhost:5000/v1'
        : 'https://prompt-enhancer.abc/v1'
    );

// debug log doe api config only in dev mode 

if (process.env.NODE_ENV === 'development') {
    console.log('api configure : ', {
        baseUrl: API_BASE_URL,
        environment: process.env.NODE_ENV
    });
}


function isAuthError(error) {
    return (
        error.code === 'auth_error' ||
        error.statusCode === 401 ||
        error.statusCode === 403 ||

        (error.message && (
            error.message.includes('authentiation falied') ||
            error.message.includes('unauthorizes') ||
            (error.message.includes('token') && (
                error.message.includes('invalid') ||
                error.message.includes('expiry')
            ))
        ))
    );
}


// utility func for logging 

function logApiError(context, error) {
    console.error(`[api service ] ${context}`, {
        message: error.message,
        name: error.name,
        stack: error.stack,
        type: typeof error
    })
}


// error handling ++

async function apiFetch(url, options = {}) {

    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
        attempts++

        try {

            // get current auth token 
            const token = await authService.initializeAuth();
            const apikey = authService.getApiKey();

            if (!token) {
                console.error("failed to auth token")
                throw new Error("auth failed")
            }

            const defaultHeaders = {
                'content_Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API_KEY': apikey
            }

            const config = {
                method: options.method || 'POST',
                ...options,
                Headers: {
                    ...defaultHeaders,
                    ...options.Headers
                }
            };

            // ensure body is stringfy if its an object 

            if (config.bodt && typeof config.body !== "string") {
                config.body = JSON.stringify(config.body)
            }

            console.log('make api request to :', url)

            // add timeout to fetch 

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000)

            try {
                const response = await fetch(url, {
                    ...config,
                    signal: controller.signal
                });

                clearTimeout(timeoutId)
                console.log('response status :', response.status)

                // handle non 200 status 
                if (!response.ok) {
                    const errorText = await response.text()
                    console.error("error response text :", errorText)


                    // if unautorizes try to referssh token 

                    if (response.status == 401) {
                        if (attempts < maxAttempts) {
                            console.log("unauthorizes refreshing token and retry ")
                            authService.removeToken();
                            continue
                        } else {
                            throw new Error("authentiation failed after retry ")
                        }

                    }

                    throw new error(`http error ! status:${response.status}, body : ${errorText}`);

                }

                // parse response body 

                const contentType = response.headers.get("content-Type")
                const isJsonResponse = contentType && contentType.includes('application/json');


                const responseData = isJsonResponse ? await response.json() : await response.text()

                return responseData
            } catch (fetchError) {
                clearTimeout(timeoutId)

                if (fetchError.name === "abortError") {
                    throw new Error("request time out after 40 sec")
                }
                throw fetchError;
            }



        } catch (error) {

            // if this our last attempts or thorw 

            if (attempts >= maxAttempts || !isAuthError (error)){
                throw error
            }

            await new Promise (resolve => setTimeout(resolve,1000))


        }
    }

}


// api servicies 

const apiService = {

    enhancePrompt : async (data) => {
        if ( !data.text || typeof data.text !== 'string'){
            throw new error ('invalid or missing orginal prompt')
        }

        // preaper erequenst data 

        const requestData = {
            text : data.text,
            format : data.format || 'structured'
        };

        try {
            console.log("sending prompt enhacement request:", requestData)

            // timeout for enhance promt requenst 

            const response = await apiFetch (`${API_BASE_URL}/prompts`,{
                method : 'POST',
                body : requestData
            })
            
        Console.log ('lent promt enhancement response received')
        return response

        } catch (error){
            logApiError ('prompt enhacement error',error)

            // more speicifc error message 

            if (error.message.includes ('timeout')){
                throw new error ('the server took too long to response, your prompt might be too complex for system')
            }
            else if (error.message.includes('401')){
                throw new error ('auth failed. please refersh page')

            }
            else {
                throw new error (error.message  || ' failed to enhance prompt . please check your input & try again')
            }
        }

    },

getPrompts : async (limit = 10 , offeset = 0) => {

    try {

        const url = new URL (`${API_BASE_URL}/prompts`);
        url.searchParams.append ('limit',limit)
        url.searchParams.append('offeset',offeset)

        return await apiFetch (url.toString(), {method : "GET"})

    } catch (error){
        logApiError ('get prompt error', error )
        throw error
    }

}

}

export default apiService;
