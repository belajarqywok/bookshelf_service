const bookModels = async(

    id, name, year, author, summary,
    publisher, pageCount, readPage, finished,
    reading, insertedAt, updatedAt

) => {

    return {

        id          : id,          // string
        name        : name,        // string
        year        : year,        // number
        author      : author,      // string
        summary     : summary,     // string
        publisher   : publisher,   // string
        pageCount   : pageCount,   // number
        readPage    : readPage,    // number
        finished    : finished,    // boolean
        reading     : reading,     // boolean
        insertedAt  : insertedAt,  // string
        updatedAt   : updatedAt    // string

    }

}



module.exports = { bookModels }