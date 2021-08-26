import { api } from '../../../utils/api'

export const getGardens = () =>
  api.get<[{ id: string; name: string }]>('/gardens')
