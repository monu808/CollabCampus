import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [skills, setSkills] = useState([{ name: '', proficiency: 'Beginner' }]);

  const handleSkillChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index][e.target.name] = e.target.value;
    setSkills(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/users/me', { skills }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            name="name"
            placeholder="Skill (e.g., Python)"
            value={skill.name}
            onChange={(e) => handleSkillChange(index, e)}
          />
          <select
            name="proficiency"
            value={skill.proficiency}
            onChange={(e) => handleSkillChange(index, e)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={() => setSkills([...skills, { name: '', proficiency: 'Beginner' }])}>
        Add Skill
      </button>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileForm;