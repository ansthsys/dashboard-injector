// import * as react from 'react'
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Paper,
  Table,
  Button,
  TableRow,
  Backdrop,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Reader() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  function handleRead() {
    const URI = 'https://witty-selected-humpback.ngrok-free.app';

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
    };

    setLoading(true);

    fetch(`${URI}/read_data`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {}, [data]);

  return (
    <Container>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Backdrop>

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

      {data ? (
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
              <TableRow
                key={data.barcode}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
              <TableRow
                key={data.version}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" align="left" scope="row">
                  Version
                </TableCell>
                <TableCell align="left">{data.version}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Container>
  );
}
