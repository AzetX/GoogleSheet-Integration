//https://docs.google.com/spreadsheets/d/1zy4LxcStplSqPr8A4SVM7bmqs8dr4tzpvLqzWdabv-8/edit#gid=1387910004 - лист с данными
const { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet('1zy4LxcStplSqPr8A4SVM7bmqs8dr4tzpvLqzWdabv-8')
const http = require('http')
const path = require('path')
const fs = require('fs')



// -----server
const server = http.createServer((req, res) => {
    let body = ''
    if(req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        if(req.url === '/'){
            
            fs.readFile(
                path.join(__dirname, 'viewss', 'index.html'),
                'utf-8',
                (err, content) =>{
                    if(err){
                        throw err
                    }

                    res.end(content)
                }
                )
              
            }
            else if(req.url === '/api/students'){
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                })
                const body = [];
                fs.readFile('./studentsData.json', 'utf-8', (err, fileContent) =>{
                    if (err) {throw err}
                    const data = JSON.parse(fileContent)
                    for(let key in data){
                           body.push(Buffer.from('<li>'+ data[key].studName + ' '+ data[key].gender + ' ' + data[key].major + ' ' + data[key].activity + ' ' + data[key].home +'</li>'))
                }
                  body.push('</ul>')
                  body.unshift('<ul>')
                  const message = body.join(' ')
                  console.log(body)
                  res.end(message)
                })
            }

    }//загружаем страницу
    else if(req.method === 'POST'){
    
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
    
        const body = [];
        fs.readFile('./studentsData.json', 'utf-8', (err, fileContent) =>{
            if (err) {throw err}
            const data = JSON.parse(fileContent)
            for(let key in data){
                   body.push(Buffer.from('<li>'+ data[key].studName + ' '+ data[key].gender + ' ' + data[key].major + ' ' + data[key].activity + ' ' + data[key].home +'</li>'))
        }
          body.push('</ul>')
          body.unshift('<ul>')
          const message = body.join(' ')
          console.log(body)
          res.end(message)
        })
    }
})

server.listen(3000, ()=>{
    console.log('Server is running')
})


// const  loadJsonData = () => {
//     fs.readFile('./studentsData.json', 'utf-8', (err, fileContent) =>{
//         if(err){
//             console.log(err)
//         }
//         try{
//             const data = JSON.parse(fileContent)
//             // console.log(data)
//             const ul = document.querySelector('#list')
            

//             for(let key in obj){
//                 arr.push('<li>'+ obj[key].studName + ' '+ obj[key].gender + ' ' + obj[key].major + ' ' + obj[key].activity + ' ' + obj[key].home +'</li>')
//             }
//             const html = arr.map(i => i)
//         ul.insertAdjacentHTML('afterbegin', html.join(' '))
//         }
//         catch(err){
//             console.error(err)
//         }
//     })
// }

//-----------sheet1



