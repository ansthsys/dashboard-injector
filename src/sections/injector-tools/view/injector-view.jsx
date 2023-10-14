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

// ----------------------------------------------------------------------

export default function Injector() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  function handleInject(item) {
    const URI = 'https://witty-selected-humpback.ngrok-free.app';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(item),
    };

    setLoading(true);

    fetch(`${URI}/write_data`, requestOptions)
      .then((res) => {
        setTimeout(() => {
          getListInjectable();
        }, 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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

      setLoading(true);

      fetch(`${URI}/eeprom`, requestOptions)
        .then((res) => res.json())
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      setData(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getListInjectable();
  }, []);

  console.log(data);

  if (data === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.version}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleInject(row)}>
                      Inject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="exclusive" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={5} align="center">
                  Data is empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
