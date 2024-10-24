import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box, Checkbox, TextField, Divider, FormControlLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const apiURL = 'http://localhost:5050';

function Userdash() {
  const [minSeats, setMinSeats] = useState('');
  const [projector, setProjector] = useState(false);
  const [whiteboard, setWhiteboard] = useState(false);
  const [speakerSystem, setSpeakerSystem] = useState(false);
  const [floors, setFloors] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);


  const handleSearch = async () => {
    try {
      const params = {};
  
      // Conditionally add parameters only if they have been modified from their default state
      if (minSeats) {
        params.minSeats = minSeats;  // Only include minSeats if it's been set
      }
      if (projector !== false) {
        params.projector = projector;  // Include only if projector is true
      }
      if (whiteboard !== false) {
        params.whiteboard = whiteboard;  // Include only if whiteboard is true
      }
      if (speakerSystem !== false) {
        params.speakerSystem = speakerSystem;  // Include only if speakerSystem is true
      }
  
      // Log the params to see what is being sent
      console.log('API request params:', params);
  
      // Make the API request with the filtered params
      const response = await axios.get(`${apiURL}/floors`, { params });
  
      // Filter only floors that have non-empty rooms array
      const floorsWithRooms = response.data.filter(floor => floor.rooms.length > 0);
      setFloors(floorsWithRooms);
      setSearchAttempted(true); // Mark search as attempted
    } catch (error) {
      console.error('Error fetching floors:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  

  console.log(floors);

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f6f0ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100vw' }}>
      {/* Welcome Section */}
      <Box mb={4} textAlign="center">
        <Typography variant="h4" color="primary" sx={{ marginBottom: '1rem' }}>
          Welcome, User!
        </Typography>

        {/* Search Form */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <TextField
            label="Seats"
            variant="outlined"
            value={minSeats} // Updated field name
            onChange={(e) => setMinSeats(e.target.value)}
            sx={{ marginRight: '1rem' }}
          />
          <FormControlLabel
            control={<Checkbox checked={projector} onChange={(e) => setProjector(e.target.checked)} />}
            label="Projector"
          />
          <FormControlLabel
            control={<Checkbox checked={whiteboard} onChange={(e) => setWhiteboard(e.target.checked)} />}
            label="Whiteboard"
          />
          <FormControlLabel
            control={<Checkbox checked={speakerSystem} onChange={(e) => setSpeakerSystem(e.target.checked)} />}
            label="Speaker System"
          />
          <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginLeft: '1rem' }}>
            Search
          </Button>
        </Box>

        <Divider />
      </Box>

      {/* Room Cards Section */}
      <Grid container spacing={3} mt={2} justifyContent="center">
        {/* Show a message if rooms list is empty */}
        {floors.length === 0 && !searchAttempted && (
          <Typography variant="h6" color="textSecondary">
            Apply filters to get appropriate rooms.
          </Typography>
        )}

        {floors.length === 0 && searchAttempted && (
          <Typography variant="h6" color="error">
            No rooms found with these filters.
          </Typography>
        )}

        {/* Map over floors and display each room */}
        {floors.map(floor => (
          floor.rooms.map(room => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Card
                sx={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" color="textPrimary">
                    Room {room.roomName} (ID: {room.roomNumber})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Floor: {floor.id} (Floor Number: {floor.floorNumber})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Seats: {room.seats}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Projector: {room.projector ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Whiteboard: {room.whiteboard ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Speaker System: {room.speakerSystem ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Booked: {room.isBooked ? 'Yes' : 'No'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ))}
      </Grid>
    </Box>
  );
}

export default Userdash;
