type Paginable<T> = {

    info: {
        limit: number
        page: number,
        count : number
    }
    results: T[]

}

export { Paginable };