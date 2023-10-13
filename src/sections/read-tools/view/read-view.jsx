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
} from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Reader() {
  const [data, setData] = useState({
    id: 1,
    barcode: 'FD-9D-8S-C0',
    name: 'Feeder 1',
    token: 'ao87DGAS8jausdh1',
    uuid: '81273918742918-9090-asda-ihadagff',
    jwt: 'ey938yr7egfudfisgfsdif',
    type: 'FISH',
    version: 'V.1.0',
    status: 'inject',
  });

  function handleRead() {
    console.log('read data');
  }

  function formatDate(dateTime) {
    const date = new Date(dateTime.split(' ')[0]);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }

  function formatTime(dateTime) {
    const time = new Date(dateTime);
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('id-ID', options).format(time);
  }

  // useEffect(() => {
  //   getListInjectable();
  // }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Read EEPROM</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mdi:eye" />}
          onClick={() => handleRead()}
        >
          Read
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 500, mx: 'auto', my: '50px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} align="center">
                Data from EEPROM
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={data.barcode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" align="left" scope="row">
                Barcode
              </TableCell>
              <TableCell align="left">{data.barcode}</TableCell>
            </TableRow>
            <TableRow key={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" align="left" scope="row">
                Machine Name
              </TableCell>
              <TableCell align="left">{data.name}</TableCell>
            </TableRow>
            <TableRow key={data.type} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" align="left" scope="row">
                type
              </TableCell>
              <TableCell align="left">{data.type}</TableCell>
            </TableRow>
            <TableRow key={data.version} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" align="left" scope="row">
                Version
              </TableCell>
              <TableCell align="left">{data.version}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
