
const getStudents = async () =>{

    try {
        let response = await fetch('https://api.hatchways.io/assessment/students')
        let students = await response.json()
        return students.students
        
    } catch (error) {
        alert(error)
    }

  
}

export { getStudents }
