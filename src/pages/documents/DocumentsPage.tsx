import React from 'react';
import { 
  FileText, 
  Folder, 
  Upload, 
  Search, 
  MoreVertical, 
  Download, 
  Eye, 
  Trash2, 
  Plus, 
  Clock, 
  Users, 
  Building2, 
  Truck,
  ChevronRight,
  Grid,
  List as ListIcon,
  Filter,
  Share2,
  Info
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const folders = [
  { id: 'society', name: 'Society Documents', icon: Building2, count: 12, color: 'text-blue-500 bg-blue-50' },
  { id: 'residents', name: 'Resident Documents', icon: Users, count: 45, color: 'text-purple-500 bg-purple-50' },
  { id: 'vendors', name: 'Vendor Documents', icon: Truck, count: 8, color: 'text-orange-500 bg-orange-50' },
  { id: 'legal', name: 'Legal & Compliance', icon: FileText, count: 5, color: 'text-emerald-500 bg-emerald-50' }
];

const recentFiles = [
  { id: 1, name: 'Society_Bylaws_2024.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', owner: 'Admin', folder: 'Society' },
  { id: 2, name: 'Maintenance_Receipt_B402.jpg', type: 'JPG', size: '1.1 MB', date: '5 hours ago', owner: 'Rajesh K.', folder: 'Residents' },
  { id: 3, name: 'Vendor_Contract_Elevators.docx', type: 'DOCX', size: '850 KB', date: 'Yesterday', owner: 'Admin', folder: 'Vendors' },
  { id: 4, name: 'Annual_Audit_Report.pdf', type: 'PDF', size: '4.2 MB', date: '2 days ago', owner: 'Auditor', folder: 'Legal' },
  { id: 5, name: 'Fire_Safety_Certificate.pdf', type: 'PDF', size: '1.8 MB', date: '3 days ago', owner: 'Admin', folder: 'Society' }
];

export default function DocumentsPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null);

  const filteredFiles = recentFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedFolder || file.folder.toLowerCase() === selectedFolder.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-600 rounded-xl text-white shadow-lg shadow-amber-500/20">
            <Folder size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Document Management</h1>
            <p className="text-muted-foreground mt-1">Securely store, organize, and access all society records.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button size="sm" className="h-9 bg-amber-600 hover:bg-amber-700 text-white">
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Storage Stats (Simplified Drive feel) */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Storage</p>
            <Info size={14} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">12.4 GB</h3>
              <p className="text-xs text-muted-foreground">of 50 GB used</p>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[25%]" />
            </div>
          </div>
        </Card>
        {folders.slice(0, 3).map((folder, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group" onClick={() => setSelectedFolder(folder.id)}>
            <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", folder.color)}>
              <folder.icon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">{folder.name}</h4>
              <p className="text-xs text-muted-foreground">{folder.count} files</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <Card className="overflow-hidden border-none shadow-none bg-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Recent Files</h3>
            {selectedFolder && (
              <Badge variant="secondary" className="gap-1 pr-1">
                {selectedFolder}
                <button onClick={() => setSelectedFolder(null)} className="hover:text-destructive">
                  <Plus size={12} className="rotate-45" />
                </button>
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search files..." 
                className="pl-9 h-9 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex p-1 bg-muted rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                <ListIcon size={16} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                <Grid size={16} />
              </button>
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Folder</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Last Modified</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredFiles.map((file, idx) => (
                    <motion.tr 
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center",
                            file.type === 'PDF' ? "bg-rose-50 text-rose-600" :
                            file.type === 'JPG' ? "bg-blue-50 text-blue-600" :
                            "bg-indigo-50 text-indigo-600"
                          )}>
                            <FileText size={16} />
                          </div>
                          <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[10px] font-bold">{file.folder}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{file.owner}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.size}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye size={14} className="text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download size={14} className="text-emerald-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 size={14} className="text-purple-600" />
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
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFiles.map((file, idx) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-all group cursor-pointer relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center",
                      file.type === 'PDF' ? "bg-rose-50 text-rose-600" :
                      file.type === 'JPG' ? "bg-blue-50 text-blue-600" :
                      "bg-indigo-50 text-indigo-600"
                    )}>
                      <FileText size={24} />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm truncate">{file.name}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted-foreground">{file.size}</p>
                      <p className="text-[10px] text-muted-foreground">{file.date}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full shadow-lg">
                      <Eye size={16} />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full shadow-lg">
                      <Download size={16} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Shared with me / Quick Access */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock size={18} className="text-muted-foreground" />
          Quick Access
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Audit_2023.pdf', type: 'PDF', color: 'bg-rose-50 text-rose-600' },
            { name: 'Society_Map.dwg', type: 'DWG', color: 'bg-blue-50 text-blue-600' },
            { name: 'Resident_List.xlsx', type: 'XLSX', color: 'bg-emerald-50 text-emerald-600' },
            { name: 'Meeting_Minutes.pdf', type: 'PDF', color: 'bg-rose-50 text-rose-600' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card border rounded-xl hover:border-amber-200 transition-all cursor-pointer group">
              <div className={cn("p-2 rounded-lg", item.color)}>
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.type}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
