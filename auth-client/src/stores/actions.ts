// @ts-nocheck
import router from "@/router";
import Http from "@/utils/Http"; 
import * as AuthService from "@/services";
import { getError } from "@/utils/helpers";

export default {

  setLoggedIn(data) {
    this.token = data.token
    window.localStorage.setItem("access-token", this.token);    
    Http.service.defaults.headers.Authorization=`Bearer ${this.token}`
  },
  logout() {
    return AuthService.logout()    
      .then(() => {
        this.user = null;
        this.setGuest({ value: "isGuest" });
        
        this.token = ''
        window.localStorage.removeItem("access-token");
        
        if (router.currentRoute.value.name !== "login")
          router.push({ path: "/login" });
      })
      .catch((err) => {                  
        this.error = getError(err);
      });
  },
  async getAuthUser() {
    this.loading = true;
    try {
      const response = await AuthService.getAuthUser();        
      this.user = response.data.data;        
      this.loading = false;
      return response.data.data;
    } catch (err) {
      this.loading = false;        
      this.user = null;        
      this.error = getError(err);        
    }
  },
  setGuest({ value }: { value: string}) { 
    window.localStorage.setItem("guest", value);
  }
}
