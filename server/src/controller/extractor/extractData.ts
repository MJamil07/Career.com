import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth'

// * Import patterns
import languages from './patterns/language';
import positions from './patterns/position';
import skills from './patterns/skills';
import {tamilnaduPattern , indiaPattern, usPattern} from './patterns/locations';


// * find emails using regex
const findEmails = (text : string) => {
    const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;
    return text.match(emailPattern) || [];
};

// *  find phone numbers using regex
const findPhoneNumbers = (text : string) => {
    const phonePattern = /(\+\d{1,3}[- ]?)?\d{10}/g;
    return text.match(phonePattern) || [];
};

// * find the location
const findLocations = (text : string) => {
    return text.match(tamilnaduPattern) || text.match(indiaPattern) || text.match(usPattern)
}

// * find the experience

const findExperience = (text : string ) => {
    const datePattern = /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b)\s*-\s*(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b)/gi;
    const dateWithCurrentPattern = /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b)\s*-\s*(\b(?:current|\d{4})\b)/gi;
    const experienceFieldPattern = /\b(?:Work Experience|Employment History|Professional Experience|Career History|Job History)\b/i;

    let isExistExperience = false

    for (const line of text.split('\n')) {

        if (experienceFieldPattern.test(line)) {
            isExistExperience = true;
        }

        if (isExistExperience && datePattern.test(line)) {
            // console.log(line);
        }

        if (isExistExperience && dateWithCurrentPattern.test(line)) {
            // console.log(line);
        }
 
    }

    return text.match(datePattern)
}

// * Function to extract data from PDF
const extractDataFromPdf = async (filePath : string) => {
    try {
        const dataBuffer = await fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);
        return pdfData.text;
    } catch (error) {
        console.error('Error reading or parsing PDF:', error);
        return null;
    }
};

const extractDataFromDocx = async (filePath : string) => {
    try {
        const docxBuffer = await fs.readFileSync(filePath);
        const doc = await mammoth.extractRawText({buffer : docxBuffer})
        return doc.value;

    } catch (error) {
        console.error('Error reading or parsing PDF:', error);
        return null;
    }
}

// * Function to extract data for a specific field pattern
const extractDataGivenField = (pdfText : string , fieldPatterns : { name: string , regex: RegExp; }[]) => {
   
    const foundFields : string[] = [];
    fieldPatterns.forEach(pattern => {
        if (pattern.regex.test(pdfText)) {
            foundFields.push(pattern.name);
        }
    });

    return foundFields;
};

const extractDataInResume = async (path : string | undefined ) => {

  
    if (!path) 
        return;

    // * Extract text and data from PDF
    const pdfdata = path.endsWith('.pdf') ? await extractDataFromPdf(path) : await extractDataFromDocx(path);

    if (!pdfdata) {
        console.log('Unable to extract data from the PDF.');
        return;
    }

    const resumeData = {
        email: findEmails(pdfdata),
        phone: findPhoneNumbers(pdfdata)[0],
        position: extractDataGivenField(pdfdata, positions),
        skills: extractDataGivenField(pdfdata, skills),
        languages: extractDataGivenField(pdfdata, languages),
        location : findLocations(pdfdata),
        experience : findExperience(pdfdata)
    };
     
    return resumeData
   
};

export default extractDataInResume
