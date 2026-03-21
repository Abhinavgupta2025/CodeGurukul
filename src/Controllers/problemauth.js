const getLanguageById = require("../utils/problemUtility")
const submitBatch = require("../utils/problemUtility");
const createProblem = async(req,res)=>{

        const {title,description,difficulty,tags,visibleTestCases,output,explanation,
            hiddenTestCases,tartCode,referenceSolution, problemCreator
        } = req.body;
        try{

          for({lanuage,initialCode} of referenceSolution){ //routes problems
               const languageId = getLanguageById(language);
                const submission = visibleTestCases.map((input,output)=>({
                    source_code:initialCode,
                    language_Id : languageId,
                    stdin : input,
                    expected_output:output
                }));
          }

            const submitResult = await submitBatch(submission);

        }
        catch(err){

        }
}

