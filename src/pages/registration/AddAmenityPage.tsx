import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCcw,
  Info,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Card } from '@/src/components/ui/Card';
import { Progress } from '@/src/components/ui/Progress';
import { Switch } from '@/src/components/ui/Switch';
import { Textarea } from '@/src/components/ui/Textarea';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

// --- Schemas ---
const step1Schema = z.object({
  societyId: z.string().min(1, 'Please select a society'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const step2Schema = z.object({
  openTime: z.string().min(1, 'Open time is required'),
  closeTime: z.string().min(1, 'Close time is required'),
  bookingType: z.string().min(1, 'Please select a booking type'),
  isPaid: z.boolean(),
  fees: z.string().optional(),
}).refine((data) => {
  if (data.isPaid && (!data.fees || isNaN(Number(data.fees)) || Number(data.fees) <= 0)) {
    return false;
  }
  return true;
}, {
  message: 'Please enter a valid fee amount',
  path: ['fees'],
});

const fullSchema = step1Schema.merge(step2Schema);
type FormData = z.infer<typeof fullSchema>;

const STEPS = [
  { id: 0, title: 'Basic Info', icon: Building2 },
  { id: 1, title: 'Availability & Pricing', icon: Clock },
];

export default function AddAmenityPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    defaultValues: {
      isPaid: false,
      bookingType: 'hourly',
      societyId: '',
      category: '',
    }
  });

  const isPaid = watch('isPaid');

  // --- Step Validation & Navigation ---
  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ['societyId', 'category', 'description'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormData) => {
    setSubmissionState('submitting');
    // Mock API submission
    setTimeout(() => {
      // Simulate random success/error for demonstration
      if (Math.random() > 0.1) {
        setSubmissionState('success');
      } else {
        setSubmissionState('error');
      }
    }, 1500);
  };

  // --- Determine if CTA should be disabled ---
  const watchStep1 = watch(['societyId', 'category', 'description']);
  const watchStep2 = watch(['openTime', 'closeTime', 'bookingType', 'isPaid', 'fees']);
  
  const isCurrentStepFilled = () => {
    if (currentStep === 0) return watchStep1.every(Boolean);
    if (currentStep === 1) {
      const [open, close, type, paid, fees] = watchStep2;
      if (!open || !close || !type) return false;
      if (paid && (!fees || isNaN(Number(fees)) || Number(fees) <= 0)) return false;
      return true;
    }
    return true;
  };

  // --- Render States ---
  if (submissionState === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="h-24 w-24 bg-success-500/10 text-success-500 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Amenity added successfully</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The amenity has been created and is now available for residents to book.
        </p>
        <Button size="lg" onClick={() => navigate('/')} className="w-full sm:w-auto px-8">
          View Amenities <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pb-24 pt-4 sm:pt-8 px-4 sm:px-6">
      
      {/* Error Banner */}
      <AnimatePresence>
        {submissionState === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-danger-50 border border-danger-200 text-danger-800 rounded-xl flex items-start gap-3 shadow-sm"
          >
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Unable to save amenity. Try again.</h3>
              <p className="text-xs mt-1 opacity-90">There was a problem connecting to the server.</p>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs shrink-0" onClick={() => setSubmissionState('idle')}>
              <RefreshCcw className="mr-2 h-3 w-3" /> Retry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Progress */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}% Completed</span>
        </div>
        <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
        
        <div className="flex items-center gap-3 mt-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            {React.createElement(STEPS[currentStep].icon, { className: "h-5 w-5" })}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Add Amenity</h1>
            <p className="text-sm text-muted-foreground">{STEPS[currentStep].title}</p>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            {/* STEP 1: Basic Info */}
            {currentStep === 0 && (
              <Card className="p-6 space-y-6 border-border/50 shadow-sm">
                <div className="space-y-5">
                  
                  <div className="space-y-2">
                    <Label htmlFor="societyId">Society <span className="text-danger-500">*</span></Label>
                    <div className="relative">
                      <select
                        id="societyId"
                        className={cn(
                          "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200",
                          errors.societyId ? "border-danger-500 focus-visible:ring-danger-500" : ""
                        )}
                        {...register('societyId')}
                      >
                        <option value="" disabled>Select a society...</option>
                        <option value="soc_1">Darbaan Heights</option>
                        <option value="soc_2">Sunshine Apartments</option>
                        <option value="soc_3">Green Valley Complex</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819L7.43179 8.56819C7.60753 8.74393 7.89245 8.74393 8.06819 8.56819L10.5682 6.06819C10.7439 5.89245 10.7439 5.60753 10.5682 5.43179C10.3924 5.25605 10.1075 5.25605 9.93179 5.43179L7.75 7.61358L5.56819 5.43179C5.39245 5.25605 5.10753 5.25605 4.93179 5.43179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                    {errors.societyId && <p className="text-xs text-danger-500">{errors.societyId.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category <span className="text-danger-500">*</span></Label>
                    <div className="relative">
                      <select
                        id="category"
                        className={cn(
                          "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200",
                          errors.category ? "border-danger-500 focus-visible:ring-danger-500" : ""
                        )}
                        {...register('category')}
                      >
                        <option value="" disabled>Select a category...</option>
                        <option value="gym">Gymnasium</option>
                        <option value="pool">Swimming Pool</option>
                        <option value="clubhouse">Clubhouse</option>
                        <option value="tennis">Tennis Court</option>
                        <option value="party_hall">Party Hall</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819L7.43179 8.56819C7.60753 8.74393 7.89245 8.74393 8.06819 8.56819L10.5682 6.06819C10.7439 5.89245 10.7439 5.60753 10.5682 5.43179C10.3924 5.25605 10.1075 5.25605 9.93179 5.43179L7.75 7.61358L5.56819 5.43179C5.39245 5.25605 5.10753 5.25605 4.93179 5.43179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                    {errors.category && <p className="text-xs text-danger-500">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description <span className="text-danger-500">*</span></Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the amenity, rules, or special instructions..." 
                      className="min-h-[120px] resize-none"
                      {...register('description')}
                      error={errors.description?.message}
                    />
                  </div>

                </div>
              </Card>
            )}

            {/* STEP 2: Availability & Pricing */}
            {currentStep === 1 && (
              <Card className="p-6 space-y-6 border-border/50 shadow-sm">
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="openTime">Open Time <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="openTime" 
                        type="time"
                        className="h-11"
                        {...register('openTime')}
                        error={errors.openTime?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closeTime">Close Time <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="closeTime" 
                        type="time"
                        className="h-11"
                        {...register('closeTime')}
                        error={errors.closeTime?.message}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Slot Booking Type <span className="text-danger-500">*</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['hourly', 'daily'].map((type) => {
                        const isSelected = watch('bookingType') === type;
                        return (
                          <div 
                            key={type}
                            onClick={() => setValue('bookingType', type, { shouldValidate: true })}
                            className={cn(
                              "flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                              isSelected 
                                ? "border-primary bg-primary/5 text-primary font-medium" 
                                : "border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                            )}
                          >
                            <span className="capitalize">{type}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Info className="h-3 w-3" /> Select booking type (hourly/daily)
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Paid Service</Label>
                        <p className="text-xs text-muted-foreground">Does this amenity require a fee?</p>
                      </div>
                      <Controller
                        name="isPaid"
                        control={control}
                        render={({ field }) => (
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {isPaid && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            <Label htmlFor="fees">Fees (per slot) <span className="text-danger-500">*</span></Label>
                            <Input 
                              id="fees" 
                              type="number"
                              inputMode="numeric"
                              placeholder="e.g. 500" 
                              className="h-11"
                              leftIcon={<IndianRupee className="h-4 w-4" />}
                              {...register('fees')}
                              error={errors.fees?.message}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40 lg:sticky lg:bg-transparent lg:border-t-0 lg:p-0 lg:mt-8">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
            {currentStep > 0 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="w-full sm:w-auto h-11"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div className="hidden sm:block" /> // Spacer
            )}
            
            {currentStep < STEPS.length - 1 ? (
              <Button 
                type="button" 
                onClick={handleNext} 
                disabled={!isCurrentStepFilled()}
                className="w-full sm:w-auto sm:ml-auto px-8 h-11"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={!isCurrentStepFilled() || submissionState === 'submitting'}
                isLoading={submissionState === 'submitting'}
                className="w-full sm:w-auto sm:ml-auto px-8 h-11"
              >
                Save Amenity <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
