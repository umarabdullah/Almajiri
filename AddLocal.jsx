import React, { useState, useEffect, useRef } from 'react';
import { statesAndLgas } from '../data/nigeriaStates'; // Adjust the import path as necessary
import { affiliateList } from '../data/affiliateData'; // Adjust the import path as necessary
import 'react-datepicker/dist/react-datepicker.css';
import NavbarProfile from '../components/NavbarProfile';
import AffiliateCard from '../components/AffiliateCard';
import '../data/localData'; // assume this file handles storage
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { blue, blueGrey } from '@mui/material/colors';


import Select from '@mui/material/Select';

const AddLocal = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [dob, setDob] = React.useState(dayjs('2012-01-01'));
  const [photo, setPhoto] = useState(null);
  const [fingerprint, setFingerprint] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [affiliate, setAffiliate] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [gender, setGender] = useState('');
  const [cleared, setCleared] = React.useState(false);
  const filter = createFilterOptions();
  const [open, toggleOpen] = React.useState(false);
  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });
    toggleOpen(false);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  }));
  const [dialogValue, setDialogValue] = React.useState({
    
    name: '',
    schoolName: '',
    schoolAdress: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      schoolName: dialogValue.schoolName,
      schoolAdress: dialogValue.schoolAdress,
    });
    handleClose();
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);  
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => window.removeEventListener('resize', handleResize);
  
  }, [cleared]);
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteAffiliate = () => {
    handleClose();
    setAffiliate('');
  };
  const handleFingerprintChange = (e) => {
    if (e.target.files.length > 0) setFingerprint(true);
  };
  const photoInputRef = useRef(null);
  const fingerprintInputRef = useRef(null);
  const handleSave = () => {
    if (!name || !surname || !dob || !selectedState || !selectedLga || !photo || !fingerprint || !affiliate) {
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
      gender,
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
    submitDiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',},

    notification: {
      color: 'green',
      fontWeight: 'bold',
      marginTop: '1rem',
    },
    sectionContainer: {
      marginBottom: '1rem',
      marginTop: '1rem',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
    }
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
          <div style={styles.sectionContainer}> 
          <h2 style={styles.sectionTitle}>Demography</h2>
          <div style={styles.grid}>
            <div style={styles.group}>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField required id="name" value={name} label="Birth Name" variant="standard" onChange={(e) => setName(e.target.value)} />
              </Box>
            </Box>
            </div>
            <div style={styles.group}>
             <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField required id="surname" value={surname} label="Surname" variant="standard" onChange={(e) => setSurname(e.target.value)}  />
              </Box>
            </Box>
            </div>
            <div style={styles.group}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    required
                    label="Date of Birth"
                    value={dob}
                    sx={{ width: 300 }}
                      slotProps={{
                   field: { clearable: true, onClear: () => setCleared(true) },
                 }}
                    onChange={(newValue) => setDob(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            
            <div style={styles.group}>
               <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="male"
                >
                  <FormControlLabel value="male" control={<Radio />} onChange={(value) => setGender(value)} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} onChange={(value) => setGender(value)} label="Female" />
                  
                  
                </RadioGroup>
              </FormControl>
              </div>
            <div style={styles.group}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="stateLabel">State Of Origin</InputLabel>
                  <Select
                    required
                    sx={{ width: 300 }}
                    labelId="stateLabel"
                    id="nigState"
                    value={selectedState}
                    label="Age"
                    onChange={(e) => { setSelectedState(e.target.value); setSelectedLga(''); }}
                  >
                  <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Object.keys(statesAndLgas).map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
                    </Select>
                  
                  </FormControl>
            </div>
            <div style={styles.group}>
              
              
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="lgaLabel">Local Government Area</InputLabel>
                  <Select
                    sx={{ width: 300 }}
                    labelId="lgaLabel"
                    id="stateLga"
                    value={selectedLga}
                    label="Local Government Area"
                    onChange={(e) => setSelectedLga(e.target.value)} disabled={!selectedState} 
                  >
                  {selectedState && statesAndLgas[selectedState].map((lga) => (
                  <MenuItem key={lga} value={lga}>{lga}</MenuItem>
                ))}
                    </Select>
                  
                  </FormControl>
            </div>
          </div>
          </div>
          <Divider  />
          <div style={styles.sectionContainer}> 
          <h2 style={styles.sectionTitle}>Affiliations</h2>
          <div style={styles.group}>
           
          </div>
          <div style={styles.group}> 
                    <React.Fragment>
                <Autocomplete
                  value={affiliate}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      // timeout to avoid instant validation of the dialog's form.
                      setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({
                          name: newValue,
                          year: '',
                        });
                      });
                    } else if (newValue && newValue.inputValue) {
                      toggleOpen(true);
                      setDialogValue({
                        name: newValue.inputValue,
                        year: '',
                      });
                    } else {
                      setAffiliate(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  id="affiliate-autocomplete"
                  options={affiliateList}
                  getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <li key={key} {...optionProps}>
                        {option.name}
                      </li>
                    );
                  }}
                  sx={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Registered Affiliates" />}
                />
                <Dialog open={open} onClose={handleClose}>
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new Affiliate</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Affiliate Not Found? Please, add Affiliate!
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.name}
                        onChange={(event) =>
                          setDialogValue({
                            ...dialogValue,
                            name: event.target.value,
                          })
                        }
                        label="name"
                        type="text"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="madrasatName"
                        value={dialogValue.madrasatName}
                        onChange={(event) =>
                          setDialogValue({
                            ...dialogValue,
                            madrasatName: event.target.value,
                          })
                        }
                        label="madrasatName"
                        type="Text"
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="address"
                        value={dialogValue.address}
                        onChange={(event) =>
                          setDialogValue({
                            ...dialogValue,
                            address: event.target.value,
                          })
                        }
                        label="address"
                        type="Text"
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Add</Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </React.Fragment>
          </div>
          {affiliate && (
                <div style={styles.group}> 
                <AffiliateCard
                  name={affiliate.name}
                  madrasatName={affiliate.madrasatName}
                  address={affiliate.address}
                />
              </div>
          )}
          </div>
          <Divider  />
          <div style={styles.sectionContainer}> 
          <h2 style={styles.sectionTitle}>Biometric</h2>
          <div style={styles.grid}>
            <div style={styles.group}>
              <label style={styles.label}>Upload / Take Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} ref={photoInputRef} />
            </div>
            <div style={styles.group}> </div>
            <div style={styles.group}>
              <label style={styles.label}>Upload Fingerprint File</label>
              <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFingerprintChange} ref={fingerprintInputRef} />
              {fingerprint && <div><input type="checkbox" checked readOnly /> Fingerprint Uploaded</div>}
            </div>
               </div >
               </div>
                <Divider  />
               <div style={styles.submitDiv}>
                  <Stack spacing={2} direction="row" marginTop={2}>
              <ColorButton variant="contained" onClick={handleSave}>Submit</ColorButton>
            </Stack>
            </div>
          {showNotification && <div style={styles.notification}>Data saved successfully!</div>}
        </div>
      </div>
    </>
  );
};

export default AddLocal;
