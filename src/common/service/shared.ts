import {createRequestUtils} from "./request"

// export const baseURL: string = import.meta.env.VITE_API_BASE_URL;
// export const request = createRequestUtils({ baseURL });

export const baseURL: string = import.meta.env.VITE_API_NET_URL
export const NetEase = createRequestUtils({ baseURL })
