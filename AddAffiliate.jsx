import React, { useState, useEffect } from 'react';
import { statesAndLgas } from '../data/nigeriaStates'; // Adjust the import path as necessary
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavbarProfile from '../components/NavbarProfile';
import '../data/localData'; // assume this file handles storage

const AddAffiliate = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [dob, setDob] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [fingerprint, setFingerprint] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [affiliate, setAffiliate] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFingerprintChange = (e) => {
    if (e.target.files.length > 0) setFingerprint(true);
  };

  const handleSave = () => {
    if (!name || !surname || !dob || !selectedState || !selectedLga || !photo || !fingerprint) {
      alert('All fields are required.');
      return;
    }

    const newEntry = {
      name,
      surname,
      dob,
      state: selectedState,
      lga: selectedLga,
      photo,
      fingerprint,
      affiliate,
    };

    // Simulate saving to a local file (in reality you would update a state or make an API call)
    const savedData = JSON.parse(localStorage.getItem('localData') || '[]');
    savedData.push(newEntry);
    localStorage.setItem('localData', JSON.stringify(savedData));

    // Reset form
    setName('');
    setSurname('');
    setDob(null);
    setSelectedState('');
    setSelectedLga('');
    setPhoto(null);
    setFingerprint(false);
    setAffiliate('');
    setShowNotification(true);

    setTimeout(() => setShowNotification(false), 3000);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
      paddingTop: '80px',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingBottom: '1rem',
      boxSizing: 'border-box',
      width: '100vw',
    },
    container: {
      width: '100%',
      maxWidth: '800px',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
    },
    photoContainer: {
      position: isMobile ? 'relative' : 'absolute',
      top: isMobile ? '0' : '1rem',
      right: isMobile ? '0' : '1rem',
      textAlign: isMobile ? 'center' : 'right',
      width: isMobile ? '100%' : 'auto',
      marginBottom: isMobile ? '1rem' : '0',
    },
    photoPreview: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: '2rem',
      marginBottom: '1rem',
      color: '#333',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1rem',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '0.875rem',
      color: '#555',
      marginBottom: '0.5rem',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    saveButton: {
      marginTop: '2rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    notification: {
      color: 'green',
      fontWeight: 'bold',
      marginTop: '1rem',
    },
  };

  return (
    <>
      <NavbarProfile />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          {photo && (
            <div style={styles.photoContainer}>
              <img src={photo} alt="Preview" style={styles.photoPreview} />
            </div>
          )}

          <h2 style={styles.sectionTitle}>Demography</h2>
          <div style={styles.grid}>
            <div style={styles.group}>
              <label style={styles.label}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter local's name" style={styles.input} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Surname</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Enter surname" style={styles.input} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Date of Birth</label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                placeholderText="Select or enter date"
                dateFormat="yyyy-MM-dd"
                className="react-datepicker__input-container"
                style={styles.input}
              />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>State of Origin</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedLga(''); }} style={styles.input}>
                <option value="">Select state</option>
                {Object.keys(statesAndLgas).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Local Government Area</label>
              <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)} disabled={!selectedState} style={styles.input}>
                <option value="">Select LGA</option>
                {selectedState && statesAndLgas[selectedState].map((lga) => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 style={styles.sectionTitle}>Affiliations</h2>
          <div style={styles.group}>
            <label style={styles.label}>Search Affiliate</label>
            <input type="text" value={affiliate} onChange={(e) => setAffiliate(e.target.value)} placeholder="Search by ID, School name, or Mallam name" style={styles.input} />
            <small>If not found, <a href="#">add an affiliate?</a></small>
          </div>

          <h2 style={styles.sectionTitle}>Biometric</h2>
          <div style={styles.grid}>
            <div style={styles.group}>
              <label style={styles.label}>Upload / Take Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Upload Fingerprint File</label>
              <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFingerprintChange} />
              {fingerprint && <div><input type="checkbox" checked readOnly /> Fingerprint Uploaded</div>}
            </div>
          </div>

          <button style={styles.saveButton} onClick={handleSave}>Save</button>
          {showNotification && <div style={styles.notification}>Data saved successfully!</div>}
        </div>
      </div>
    </>
  );
};

export default AddAffiliate;
