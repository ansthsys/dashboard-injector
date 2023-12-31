// import * as react from 'react'
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Chip,
  Paper,
  Table,
  Button,
  TableRow,
  Backdrop,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableContainer,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Injector() {
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const displayData = searchKey ? filteredData : data;

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

  function searchHandle(e) {
    const key = e.target.value;
    setSearchKey(key);

    // eslint-disable-next-line arrow-body-style
    const filter = data.filter((item) => {
      return (
        item.barcode.toLowerCase().includes(key.toLowerCase()) ||
        item.name.toLowerCase().includes(key.toLowerCase()) ||
        item.type.toLowerCase().includes(key.toLowerCase()) ||
        item.version.toLowerCase().includes(key.toLowerCase())
      );
    });

    setFilteredData(filter);
  }

  useEffect(() => {
    getListInjectable();
  }, []);

  if (data === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
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

        <TextField
          placeholder="Search data"
          onChange={(e) => searchHandle(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Version</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              displayData.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.version}</TableCell>
                  <TableCell align="center">
                    {row.status === 'inject' ? (
                      <Chip label="Available" color="primary" size="small" variant="outlined" />
                    ) : (
                      <Chip label="Injected" color="warning" size="small" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.status === 'inject' ? (
                      <Button variant="contained" onClick={() => handleInject(row)}>
                        Inject
                      </Button>
                    ) : (
                      <Button variant="outlined" disabled>
                        Inject
                      </Button>
                    )}
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
