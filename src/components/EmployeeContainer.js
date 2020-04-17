import React, {Component} from "react";
import EmployeeRow from "./EmployeeRow";
import employees from "../utils/employees"


class EmployeeContainer extends Component{

    state = {
        currEmployees: [],
        allEmployees: []
    }

    componentDidMount (){
        employees.getEmployees().then(res=>{
            let empList = res.data.results;
            this.setState({
                currEmployees: getEmpData(empList),
                allEmployees : empList
            });
        })

    }

    render(){
       
        return(
            <table>
                <tbody>
               {this.state.currEmployees}
                </tbody>
            </table>
        )
    }


}

function getEmpData(emps){
    let empArray = emps.map(element =>{
        let employee = {
            name: element.name.first+" "+ element.name.last,
            email: element.email,
            phone: element.phone,
            pic: element.picture.large,
            id: element.id.value
        }
        return <EmployeeRow name={employee.name} email={employee.email} phone = {employee.phone} pic={employee.pic} key={employee.id}></EmployeeRow>
    });
    return empArray;
}

export default EmployeeContainer;