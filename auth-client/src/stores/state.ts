import type { AuthStore } from '@/types/Store/AuthStore'

export default (): AuthStore => ({
  user: {},
  loading: false,
  error: '',
  token: ''
});
