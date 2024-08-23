import { useAuthStore } from '@/stores'
import type { Init } from "./Http"
import type { AxiosError, AxiosRequestConfig , InternalAxiosRequestConfig} from "axios";

export default<Init> {
  //baseURL: import.meta.env.VITE_APP_API_URL, //process.env.VUE_APP_API_URL,  
  baseURL: process.env.VUE_APP_API_URL,
  customHeaders: { 
    'Content-Type': 'application/json', 
    //'secret': '3b0f8cea269f3f2526d0ced609cd2d09368483fc9efadafdafa5961b1c42af6dd779280302145092eba0bc252839468ef47662d2293071f5dee124a9e8dda2c0', 
    //'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGMyNGRhODc0OWUxOTE2ODI0ZTE4ZjgwNjJkNDg5ZThjODk2MWU5YWMxZWQ2MGZiODVhZmU2Mjk3ZmRiYTljMjgyN2I5NWI0YTQ1ODI2YTMiLCJpYXQiOjE3MjQ0MzU5OTAuNjQxNDE5LCJuYmYiOjE3MjQ0MzU5OTAuNjQxNDIxLCJleHAiOjE3NTU5NzE5OTAuNjMyNzEsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.T2qKV-Uji0xTXmHKhK6d4QTLCueLwctCmsOKAfdbgazvRt0rLOoGbRPzYRNyfrCdaWlRkisPhz8cbek1dXZBTWJKq6ffTxiUVkrcSDQ45i02opP6uhjtu78jQvUhOtgp02_olx57R8F39mFWXNfMQEzKG1DZbDt-QgMbxCHaDCLJJzBYMr-oYHFJLSk89nqFQn2lAszlpwPlQdhFhPXMFMDUh2oa4Qqig2_PVuF1hb_Uzve7pGMIdLifBO0GrP_c4al1KugCL_M-18nWqLn4F-JTGY3tVhFb9uqt0fud1f8lSLLY8Z0q_Xf59zRYeGdmtlKLsgEH33b5Zb-lM2ItDnYAIo5TafC1tGpiwIPQ6xrnOw1zszg9i7_w_PJGs0dT_0bvtEKhyXUEpQEgkCBuQzdxm117mZZBm9T6IeKynUO8VldynYkyAqfts5mSliKbSkg7sZY0IccWRoQ5_HoVPGEeaxscVgjSaDWj8LMmq5OQzp0aVz8pruLCDa8-AlMRFsoXGob0WURwQR8OlJSz2ODsDIv-00-oMT66daokivrBQWCSQx5gdNxOxQH1mtXJPAMOGf4Z4zZZizBmhfYAKiFLPNZqAqGFHUGws5Qu5Jln6-CNPZM91Bla48NBOI3WpWBdH7gupVQY5Lg3yme7LY6HbAC_-Tw5gAKtGv2MwOA'
    'Authorization': ''
  },
  withCredentials: true,
  withXSRFToken: true,
  handleRequestConfig(config: InternalAxiosRequestConfig) {        
    if (window.sessionStorage.getItem("accessToken"))         
      config.headers['access-token'] = window.sessionStorage.getItem("accessToken")      
    return config;  
  },
  handleResponseError(error: AxiosError) {
    const storeAuth = useAuthStore()
    
    if (error.response
      && [401, 419].includes(error.response.status)    
      && storeAuth.authUser 
      && !storeAuth.guest
    ) {
      storeAuth.logout();
    }
    
    return Promise.reject(error);
  }
}
