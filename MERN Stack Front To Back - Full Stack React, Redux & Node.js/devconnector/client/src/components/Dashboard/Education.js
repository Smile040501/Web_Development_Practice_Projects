import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

import { deleteEducation } from "../../redux/actions/index";

const Education = (props) => {
    const dispatch = useDispatch();

    const onDeleteClick = (id) => {
        dispatch(deleteEducation(id));
    };

    const education = props.education.map((edu) => (
        <tr key={edu.id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
            </td>
            <td>
                <button onClick={() => onDeleteClick(edu.id)} className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h4 className="mb-4">Education Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {education}
                </thead>
            </table>
        </div>
    );
};

export default Education;
