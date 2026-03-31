import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, UserPlus, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { DataTable } from '@/src/components/tables/DataTable';
import axiosInstance from '@/src/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export default function UsersPage() {
  const [search, setSearch] = React.useState('');

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const response = await axiosInstance.get('/users', {
        params: { search, perPage: 50 },
      });
      return response.data;
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.getValue('role') === 'admin' ? 'default' : 'info'} className="capitalize">
          {row.getValue('role')}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'destructive'}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'MMM d, yyyy'),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient-info">Users</h1>
          <p className="text-muted-foreground mt-1">Manage your team members and their roles.</p>
        </div>
        <Button variant="gradient">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter users by name or email..."
            className="pl-10 border-border focus:ring-primary/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <DataTable columns={columns} data={usersData?.data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