const  accessSpreadsheet = async () => {
   try {
    //    const accCreds = await doc.useServiceAccountAuth({
    //     client_email: 'googlesheets@coral-mariner-283710.iam.gserviceaccount.com',
    //     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCSbHu8PrEkdCqY\n3tVV6w8UCTkPi5mDVlQWPEdrNDcgFIGO8k2HWB27XxAlnD0HiUlIECskPmIKYc1j\nC4UX8lF/mwr1a6cBXmFt3WdxIwgAPdFCAxEsHYkFkWPp9l2Lvip9Y6ZuOgsPUYe6\nAip/dZDI40E1Huk7J0PbpPfITOKWlzFUz+VOW3mpohYr8yMejAu3MHG0qs56s55O\nIQ0IQOI/kRdauPbvePbTOPy/p7FPZp4l6g+3sR1Hzp098gWD59CeEU7So2PSaWio\n08N1e3/cz6oacUiaHjPQuSmz0TR7zuFUGdek8K4CF/JoIwzwRgK8Ufvlzv3i3Pf0\nI0dcHrahAgMBAAECgf8BEgiyIHdQgIPZU2ymFk0Hb73vachyPAddS7x/vrsFh5g/\nXooocJ1bxd48hoIwhFN0ojZGTtJdiOgtnhb+alAzRhTXB2xgL3t0paOmE0DtDG1Z\nT3XKGf3e3HygRud+bnu7mW+43ArKXUMXpi8v7edLDyihA6R5NPxLiAMD7citIZeF\nZPVTyXneaL5iC6687onO6mWta7gf3olNjudBDLKgmegfwK6becZn3yfRuH6Cq+no\ny1aY23x03Vf4Rqom396uSkl/MVwb/yTBlbWGm2h0dT8D7lWUlrx6gqZ6Scd3qkjP\nZqnkzU7SxRhhFFZtPUkZ3MYQ02kZrp6+iSeW4NcCgYEAyRGEpojRajJrW2yTNCJe\nDMPg4CuPl855GCQ0/nCrtcp2cloydRseyvE5FHsI/zhttDQIjJ+CYj5BS/cexsDq\njjtbl0GfkmZIOQOpxZKutdVwvj2FL06Q9XiG5p4jcZAPLXTKtItAzf+E06R+UzSW\nbAcfB0StVXAhmeX+9M5MrAMCgYEAum0u+lXbkP82NprGEfw3PDA4EAccGlBfugZH\n3R0S+PNF1Jamb/IjKxINa3uqs/85FcGyH99qcDSroTsNWjJqehOCsDQRNXh3J0gF\nHHEAArM+SC0JlbSu+JN1P5WTRwPaE22Lwkd6VthNtCHiKvf6oS6dB6b7ixU60Y07\nm/9zG4sCgYAySBw5HTvpZ8RrL4K8Zd/JJ27kAGC/YNXtkJhkDL8UDhaC0EWP/YE8\n1QgmNAJy+KSOjPiaWgVcFh90JM9gervtZ7Cm6bVDAisLfvwEuYLRXBf+qxnUU7xy\ndnqdz2wjqRfykSNj9PL20PBhkOA6ZIs9ZqZ+xdDm7cypVNfmVnTcCwKBgBMeWWAA\n6BiRo7yr2L5FcGCyzT0PjZlBPt/z/vC1J5nyUOoBXSZD3clv+4JXV2VIOlF54MuV\n/PNu418QkEj8vKCyWYe6fz1NkmKr5yJIkGi2ex+pxr7cnckOTkrsCwOQaI/vfxK4\ng9peKnHbu7cOYVygTChZvpg/4B1Xb5KK+wILAoGAW7uM0+yEp+vuEcvvjJbX14JR\n7rFUcs0yO+2SZEINYWQ1OgJF2rwxPNF0PStVQXYISjXtwGDH9EqcxqeETJdrwKkt\nuzolGnuXztWVnC5z3XDsmEjLRx/ZT9WrM8d4QJqyOjKLquT+papjRWROPT5/WSr1\n18TWqXM8tQ0+UvmR4q0=\n-----END PRIVATE KEY-----\n",
    //   }); 
        const accCreds = await doc.useServiceAccountAuth(require('./client_data.json'))//испол данные акка 

        const info = await doc.loadInfo() // download proporties and worksheets
     
        const titleDoc = await doc.updateProperties({ title: 'Students data' })//rename title document
    
        const sheet = doc.sheetsByIndex[0]//данные из первого листа
        console.log(`Document name: ${doc.title};\nWorksheet name: ${sheet.title};\nRows: ${sheet.rowCount};`)

        const rows = await sheet.getRows({
            offset: 0 
            
        })//получаем данные из ячеек с 1-го эл-а, не включ. заголовки
        
        const arr = rows.map(row => {
          return studentData(row)
         })//вывод всех данных о студентах
        const studData = arr.reduce((acc, currVal) => (acc[currVal.studName] = currVal, acc), {})
        const json = JSON.stringify(studData)
          fs.writeFile(
            path.join(__dirname, 'studentsData.json'),
             json,
            (err)=>{
                if (err) throw err
                console.log('file was created')
            }
            )
    }
   catch(err){
       console.log(err)
   }
  
}


 accessSpreadsheet()


const studentData = (student) => {
    // console.log(`Name: ${student['Student Name']}`)
    // console.log(`Gender: ${student.Gender}`)
    // console.log(`Major: ${student.Major}`)
    // console.log(`Activity: ${student['Extracurricular Activity']}`)
    // console.log(`Home: ${student['Home State']}`)
    // console.log('------------------------')
    const stud = {
        studName: student['Student Name'],
        gender: student.Gender, 
        major: student.Major,
        activity: student['Extracurricular Activity'],
        home: student['Home State']
    }
    return stud
} 



//----------------------add list2

class NewSheet{
    constructor(sheetName, fullName, email, phone, subject){
        this.sheetName = sheetName;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone
        this.subject = subject
    }
    then(resolve, reject){
        resolve(doc.addSheet({title: this.sheetName,
        headerValues:[this.fullName, this.email, this.phone, this.subject]}))
    }
}

const addTeacherSheet = async() => { 
   
    const tutors = await new NewSheet('Tutors', 'fullname', 'email', 'phone', 'subject')//создали новый лист
    const addDataRows = await tutors.addRows([
        {
            fullname: 'Mark Tven',
            email: 'mark@mail.ru',
            phone: '78-35-21',
            subject:'Art'
        },
        {
            fullname: 'Eliza Jog',
            email: 'liz@gmail.com',
            phone: '78-15-32',
            subject:'Math'
        },
        {
            fullname: 'Evan Don',
            email: 'eva@gmail.com',
            phone: '78-65-11',
            subject:'Physics'
        },
        {
            fullname: 'Duglas Mor',
            email: 'duglas@yapzor.com',
            phone: '78-12-52',
            subject:'English'
        },
        {
            fullname: 'Duglasss Mor',
            email: 'duglas@yapzor.com',
            phone: '78-12-52',
            subject:'English'
        }
    ])

    const rows = await tutors.getRows()
   
    
  
}
addTeacherSheet()



