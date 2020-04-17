import React from "react";



function EmployeeRow(props) {
    return (

        <tr>
            <td>
            <img src={props.pic} alt="profilePic"></img>
            </td>
            <td> 
                <p>{props.name}</p>
            </td>
            <td> 
            <p>{props.phone}</p>
            </td>
            <td>
            <a href={props.email}>{props.email}</a>
            </td>
        </tr>
    );

}


export default EmployeeRow;