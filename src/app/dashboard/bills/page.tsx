import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';

//import dayjs from 'dayjs';

import { config } from '@/config';
import { BillsFilters } from '@/components/dashboard/Bills/bills-filters';
import { BillsTable } from '@/components/dashboard/Bills/bills-table';
import type { Bill } from '@/components/dashboard/Bills/bills-table';

export const metadata = { title: `Bills | Dashboard | ${config.site.name}` } satisfies Metadata;

// Sample bill data
const bills = [
  {
    id: 'BILL-001',
    name: 'Alcides Antonio',
    phone: '123-456-7890',
    address: { street: 'Street1', city: 'City1', state: 'State1', country: 'Country1' },
    amount: 200.5,
    status: 'pending',
  },
  {
    id: 'BILL-002',
    name: 'Marcus Finn',
    phone: '987-654-3210',
    address: { street: 'Street2', city: 'City2', state: 'State2', country: 'Country2' },
    amount: 150.0,
    status: 'paid',
  },

  {
    id: 'BILL-002',
    name: 'Marcus Finn',
    phone: '987-654-3210',
    address: { street: 'Street2', city: 'City2', state: 'State2', country: 'Country2' },
    amount: 150.0,
    status: 'overdue',
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedBills = applyPagination(bills, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Bills</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <BillsFilters />
      <BillsTable count={paginatedBills.length} page={page} rows={paginatedBills} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}

function applyPagination(rows: Bill[], page: number, rowsPerPage: number): Bill[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
