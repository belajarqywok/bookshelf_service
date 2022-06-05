const searchIndexIdObject = async (arrayOfObject, value) => {

    var indexId = 0

    let indexArrayOfObject = 0

    while ( arrayOfObject.length > indexArrayOfObject ) {

        if ( arrayOfObject[indexArrayOfObject].id == value ) { 

            indexId += indexArrayOfObject
            break;

        }

        indexArrayOfObject ++


        if ( arrayOfObject.length <= indexArrayOfObject ) {

            return -1

        }

    }


    return indexId

}


module.exports = {
    searchIndexIdObject
}