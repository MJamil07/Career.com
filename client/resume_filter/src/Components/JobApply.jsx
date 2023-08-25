import React, { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import URL from './url';
import { Modal , notification } from 'antd';
import Loading from './Loading';


export default function JobApply() {

  const [jobRoleData, setJobRoleData] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  const [isOpen , setIsOpen ] = useState(false)
  const [experience , setExperience] = useState(0)
  const [resume , setResume] = useState(null)
  const [roleId , setRoleId] = useState('')
  const [api , contextHolder] = notification.useNotification()
  
  useEffect(()=> {

      async function fetchData() {
            const result = await axios.get(`${URL}/role/read_role`)
            setJobRoleData(result.data) 
            setIsLoading(true)
      }

      fetchData()
  } , [])

  const handleChange = (e) => {
      setResume(e.target.files[0]);
  }

  const handleUpload = (e) => {
      e.preventDefault()

      if (!resume) {
         alert('Your Resume not found')
      }

      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('role_id', roleId);
      formData.append('experience', experience);

      axios.post(`${URL}/resume/upload_resume` , formData , 
            { 
              headers: {
                  'Content-Type': 'multipart/form-data' 
              }
            }
          )
          .then(response => {
            api.success({
              message : 'Successfully Added , Waiting for Email'
            })
          })
          .catch(error => {
            api.error({
              message : 'File not upload , Retry'
            })
          })

          setIsOpen(false)
  }

  if (!isLoading) {
    return <Loading/>
  }

  

  return (
    <div style={{marginTop : 30}} className='jobs'>
      {contextHolder}
       <div className='row'>
             <h3 style={{marginLeft : 9}}> Recent Jobs </h3>
            {
              jobRoleData && jobRoleData.map((role , index) => {
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

                                <button onClick={()=> {
                                      setIsOpen(true)
                                      setRoleId(role._id)
                                    }} className='btn btn-dark '> Apply </button>
                          </div>
                      </div>
              })
            }
       </div>
       <Modal 
          open = {isOpen}
          title = ' Apply Job '
          onCancel={()=> setIsOpen(false) }
          footer = {[]}
        >
           <div>
              <form encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label"> Experience </label>
                  <input 
                    type="number" 
                    className="form-control" 
                    onChange={(e)=> setExperience(e.target.value)}
                    required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Resume (PDF)</label>
                  <input 
                    className="form-control" 
                    type="file" 
                    name="resume" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <button  onClick={handleUpload}  className="btn btn-success" type="submit">Apply</button>
              </form>
          </div>
       </Modal>
    </div>
  )
}
