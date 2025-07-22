import React from 'react';
import './MemberDetailTab.css'

const statusColor = {
  "Completed": "green",
  "In progress": "orange",
  "Past due date": "red"
};

const MemberDetailTab = ({ member }) => {
  return (
    <div className="detail-tab">
      <table className="member-table">
        <thead>
          <tr>
            <th>Course name</th>
            <th>Course Due Date</th>
            <th>Completion Date</th>
            <th>Course Status</th>
            <th>Course Score</th>
            <th>Feedback Given</th>
          </tr>
        </thead>
        <tbody>
          {member.courses.map((course, i) => (
            <tr key={i}>
              <td>{course.title}</td>
              <td>{course.dueDate}</td>
              <td>{course.completionDate}</td>
              <td>
                <span
                  style={{
                    background: statusColor[course.status],
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                >
                  {course.status}
                </span>
              </td>
              <td>{course.score}</td>
              <td>{course.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDetailTab;
