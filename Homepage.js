import React, { useState } from 'react';

const Homepage = ({ onContinue }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    disabilities: {
      mute: false,
      deaf: false,
      visuallyImpaired: false,
    },
    emergencyName: '',
    emergencyNumber: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.disabilities) {
      setForm({
        ...form,
        disabilities: { ...form.disabilities, [name]: checked },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleGender = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission or validation here
    onContinue(form);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #1a0826 60%, #d72660 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(30, 0, 40, 0.95)', borderRadius: 18, boxShadow: '0 2px 24px #0008', padding: '2.5rem 2rem', width: 350, maxWidth: '90%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'cursive', color: '#fff', fontSize: '2.2rem', marginBottom: 0, letterSpacing: 2 }}>WE ARE ONE</h1>
          <div style={{ color: '#d72660', fontWeight: 'bold', letterSpacing: 2, fontSize: '1.1rem', marginTop: 2 }}>WELCOME</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#fff', fontWeight: 500 }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 16, marginTop: 2, padding: 8, borderRadius: 4, border: 'none', background: '#2d1436', color: '#fff' }} />
          <label style={{ color: '#fff', fontWeight: 500 }}>Age</label>
          <input name="age" value={form.age} onChange={handleChange} required type="number" min="1" style={{ width: '100%', marginBottom: 16, marginTop: 2, padding: 8, borderRadius: 4, border: 'none', background: '#2d1436', color: '#fff' }} />
          <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Voice Gender:</div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <label style={{ color: '#fff' }}>
              <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleGender} required /> Male
            </label>
            <label style={{ color: '#fff' }}>
              <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleGender} required /> Female
            </label>
          </div>
          <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Select Your Disability:</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <label style={{ color: '#fff' }}>
              <input type="checkbox" name="mute" checked={form.disabilities.mute} onChange={handleChange} /> Mute
            </label>
            <label style={{ color: '#fff' }}>
              <input type="checkbox" name="deaf" checked={form.disabilities.deaf} onChange={handleChange} /> Deaf
            </label>
            <label style={{ color: '#fff' }}>
              <input type="checkbox" name="visuallyImpaired" checked={form.disabilities.visuallyImpaired} onChange={handleChange} /> Visually Impaired
            </label>
          </div>
          <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4, marginTop: 10 }}>Emergency Contact</div>
          <input name="emergencyName" value={form.emergencyName} onChange={handleChange} required placeholder="Name" style={{ width: '100%', marginBottom: 10, marginTop: 2, padding: 8, borderRadius: 4, border: 'none', background: '#2d1436', color: '#fff' }} />
          <input name="emergencyNumber" value={form.emergencyNumber} onChange={handleChange} required placeholder="Contact Number" type="tel" style={{ width: '100%', marginBottom: 18, marginTop: 2, padding: 8, borderRadius: 4, border: 'none', background: '#2d1436', color: '#fff' }} />
          <button type="submit" style={{ width: '100%', padding: '12px 0', borderRadius: 6, background: '#d72660', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', marginTop: 8, letterSpacing: 1 }}>Save Details</button>
        </form>
      </div>
    </div>
  );
};

export default Homepage; 