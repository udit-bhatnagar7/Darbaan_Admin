import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  PackagePlus,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

// --- Validation Schema ---
const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  initialStock: z.coerce.number().min(0, "Stock cannot be negative"),
  unit: z.string().min(1, "Unit is required"),
  lowStockThreshold: z.coerce.number().min(0, "Threshold cannot be negative"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const CATEGORY_SUGGESTIONS = [
  'Groceries', 'Dairy & Beverages', 'Snacks & Packaged Food', 
  'Household Care', 'Personal Care', 'Fruits & Vegetables'
];

const UNIT_SUGGESTIONS = [
  'pcs', 'kg', 'g', 'L', 'ml', 'pack', 'box'
];

export default function AddProductPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      category: '',
      unit: 'pcs',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    // Reset file input if needed
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['name', 'category', 'price'] as const
      : ['initialStock', 'unit', 'lowStockThreshold'] as const;
      
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Product Data:', { ...data, image: imagePreview ? 'uploaded_image_blob' : null });
    setIsSubmitting(false);
    setStep(3); // Success state
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
          <PackagePlus className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Product</h1>
        <p className="text-muted-foreground mt-2">Create a new product listing for the society store.</p>
      </div>

      <Card className="overflow-hidden border-border shadow-lg">
        {/* Progress Bar */}
        {step < 3 && (
          <div className="h-1.5 w-full bg-muted">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: step === 1 ? '0%' : '50%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>
                  <span className="text-sm font-medium text-muted-foreground">Step 1 of 2</span>
                </div>

                <div className="space-y-4">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Name <span className="text-danger-500">*</span></label>
                    <Input 
                      {...register('name')} 
                      placeholder="e.g. Aashirvaad Whole Wheat Atta 5kg" 
                      className={cn(errors.name && "border-danger-500 focus-visible:ring-danger-500")}
                    />
                    {errors.name && <p className="text-xs text-danger-500">{errors.name.message}</p>}
                  </div>

                  {/* Category & Price Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Category <span className="text-danger-500">*</span></label>
                      <Input 
                        {...register('category')} 
                        list="categories"
                        placeholder="Select or type category" 
                        className={cn(errors.category && "border-danger-500 focus-visible:ring-danger-500")}
                      />
                      <datalist id="categories">
                        {CATEGORY_SUGGESTIONS.map(cat => <option key={cat} value={cat} />)}
                      </datalist>
                      {errors.category && <p className="text-xs text-danger-500">{errors.category.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Price <span className="text-danger-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input 
                          {...register('price', { valueAsNumber: true })} 
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          placeholder="0.00" 
                          className={cn("pl-9", errors.price && "border-danger-500 focus-visible:ring-danger-500")}
                        />
                      </div>
                      {errors.price && <p className="text-xs text-danger-500">{errors.price.message}</p>}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-foreground">Product Image</label>
                    {imagePreview ? (
                      <div className="relative rounded-xl border border-border overflow-hidden bg-muted/30 aspect-video sm:aspect-[21/9] flex items-center justify-center group">
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button type="button" variant="destructive" size="sm" onClick={removeImage}>
                            <X className="mr-2 h-4 w-4" /> Remove Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                            <UploadCloud className="h-5 w-5" />
                          </div>
                          <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground/70">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button onClick={nextStep} className="w-full sm:w-auto group">
                    Continue to Stock <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Stock Info */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Stock Information</h2>
                  <span className="text-sm font-medium text-muted-foreground">Step 2 of 2</span>
                </div>

                <div className="space-y-6">
                  {/* Stock & Unit Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Initial Stock <span className="text-danger-500">*</span></label>
                      <Input 
                        {...register('initialStock', { valueAsNumber: true })} 
                        type="number"
                        inputMode="numeric"
                        placeholder="0" 
                        className={cn(errors.initialStock && "border-danger-500 focus-visible:ring-danger-500")}
                      />
                      {errors.initialStock && <p className="text-xs text-danger-500">{errors.initialStock.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Unit <span className="text-danger-500">*</span></label>
                      <Input 
                        {...register('unit')} 
                        list="units"
                        placeholder="e.g. pcs, kg" 
                        className={cn(errors.unit && "border-danger-500 focus-visible:ring-danger-500")}
                      />
                      <datalist id="units">
                        {UNIT_SUGGESTIONS.map(unit => <option key={unit} value={unit} />)}
                      </datalist>
                      {errors.unit && <p className="text-xs text-danger-500">{errors.unit.message}</p>}
                    </div>
                  </div>

                  {/* Low Stock Threshold */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Low Stock Threshold <span className="text-danger-500">*</span></label>
                    <p className="text-xs text-muted-foreground mb-2">You will be alerted when stock falls below this number.</p>
                    <Input 
                      {...register('lowStockThreshold', { valueAsNumber: true })} 
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 10" 
                      className={cn(errors.lowStockThreshold && "border-danger-500 focus-visible:ring-danger-500")}
                    />
                    {errors.lowStockThreshold && <p className="text-xs text-danger-500">{errors.lowStockThreshold.message}</p>}
                  </div>
                </div>

                <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between gap-3">
                  <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit(onSubmit)} 
                    disabled={isSubmitting || !isValid}
                    className="w-full sm:w-auto min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Saving...
                      </div>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success State */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="h-20 w-20 bg-success-50 dark:bg-success-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-10 w-10 text-success-500" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Product Added Successfully</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Your new product has been added to the inventory and is now available in the store.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full sm:w-auto">
                  <Button variant="outline" onClick={() => {
                    setStep(1);
                    setImagePreview(null);
                    setValue('name', '');
                    setValue('category', '');
                    setValue('price', 0);
                    setValue('initialStock', 0);
                    setValue('lowStockThreshold', 0);
                  }} className="w-full sm:w-auto">
                    Add Another Product
                  </Button>
                  <Button onClick={() => navigate('/products')} className="w-full sm:w-auto">
                    View Products
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
