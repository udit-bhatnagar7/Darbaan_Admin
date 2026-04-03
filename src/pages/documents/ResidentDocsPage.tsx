import React from 'react';
import { 
  Users, 
  Upload, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  FileText, 
  Clock,
  Filter,
  User,
  Home
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const residentDocs = [
  { id: 1, name: 'ID_Proof_B402.pdf', type: 'PDF', size: '1.2 MB', date: '5 hours ago', resident: 'Rajesh Kumar', unit: 'B-402', category: 'KYC' },
  { id: 2, name: 'Rent_Agreement_C701.pdf', type: 'PDF', size: '3.5 MB', date: '1 day ago', resident: 'Suresh Raina', unit: 'C-701', category: 'Lease' },
  { id: 3, name: 'Vehicle_RC_A105.jpg', type: 'JPG', size: '950 KB', date: '3 days ago', resident: 'Pooja Sharma', unit: 'A-105', category: 'Vehicle' },
  { id: 4, name: 'Move_In_Form_D203.pdf', type: 'PDF', size: '1.1 MB', date: '1 week ago', resident: 'Hardik Pandya', unit: 'D-203', category: 'Admin' },
  { id: 5, name: 'Maintenance_Receipt_Jan.pdf', type: 'PDF', size: '450 KB', date: '2 weeks ago', resident: 'Virat Kohli', unit: 'B-203', category: 'Billing' }
];

export default function ResidentDocsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 rounded-full text-white shadow-lg shadow-purple-500/20">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Resident Documents</h1>
            <p className="text-muted-foreground mt-1">Manage KYC, lease agreements, and other resident-specific files.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Home className="mr-2 h-4 w-4" />
            Unit View
          </Button>
          <Button size="sm" className="h-9 bg-purple-600 hover:bg-purple-700 text-white">
            <Upload className="mr-2 h-4 w-4" />
            Request Document
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Residents</p>
            <h3 className="text-xl font-bold">240</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Uploaded Docs</p>
            <h3 className="text-xl font-bold">842</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Missing KYC</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
        </Card>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="text-purple-500" size={18} />
            Resident Repository
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or unit..." 
                className="pl-9 h-9 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-4 py-3">Document</th>
                  <th className="px-4 py-3">Resident / Unit</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Last Modified</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {residentDocs.map((doc, idx) => (
                  <motion.tr 
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center",
                          doc.type === 'PDF' ? "bg-rose-50 text-rose-600" :
                          doc.type === 'JPG' ? "bg-blue-50 text-blue-600" :
                          "bg-indigo-50 text-indigo-600"
                        )}>
                          <FileText size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[150px]">{doc.name}</p>
                          <p className="text-[10px] text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="font-medium">{doc.resident}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.unit}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10px] font-bold">{doc.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye size={14} className="text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download size={14} className="text-emerald-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={14} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
