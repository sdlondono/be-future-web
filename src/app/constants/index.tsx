import { z } from 'zod'

export const initialDetailsValue = {
  fullName: undefined,
  age: undefined,
  monthlyIncome: undefined,
  save: undefined
}

export const ZDetailsSchema = z.object({
  fullName: z
    .string({ required_error: 'El nombre es requerido' })
    .max(100)
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  age: z
    .string({ required_error: 'La edad es requerida' })
    .max(2)
    .min(2, { message: 'La edad debe tener al menos 2 caracteres' }),
  monthlyIncome: z
    .string({ required_error: 'El ingreso mensual es requerido' })
    .max(100)
    .min(3, { message: 'El ingreso mensual debe tener al menos 3 caracteres' }),
  save: z
    .string({ required_error: 'El ahorro es requerido' })
    .max(100)
    .min(3, { message: 'El ahorro debe tener al menos 3 caracteres' })
})
