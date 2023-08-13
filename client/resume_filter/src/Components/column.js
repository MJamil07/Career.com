import { Tag } from "antd";
import URL from "./url";

const colors = [
  "#ff0000", 
  "darkgreen", 
  "#0000ff", 
];

function viewPDF(url) {
      
  const locationPDF = `${URL}${url}`;

  console.log(locationPDF.replace('src' , ''));
  window.open(locationPDF.replace('src' , ''));

}

export const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render : name => <span style={{color : 'darkgreen'}}> {name} </span>
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: emailList => <span>{emailList?.join(', ')}</span>,
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: locationList => <span style={{color : 'blue'}} >{locationList?.join(', ')}</span>,
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        render: positionList => <span>{positionList?.join(', ')}</span>,
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: skillsList => (
          <>
            {skillsList?.map(skill => (
              <Tag style={{color : colors[Math.floor(Math.random() * colors.length)]}} key={skill}>{skill}</Tag>
            ))}
          </>
        ),
      },
      {
        title: 'Experience',
        dataIndex: 'experience',
        key: 'experience',
      },
      {
        title: 'Is Profile Match',
        dataIndex: 'is_profile_match',
        key: 'is_profile_match',
        render: isMatch => (
          <Tag color={isMatch ? 'green' : 'red'}>{isMatch ? 'Yes' : 'No'}</Tag>
        ),
      },
      {
        title: 'Match Percentage',
        dataIndex: 'match_percentage',
        key: 'match_percentage',
        render: percentage => <span>{percentage.toFixed(2)}%</span>,
      },
      {
        title: 'Resume PDF URL',
        dataIndex: 'resume_pdf_url',
        key: 'resume_pdf_url',
        render: url => (
          <span style={{color : 'green' , textDecoration : 'dashed'}} onClick={()=> viewPDF(url) } >
            Open Resume
          </span>
        ),
      },
    ];