import axios from 'axios';
import React , {useEffect, useState} from 'react'
import URL from './url';
import Loading from './Loading';


export default function ViewApplication() {

  const [jobs, setJobs] = useState(null);
  const [isLoading , setIsLoading] = useState(false);

    useEffect(()=> {

      async function fetchData() {
            const result = await axios.get(`${URL}/role/read_role`)
            setJobs(result.data) 
            setIsLoading(true)
      }

      fetchData()
  } , [])

  if (!isLoading) {
    return <Loading/>
  }
  
  const viewResume = (role) => {

     let query = ''
     if (role === 'all') {
      query += '?role=all'
     }

     else {
      query += `?role=${role}`
     }

     window.location.assign(`http://localhost:3000/view/filter${query}`)
  }

  return (
    <div style={{marginTop : 20}}>
      <h5 style={{marginLeft : 10}}> View Applications {'>>'} <span onClick={()=> viewResume('all')} className='text-primary'> show all </span>  </h5>
      
        <div className='row'>
              {
                jobs && jobs.map((role , index) => {
                      return <div className='col-md-6 col-sm-12' key={role.index}>
                              <div className="job-card">
                                  <h4 className="position">{role.position}</h4>
                                  <div className="skills">
                                      <h3>Skills:</h3>
                                      <h3> {role.skills.join(' , ')} </h3>
                                  </div>
                                  <div className="experience-location">
                                      <h5 className="experience">Experience : {role.experience} years</h5>
                                      <h5 className="location">Location  : <span className='text-primary'> {role.location} </span> </h5>
                                  </div>
                                  <button onClick={()=> viewResume(role._id)} className='btn btn-success w-100'> View Applications </button>
                            </div>
                        </div>
                })
              }
        </div>
    </div>
  )
}
