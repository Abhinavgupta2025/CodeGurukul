

const getLanguageById = (lang)=>{
        const language = {
            "c++":64,
            "java":62,
            "javascript":63
        }
        return language[lang.toLowerCase()];
}

const submitBatch = async(submission)=>{

}



module.exports = {getLanguageById,submitBatch };