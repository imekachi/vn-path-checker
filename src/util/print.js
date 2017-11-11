export const pretty    = (input, ...options) => JSON.stringify(input, ...options)
export const prettyLog = (input, ...rest) => console.log(pretty(input), ...rest)