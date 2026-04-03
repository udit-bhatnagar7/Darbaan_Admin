import React from 'react';
import { 
  List, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Package, 
  ShoppingCart, 
  Tag, 
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const categories = ['All', 'Groceries', 'Dairy', 'Personal Care', 'Household', 'Electronics'];

const products = [
  {
    id: '1',
    name: 'Organic Whole Milk',
    category: 'Dairy',
    price: 4.99,
    stock: 42,
    status: 'In Stock',
    image: 'https://picsum.photos/seed/milk/200/200',
    sku: 'DRY-001'
  },
  {
    id: '2',
    name: 'Fresh Red Apples',
    category: 'Groceries',
    price: 2.49,
    stock: 156,
    status: 'In Stock',
    image: 'https://picsum.photos/seed/apple/200/200',
    sku: 'GRC-042'
  },
  {
    id: '3',
    name: 'Premium Dish Soap',
    category: 'Household',
    price: 3.99,
    stock: 8,
    status: 'Low Stock',
    image: 'https://picsum.photos/seed/soap/200/200',
    sku: 'HSH-102'
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 24.99,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://picsum.photos/seed/mouse/200/200',
    sku: 'ELC-088'
  },
  {
    id: '5',
    name: 'Artisan Sourdough Bread',
    category: 'Groceries',
    price: 5.50,
    stock: 12,
    status: 'In Stock',
    image: 'https://picsum.photos/seed/bread/200/200',
    sku: 'GRC-015'
  },
  {
    id: '6',
    name: 'Moisturizing Lotion',
    category: 'Personal Care',
    price: 12.99,
    stock: 28,
    status: 'In Stock',
    image: 'https://picsum.photos/seed/lotion/200/200',
    sku: 'PC-055'
  }
];

export default function ProductListPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock': return <Badge variant="success" className="text-[10px] uppercase tracking-wider">In Stock</Badge>;
      case 'Low Stock': return <Badge variant="warning" className="text-[10px] uppercase tracking-wider">Low Stock</Badge>;
      case 'Out of Stock': return <Badge variant="destructive" className="text-[10px] uppercase tracking-wider">Out of Stock</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-warning-500 rounded-full text-white shadow-lg shadow-warning-500/20">
            <List size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Product List</h1>
            <p className="text-muted-foreground mt-1">Manage your society's inventory and product catalog.</p>
          </div>
        </div>
        <Link to="/add-product">
          <Button className="bg-warning-500 hover:bg-warning-600 shadow-lg shadow-warning-500/20 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 border-border/50 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full h-8 px-4 text-xs font-medium transition-all",
                  activeCategory === cat 
                    ? "bg-warning-500 text-white hover:bg-warning-600" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-border rounded-lg p-1 bg-muted/30">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={14} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode('list')}
              >
                <ListIcon size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Product Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group hover:shadow-xl transition-all border-border/50 overflow-hidden relative">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-lg">
                        <Edit2 size={14} />
                      </Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-lg">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      {getStatusBadge(product.status)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.category}</span>
                      <span className="text-xs text-muted-foreground font-mono">{product.sku}</span>
                    </div>
                    <h3 className="font-bold text-lg truncate group-hover:text-warning-500 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full h-9 border-warning-200 text-warning-600 hover:bg-warning-50">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">SKU</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-border">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-semibold text-foreground">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{product.sku}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="font-normal">{product.category}</Badge>
                        </td>
                        <td className="px-6 py-4 font-bold text-foreground">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-muted-foreground">{product.stock} units</td>
                        <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-warning-500">
                              <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-muted rounded-full text-muted-foreground">
            <Package size={48} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-muted-foreground max-w-xs">
              We couldn't find any products matching your search criteria.
            </p>
          </div>
          <Button variant="outline" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination Placeholder */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} of {products.length} products</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
