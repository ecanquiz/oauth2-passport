//import { ref } from "vue"
import { useAuthStore } from '@/stores'
import type { FormLogin, StandaloneLogin } from '@/types/Auth'

export function useLogin(): StandaloneLogin {
  const auth = useAuthStore()

  const login = async (form: FormLogin) =>
    await auth.login(form);

  return { login }
}
