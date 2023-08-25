import { Request , Response } from "express"
import extractDataInResume from "./extractor/extractData";
import ResumeSchema from '../models/resume.model'
import { IResumeData } from '../models/resume.model';
import { isSkillsMatch } from "./role.controller";


const upload = async ( request : Request , response : Response ) => {
     
      if (!request.file) {
            response.status(400).json({message : 'resume is expected'})
      }

      console.log(request.file);
      

      try {
            // ? extract resume data
            const resume_extract_data = await extractDataInResume(request.file?.path) 
            const isMatch = await isSkillsMatch(request.body?.role_id , resume_extract_data?.skills);

            // * create resume data object
            const upload_db : IResumeData = {
                  name : request.file?.originalname.split('.')[0] , // * file name is user name
                  resume_pdf_url : request.file?.path , 
                  ...resume_extract_data ,  // * pdf extract data 
                  ...request.body , // * body it have a roll_id and experience
                  is_profile_match : isMatch[1] ,
                  match_percentage : isMatch[0]
            } 

            const data = await ResumeSchema.create(upload_db)
            response.status(200).json({message : 'Successfully Upload'})


      } catch (error) {      
            response.status(500).json({message : 'Server Error'})
      }

}



const read = async ( request : Request , response : Response ) => {
      try {
            const data = await ResumeSchema.find()
            response.status(200).json(data)    
      } catch (error) {
            response.status(500).json({message : 'Server error'})
      }
}

const get_role_based = async ( request : Request , response : Response ) => {

      const {id} = request.params;
     
      try {
            const data = await ResumeSchema.find({role_id : id})
            response.status(200).json(data)
      } catch (error) {
            response.status(500).json({message : 'Server error'})
      }

      
}

type Filter = { 
      skills : string[] | undefined , 
      positions : string[] | undefined ,
      experience : number | undefined ,
      location : string[] | undefined
}

const filter = async (request : Request , response : Response) => {

      const { skills , positions , experience , location } : Filter = request.body
      const resumeDatas = await ResumeSchema.find();

      let filteredData = []

      if (skills) {
            let count = 0;
            resumeDatas.forEach((data) => {
                  const skillsPattern = new RegExp(data.skills.join('|') , 'i')
                  for(const skill of skills) {
                        if(skillsPattern.test(skill)) {
                              count++;
                        }
                  }

                  if (( 100 / skills.length ) * count > 40) {
                        filteredData.push(data);
                        count = 0;
                  }
            })
      }

      if (positions) {}
      if (experience) {}
      if (location) {}
      
}


const getLocation = async (request : Request , response : Response) => {

      // * location field mattum eduthu
      const data = await ResumeSchema.find({})
                                      .select('location')
                                      .exec()
      // * duplicate remove panna set data structure
      const locations = new Set();
      // * data la ulla oru oru location field ah eduthu
      for (const field of data) {
            // * athula ulla location ah set il add seiyavum
            for (const location of field.location) {
                  locations.add(location)
            }
      }
      response.json([...locations.values()])
      
}

export { upload , read , get_role_based , getLocation }


