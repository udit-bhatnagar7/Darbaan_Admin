import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  ArrowLeft, 
  Settings, 
  Users, 
  Home, 
  Shield, 
  Car, 
  Dog, 
  Coffee, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Check, 
  X,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { LookupCategory, LookupItem } from '@/src/types/v3';
import { toast } from 'sonner';

const MOCK_CATEGORIES: LookupCategory[] = [
  {
    id: 'flat-types',
    title: 'Flat Types',
    description: 'Manage different configurations of residential units.',
    group: 'society',
    items: [
      { id: '1', name: '1 BHK', code: '1BHK', description: 'One Bedroom, Hall, Kitchen', isActive: true },
      { id: '2', name: '2 BHK', code: '2BHK', description: 'Two Bedrooms, Hall, Kitchen', isActive: true },
      { id: '3', name: '3 BHK', code: '3BHK', description: 'Three Bedrooms, Hall, Kitchen', isActive: true },
      { id: '4', name: 'Studio', code: 'STU', description: 'Single Room Studio Apartment', isActive: true }
    ]
  },
  {
    id: 'user-roles',
    title: 'User Roles',
    description: 'Define access levels and responsibilities for staff.',
    group: 'user',
    items: [
      { id: '1', name: 'Admin', code: 'ADM', description: 'Full system access', isActive: true },
      { id: '2', name: 'Manager', code: 'MGR', description: 'Operational management', isActive: true },
      { id: '3', name: 'Security', code: 'SEC', description: 'Gate and visitor control', isActive: true }
    ]
  },
  {
    id: 'amenities',
    title: 'Amenities',
    description: 'Common facilities available in the society.',
    group: 'amenities',
    items: [
      { id: '1', name: 'Swimming Pool', code: 'POOL', description: 'Outdoor pool facility', isActive: true },
      { id: '2', name: 'Gymnasium', code: 'GYM', description: 'Fitness center', isActive: true },
      { id: '3', name: 'Clubhouse', code: 'CLUB', description: 'Community gathering space', isActive: true }
    ]
  },
  {
    id: 'vehicle-types',
    title: 'Vehicle Types',
    description: 'Categorize resident and visitor vehicles.',
    group: 'assets',
    items: [
      { id: '1', name: 'Two Wheeler', code: '2W', description: 'Bikes and Scooters', isActive: true },
      { id: '2', name: 'Four Wheeler', code: '4W', description: 'Cars and SUVs', isActive: true }
    ]
  }
];

export default function LookupDataPage() {
  const [categories, setCategories] = useState<LookupCategory[]>(MOCK_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingInline, setIsAddingInline] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', code: '', description: '' });

  const selectedCategory = useMemo(() => 
    categories.find(c => c.id === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  const groupedCategories = useMemo(() => {
    return {
      'Society Setup': categories.filter(c => c.group === 'society'),
      'User Setup': categories.filter(c => c.group === 'user'),
      'Amenities & Services': categories.filter(c => c.group === 'amenities'),
      'Pets & Vehicles': categories.filter(c => c.group === 'assets'),
    };
  }, [categories]);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.code || !selectedCategoryId) return;
    
    const item: LookupItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
      isActive: true
    };

    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategoryId 
        ? { ...cat, items: [item, ...cat.items] }
        : cat
    ));

    setNewItem({ name: '', code: '', description: '' });
    setIsAddingInline(false);
    toast.success('Item added successfully');
  };

  const handleDeleteItem = (itemId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategoryId 
        ? { ...cat, items: cat.items.filter(i => i.id !== itemId) }
        : cat
    ));
    toast.success('Item removed');
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'Society Setup': return <Home size={18} />;
      case 'User Setup': return <Users size={18} />;
      case 'Amenities & Services': return <Coffee size={18} />;
      case 'Pets & Vehicles': return <Car size={18} />;
      default: return <Settings size={18} />;
    }
  };

  // --- Dashboard View ---
  if (!selectedCategoryId) {
    return (
      <div className="space-y-8 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lookup Data</h1>
            <p className="text-muted-foreground mt-1">Configure master data and reference tables for your society.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search categories..." 
              className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedCategories).map(([groupName, groupCats]) => (
            <div key={groupName} className="space-y-6">
              <div className="flex items-center gap-3 text-foreground/80">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  {getGroupIcon(groupName)}
                </div>
                <h2 className="text-lg font-bold tracking-tight">{groupName}</h2>
                <div className="h-px flex-1 bg-border/60 ml-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupCats.map((cat) => (
                  <Card 
                    key={cat.id} 
                    className="group hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold">
                          {cat.items.length}
                        </Badge>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-all"
                        onClick={() => setSelectedCategoryId(cat.id)}
                      >
                        Manage <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Detail View ---
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full border border-border hover:bg-muted"
          onClick={() => setSelectedCategoryId(null)}
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{selectedCategory?.title}</h1>
          <p className="text-sm text-muted-foreground">{selectedCategory?.description}</p>
        </div>
        <div className="ml-auto">
          <Button className="btn-primary" onClick={() => setIsAddingInline(true)}>
            <Plus size={18} className="mr-2" /> Add New
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Name / Code</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Inline Add Row */}
              <AnimatePresence>
                {isAddingInline && (
                  <motion.tr 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-primary/5"
                  >
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Name" 
                          className="h-9 text-xs"
                          value={newItem.name}
                          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input 
                          placeholder="Code" 
                          className="h-9 text-xs w-24"
                          value={newItem.code}
                          onChange={(e) => setNewItem(prev => ({ ...prev, code: e.target.value }))}
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <Input 
                        placeholder="Description" 
                        className="h-9 text-xs"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </td>
                    <td className="p-3">
                      <Badge className="bg-success-50 text-success-700 border-success-100">Active</Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-success-600 hover:bg-success-50"
                          onClick={handleAddItem}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/5"
                          onClick={() => setIsAddingInline(false)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>

              {selectedCategory?.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <LayoutGrid size={32} className="opacity-20" />
                      <p className="text-sm">No data yet</p>
                      <Button variant="link" className="text-primary" onClick={() => setIsAddingInline(true)}>
                        Add your first item
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                selectedCategory?.items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-foreground">{item.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{item.code}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={cn(
                        "text-[10px] uppercase tracking-wider font-bold",
                        item.isActive ? "bg-success-50 text-success-700 border-success-100" : "bg-muted text-muted-foreground"
                      )}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
