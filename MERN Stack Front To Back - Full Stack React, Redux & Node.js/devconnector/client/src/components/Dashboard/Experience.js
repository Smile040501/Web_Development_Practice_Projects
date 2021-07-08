import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

import { deleteExperience } from "../../redux/actions/index";

const Experience = (props) => {
    const dispatch = useDispatch();

    const onDeleteClick = (id) => {
        dispatch(deleteExperience(id));
    };

    const experience = props.experience.map((exp) => (
        <tr key={exp.id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                {exp.to === null ? " Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
            </td>
            <td>
                <button onClick={() => onDeleteClick(exp.id)} className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h4 className="mb-4">Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                    {experience}
                </thead>
            </table>
        </div>
    );
};

export default Experience;
