import { z } from 'zod'

import type { ZDetailsSchema } from '../details/constants'

export type IDetails = z.infer<typeof ZDetailsSchema>
