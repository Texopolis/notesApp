
const getStudents = async () =>{

    try {
        let response = await fetch('https://api.hatchways.io/assessment/students')
        let students = await response.json()
        students.students.map((item, index )=> {
            item["clicked"] = false;
            item["id"]=index
            item["tags"]=[]
        })
        return students.students
        
    } catch (error) {
        alert(error)

    }

    
}

export { getStudents }
