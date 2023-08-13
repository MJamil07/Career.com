import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import URL from './url';
import Loading from './Loading';
import './styles.css'
import { Table } from 'antd';
import { columns } from './column';


export default function FilterApllication() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');
  const [resumes , setResumes] = useState(null);
  const [isLoading , setIsLoading] = useState(false)

  useEffect(()=> {

      let endpoint = URL
      if (role === 'all') {
          endpoint += '/resume/read_resume'
      } else {
        endpoint += `/resume/get_resume/${role}`
      }

      console.log(endpoint);
      async function fetchData() {
        const data = await axios.get(endpoint)
        setResumes(data.data)
        setIsLoading(true)

      }

      fetchData()
  },[])

  

  if (!isLoading) {
    return <Loading/>
  }

  return (
    <>
       <Table 
          columns={columns}
          dataSource={resumes}
       />
    </>
  )
}
