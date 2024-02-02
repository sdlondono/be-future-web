export const DEFAULT_LOCALE = 'en-US'
export const INVALID_NUMBER = 'Invalid Number'

export const formatters = {
  getNumberFormat: (opts: Intl.NumberFormatOptions = {}) =>
    new Intl.NumberFormat(DEFAULT_LOCALE, opts),
  getDateTimeFormat: (opts: Intl.DateTimeFormatOptions = {}) =>
    new Intl.DateTimeFormat(DEFAULT_LOCALE, opts)
}

export const formatMoney = (
  amount: number | string,
  options?: Intl.NumberFormatOptions
) => {
  try {
    const value = Number(amount)
    return formatters
      .getNumberFormat({
        ...options,
        style: 'currency',
        currency: 'USD'
      })
      .format(value)
  } catch (error) {
    console.error(error)
    return INVALID_NUMBER
  }
}

export const calculateMonthsToReachGoal = (
  principal: number,
  goal: number,
  interestRate: number
) => {
  const result = (principal * interestRate) / 100
  const interestRateDecimal = interestRate / 100
  const months = Math.log(goal / result) / Math.log(1 + interestRateDecimal)
  return Math.ceil(months)
}
