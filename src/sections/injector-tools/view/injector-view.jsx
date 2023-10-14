// import * as react from 'react'
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function Injector() {
  const [data, setData] = useState(null);

  function handleInject(id) {
    console.log('Injected', id);
  }

  function getListInjectable() {
    try {
      const URI = 'https://l4dz56mh-3000.asse.devtunnels.ms';
      const requestOptions = {
        method: 'GET',
        header: {
          Accept: 'application/json',
        },
      };

      fetch(`${URI}/eeprom`, requestOptions)
        .then((res) => res.json())
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListInjectable();
  }, []);

  console.log(data);

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Injector Tools</Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Version</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.barcode}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.version}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" onClick={() => handleInject(row.id)}>
                    Inject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
