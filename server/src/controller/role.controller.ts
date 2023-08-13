
import { Request , Response } from 'express'
import JobRole from '../models/role.model'
import mongoose from 'mongoose'


const createJobs =  async ( request : Request , response : Response ) => {

      const { position , skills , experience , location  } = request.body
      try {
           const job = await JobRole.create({
                  position ,
                  skills , 
                  experience ,
                  location
            })

            response.status(200).json(job)
      }
      catch(error) {
            response.status(500).json({message : 'Server Error'})
      }
}

const readJobs = async ( _request : Request , response : Response ) => {
      
      try {
            const data = await JobRole.find()
            response.status(200).json(data)    
      } catch (error) {
            response.status(500).json({message : 'Server error'})
      }

}

const isSkillsMatch = async ( id : string , skills : string[] | undefined ) : Promise<[number, boolean]> => {

      const result : [number , boolean] = [ 0 , false]

      try {
            const specificIdData = await JobRole.findById( new mongoose.Types.ObjectId(id) )
            
            // * data does not found return     
            if (!specificIdData || !skills) 
                  return result

            let count = 0;
            const skillsPattern = new RegExp(skills.join('|') , 'i')

            specificIdData.skills.forEach((roleSkills) => {
                  if (skillsPattern.test(roleSkills)) {
                        count++;
                  }
            })

            const percentage = (100 / specificIdData.skills.length) * count;
            console.log('percentage ' , percentage);

            return [ percentage , percentage > 45   ] 

      } catch (error) {
            console.log(error);
            
            return result
      }
     
}     

export { createJobs , readJobs , isSkillsMatch }