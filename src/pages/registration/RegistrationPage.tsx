import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  RefreshCcw,
  Mail,
  Phone,
  Hash,
  Map,
  Globe,
  Upload
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Card } from '@/src/components/ui/Card';
import { Progress } from '@/src/components/ui/Progress';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

// --- Schemas ---
const step1Schema = z.object({
  societyName: z.string().min(3, 'Society name must be at least 3 characters'),
  shortName: z.string().min(2, 'Short name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  contactNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  totalFlats: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a valid number greater than 0'),
});

const step2Schema = z.object({
  address: z.string().min(5, 'Address is required'),
  landmark: z.string().optional(),
  postalCode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit postal code'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
});

const step3Schema = z.object({
  subscriptionType: z.enum(['basic', 'premium', 'enterprise']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullSchema>;

const STEPS = [
  { id: 0, title: 'Basic Information', icon: Building2 },
  { id: 1, title: 'Address Details', icon: MapPin },
  { id: 2, title: 'Subscription', icon: CreditCard },
];

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    defaultValues: {
      subscriptionType: 'premium',
    }
  });

  // --- Smart UX: Auto-detect City/State from Postal Code ---
  const postalCode = watch('postalCode');
  useEffect(() => {
    if (postalCode?.length === 6) {
      // Mocking an API call for pincode lookup
      setTimeout(() => {
        setValue('city', 'Mumbai', { shouldValidate: true });
        setValue('state', 'Maharashtra', { shouldValidate: true });
        setValue('country', 'India', { shouldValidate: true });
      }, 500);
    }
  }, [postalCode, setValue]);

  // --- Step Validation & Navigation ---
  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ['societyName', 'shortName', 'email', 'contactNumber', 'totalFlats'];
    if (currentStep === 1) fieldsToValidate = ['address', 'landmark', 'postalCode', 'city', 'state', 'country'];
    
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

  // --- Image Upload Handler ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Determine if CTA should be disabled ---
  const watchStep1 = watch(['societyName', 'shortName', 'email', 'contactNumber', 'totalFlats']);
  const watchStep2 = watch(['address', 'postalCode', 'city', 'state', 'country']);
  
  const isCurrentStepFilled = () => {
    if (currentStep === 0) return watchStep1.every(Boolean);
    if (currentStep === 1) return watchStep2.every(Boolean);
    return true; // Step 3 has defaults
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Society Created Successfully!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Your society profile has been set up. You can now start managing residents, staff, and billing.
        </p>
        <Button size="lg" onClick={() => navigate('/')} className="w-full sm:w-auto px-8">
          Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (submissionState === 'error') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 bg-danger-500/10 text-danger-500 rounded-full flex items-center justify-center mb-6"
        >
          <AlertCircle className="h-12 w-12" />
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          We couldn't process your registration at this time. Please check your connection and try again.
        </p>
        <Button size="lg" onClick={() => setSubmissionState('idle')} variant="outline" className="w-full sm:w-auto px-8">
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 pt-4 sm:pt-8 px-4 sm:px-6">
      {/* Header & Progress */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}% Completed</span>
        </div>
        <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
        
        <div className="flex items-center gap-3 mt-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            {React.createElement(STEPS[currentStep].icon, { className: "h-5 w-5" })}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{STEPS[currentStep].title}</h1>
            <p className="text-sm text-muted-foreground">Please fill in the details below.</p>
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
                {/* Image Upload */}
                <div className="flex flex-col items-center justify-center pb-4 border-b border-border/50">
                  <div className="relative group cursor-pointer">
                    <div className="h-24 w-24 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm text-primary">
                      <Upload className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-4">Upload Society Logo</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="societyName">Society Name <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="societyName" 
                      placeholder="e.g. Darbaan Heights" 
                      leftIcon={<Building2 className="h-4 w-4" />}
                      {...register('societyName')}
                      error={errors.societyName?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortName">Short Name <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="shortName" 
                      placeholder="e.g. DH" 
                      {...register('shortName')}
                      error={errors.shortName?.message}
                    />
                    <p className="text-[10px] text-muted-foreground">Used for generating unique IDs (e.g., DH-101)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Official Email <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="admin@society.com" 
                      leftIcon={<Mail className="h-4 w-4" />}
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="contactNumber" 
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="9876543210" 
                        leftIcon={<Phone className="h-4 w-4" />}
                        {...register('contactNumber')}
                        error={errors.contactNumber?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalFlats">Total Flats <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="totalFlats" 
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g. 150" 
                        leftIcon={<Hash className="h-4 w-4" />}
                        {...register('totalFlats')}
                        error={errors.totalFlats?.message}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 2: Address */}
            {currentStep === 1 && (
              <Card className="p-6 space-y-6 border-border/50 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code (Pincode) <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="postalCode" 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="e.g. 400001" 
                      leftIcon={<MapPin className="h-4 w-4" />}
                      {...register('postalCode')}
                      error={errors.postalCode?.message}
                    />
                    <p className="text-[10px] text-muted-foreground">City and State will auto-fill based on Pincode</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="address" 
                      placeholder="Street name, Area" 
                      {...register('address')}
                      error={errors.address?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark</Label>
                    <Input 
                      id="landmark" 
                      placeholder="Near..." 
                      {...register('landmark')}
                      error={errors.landmark?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="city" 
                        placeholder="City" 
                        leftIcon={<Map className="h-4 w-4" />}
                        {...register('city')}
                        error={errors.city?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State <span className="text-danger-500">*</span></Label>
                      <Input 
                        id="state" 
                        placeholder="State" 
                        {...register('state')}
                        error={errors.state?.message}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="country" 
                      placeholder="Country" 
                      leftIcon={<Globe className="h-4 w-4" />}
                      {...register('country')}
                      error={errors.country?.message}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 3: Subscription */}
            {currentStep === 2 && (
              <Card className="p-6 space-y-6 border-border/50 shadow-sm">
                <div className="space-y-4">
                  <Label>Subscription Plan <span className="text-danger-500">*</span></Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {['basic', 'premium', 'enterprise'].map((plan) => {
                      const isSelected = watch('subscriptionType') === plan;
                      return (
                        <div 
                          key={plan}
                          onClick={() => setValue('subscriptionType', plan as any, { shouldValidate: true })}
                          className={cn(
                            "relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            isSelected 
                              ? "border-primary bg-primary/5 shadow-sm" 
                              : "border-border hover:border-primary/30 hover:bg-muted/50"
                          )}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                              <CheckCircle2 className="h-3 w-3" />
                            </div>
                          )}
                          <h3 className="font-bold capitalize text-foreground mb-1">{plan}</h3>
                          <p className="text-xs text-muted-foreground">
                            {plan === 'basic' && 'Essential features for small societies.'}
                            {plan === 'premium' && 'Advanced tools for growing communities.'}
                            {plan === 'enterprise' && 'Full suite for large complexes.'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {errors.subscriptionType && <p className="text-xs text-danger-500">{errors.subscriptionType.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      {...register('startDate')}
                      error={errors.startDate?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date <span className="text-danger-500">*</span></Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      {...register('endDate')}
                      error={errors.endDate?.message}
                    />
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40 lg:sticky lg:bg-transparent lg:border-t-0 lg:p-0 lg:mt-8">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            {currentStep > 0 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="w-full sm:w-auto"
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
                className="w-full sm:w-auto sm:ml-auto px-8"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={!isCurrentStepFilled() || submissionState === 'submitting'}
                isLoading={submissionState === 'submitting'}
                className="w-full sm:w-auto sm:ml-auto px-8"
              >
                Create Society <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
