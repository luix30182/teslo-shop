import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows if order already paid',
    width: 200,
    renderCell: (params: GridRenderCellParams<any, any, any>) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Pending" variant="outlined" />
      );
    }
  },
  {
    field: 'order',
    headerName: 'Order',
    description: 'Go to order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, any, any>) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link>See order</Link>
        </NextLink>
      );
    }
  }
];

const rows = [
  {
    id: 1,
    fullname: 'Steffie Bristo',
    paid: true
  },
  {
    id: 2,
    fullname: 'Gerik Yarnell',
    paid: true
  },
  {
    id: 3,
    fullname: 'Shayna Ivan',
    paid: false
  },
  {
    id: 4,
    fullname: 'Nikaniki Shaddock',
    paid: true
  },
  {
    id: 5,
    fullname: 'Angeli Focke',
    paid: true
  },
  {
    id: 6,
    fullname: 'Wadsworth Francklyn',
    paid: true
  },
  {
    id: 7,
    fullname: 'Des Whelpdale',
    paid: true
  },
  {
    id: 8,
    fullname: 'Sheff Vondrach',
    paid: true
  },
  {
    id: 9,
    fullname: 'Stephan Fetherby',
    paid: true
  },
  {
    id: 10,
    fullname: 'Poppy Coutts',
    paid: true
  }
];

const History = () => {
  return (
    <ShopLayout title="Orders history" pageDescription="Client order history">
      <Typography variant="h1" component="h1">
        Orders History
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default History;
