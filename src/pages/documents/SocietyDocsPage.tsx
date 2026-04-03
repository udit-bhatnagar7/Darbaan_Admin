import React from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  Building2, 
  ShieldCheck, 
  Clock,
  Filter,
  Plus
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const societyDocs = [
  { id: 1, name: 'Society_Bylaws_2024.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', category: 'Compliance' },
  { id: 2, name: 'Fire_Safety_Certificate.pdf', type: 'PDF', size: '1.8 MB', date: '3 days ago', category: 'Safety' },
  { id: 3, name: 'Annual_Audit_Report_2023.pdf', type: 'PDF', size: '4.2 MB', date: '1 week ago', category: 'Finance' },
  { id: 4, name: 'Society_Registration_Certificate.jpg', type: 'JPG', size: '3.1 MB', date: '1 month ago', category: 'Legal' },
  { id: 5, name: 'Maintenance_Policy_v2.docx', type: 'DOCX', size: '850 KB', date: '2 months ago', category: 'Policy' }
];

export default function SocietyDocsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/20">
            <Building2 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Society Documents</h1>
            <p className="text-muted-foreground mt-1">Central repository for all official society records and compliance files.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Compliance Check
          </Button>
          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Documents</p>
            <h3 className="text-xl font-bold">48</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Verified Files</p>
            <h3 className="text-xl font-bold">42</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
            <h3 className="text-xl font-bold">6</h3>
          </div>
        </Card>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="text-blue-500" size={18} />
            Official Repository
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search documents..." 
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
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Last Modified</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {societyDocs.map((doc, idx) => (
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
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-[10px] font-bold">{doc.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.size}</td>
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
