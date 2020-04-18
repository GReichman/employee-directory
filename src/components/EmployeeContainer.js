import React, { Component } from "react";
import EmployeeRow from "./EmployeeRow";
import employees from "../utils/employees"


class EmployeeContainer extends Component {

    state = {
        currEmployees: [],
        allEmployees: [],
        sorting: ""
    }

    componentDidMount() {
        employees.getEmployees().then(res => {
            let empList = res.data.results;
            let empArray = empList.map(element => {
                let employee = {
                    name: element.name.first + " " + element.name.last,
                    email: element.email,
                    phone: element.phone,
                    pic: element.picture.large,
                    id: element.id.value
                }
                return employee
            });
            this.setState({
                currEmployees: empArray,
                allEmployees: empArray
            });
        })

    }

    handleSearch = event => {
        let term = event.target.value;
        const newList = searchList(this.state.allEmployees, term);
        this.setState({
            currEmployees: newList
        });
    }

    handleSort = event => {
        let property = event.target.name;
        let order;

        if (this.state.sorting === property) {
            order = -1;
            this.setState({
                sorting: ""
            });
        } else {
            order = 1;
            this.setState({

                sorting: property
            })
        }
        console.log(this.state.sorting, " ", property)
        let newArr = sortList(order, this.state.currEmployees, property);
        this.setState({
            currEmployees: newArr
        });
    }

    render() {

        return (
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                <tr>
                        <th ><input type="text" onChange={this.handleSearch} placeholder="Search"></input></th>
                        <th ><button className = "btn btn-light" name="name" onClick={this.handleSort}>Name</button></th>
                        <th ><button className = "btn btn-light" name="phone" onClick={this.handleSort}>Phone</button></th>
                        <th ><button className = "btn btn-light" name="email" onClick={this.handleSort}>Email</button></th>

                    </tr>
                </thead>
                <tbody>

                    {createEmpRows(this.state.currEmployees)}
                </tbody>
            </table>
        )
    }


}

function createEmpRows(list) {
    return list.map(element => {
        return <EmployeeRow name={element.name} email={element.email} phone={element.phone} pic={element.pic} key={element.id}></EmployeeRow>
    })
}

function sortList(order, list, property) {
    return list.sort(function (a, b) {
        if (a[property] < b[property]) {
            return -1 * order;
        } else if (a[property] > b[property]) {
            return 1 * order;
        } else {
            return 0;
        }
    });

}

function searchList(list, term) {
    return list.filter(emp => {
        if (emp.name.toUpperCase().includes(term.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    })
}

export default EmployeeContainer;