// import * as react from 'react'
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Paper,
  Table,
  TableRow,
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
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const displayData = searchKey ? filteredData : data;

  function getListInjectable() {
    try {
      const URI = 'https://l4dz56mh-3000.asse.devtunnels.ms';
      const requestOptions = {
        method: 'GET',
        header: {
          Accept: 'application/json',
        },
      };

      fetch(`${URI}/history`, requestOptions)
        .then((res) => res.json())
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
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

  function searchHandle(e) {
    const key = e.target.value;
    setSearchKey(key);

    // eslint-disable-next-line arrow-body-style
    const filter = data.filter((item) => {
      return (
        item.barcode.toLowerCase().includes(key.toLowerCase()) ||
        item.name.toLowerCase().includes(key.toLowerCase()) ||
        formatTime(item.DateTime).toLocaleLowerCase().includes(key.toLowerCase()) ||
        formatDate(item.DateTime).toLocaleLowerCase().includes(key.toLowerCase())
      );
    });

    setFilteredData(filter);
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
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">History Inject</Typography>

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
              <TableCell align="center">Barcode</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              displayData.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" align="center" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{formatTime(row.DateTime)}</TableCell>
                  <TableCell align="center">{formatDate(row.DateTime)}</TableCell>
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
