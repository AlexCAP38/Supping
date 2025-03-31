export const clearInputValue = (value: string) => {
    return value.replace(/[^0-9\.]/g, '').replace(/^\d*(\..*)\./g, '$1').replace(/^\./, '0.')
}