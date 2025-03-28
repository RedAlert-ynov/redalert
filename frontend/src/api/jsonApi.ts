const buildHeaders = (bearerToken?: string) => {
    return (
        {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
            }
        }
    )
}
  
const defaultPostOptions = {
    method: 'POST',
};
  
const defaultPatchOptions = {
    method: 'PATCH',
};

const defaultPutOptions = {
    method: 'PUT',
};

const defaultDeleteOptions = {
    method: 'DELETE',
};
  
async function fetchJson({ url, options, content }: { url: string; options?: object; content?: object }) {
    const body = JSON.stringify(content);
    const response = await fetch(url, { ...options, body });
    if (!response.ok) {
        return response.json().then((reason) => Promise.reject(reason));
    }
    return await response.json();
}
  
export const jsonApi = {
    get: ({url, options, bearerToken}: {url: string, options?: object, bearerToken?: string}) => {
        return fetchJson({ url, options: { ...buildHeaders(bearerToken), ...options} });
    },
    
    post: ({url, content, options, bearerToken}: {url: string, content?: object, options?: object, bearerToken?: string}) => {
        return fetchJson({ url, options: { ...buildHeaders(bearerToken), ...defaultPostOptions, ...options }, content });
    },
    
    patch: ({url, content, options, bearerToken}: {url: string, content: object, options?: object, bearerToken?: string}) => {
        return fetchJson({ url, options: { ...buildHeaders(bearerToken), ...defaultPatchOptions, ...options }, content });
    },

    put: ({url, content, options, bearerToken}: {url: string, content: object, options?: object, bearerToken?: string}) => {
        return fetchJson({ url, options: { ...buildHeaders(bearerToken), ...defaultPutOptions, ...options }, content });
    },

    delete: ({url, content, options, bearerToken}: {url: string, content?: object, options?: object, bearerToken?: string}) => {
        return fetchJson({ url, options: { ...buildHeaders(bearerToken), ...defaultDeleteOptions, ...options }, content });
    }
};
  