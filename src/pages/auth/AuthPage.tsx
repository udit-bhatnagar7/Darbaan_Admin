import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/src/stores/authStore';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Checkbox } from '@/src/components/ui/Checkbox';
import { Label } from '@/src/components/ui/Label';
import axiosInstance from '@/src/lib/axios';
import { Controller } from 'react-hook-form';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [view, setView] = React.useState<'auth' | 'forgot-password'>('auth');
  const [activeTab, setActiveTab] = React.useState<'login' | 'signup'>('login');

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { terms: false },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', data);
      login(response.data.user, response.data.accessToken);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginForm.setValue('email', 'admin@example.com');
    loginForm.setValue('password', 'password123');
    loginForm.handleSubmit(onLoginSubmit)();
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', data);
      login(response.data.user, response.data.accessToken);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/auth/forgot-password', data);
      toast.success('Password reset link sent to your email!');
      setView('auth');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 relative overflow-hidden p-4">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-info-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px] z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">Darbaan Admin</span>
          </div>
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/95 overflow-hidden">
          <AnimatePresence mode="wait">
            {view === 'auth' ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl font-bold text-center tracking-tight">
                    {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {activeTab === 'login' 
                      ? 'Enter your credentials to access your dashboard' 
                      : 'Join us today and start managing your business'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="w-full">
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border mb-8">
                      <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          activeTab === 'login' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setActiveTab('signup')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          activeTab === 'signup' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Register
                      </button>
                    </div>

                    {activeTab === 'login' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email Address</Label>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="name@example.com"
                              leftIcon={<Mail className="h-4 w-4" />}
                              {...loginForm.register('email')}
                              error={loginForm.formState.errors.email?.message}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="login-password">Password</Label>
                              <button
                                type="button"
                                onClick={() => setView('forgot-password')}
                                className="text-xs font-medium text-primary hover:underline"
                              >
                                Forgot password?
                              </button>
                            </div>
                            <Input
                              id="login-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              leftIcon={<Lock className="h-4 w-4" />}
                              rightIcon={
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="focus:outline-none"
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              }
                              {...loginForm.register('password')}
                              error={loginForm.formState.errors.password?.message}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Controller
                              name="rememberMe"
                              control={loginForm.control}
                              render={({ field }) => (
                                <Checkbox
                                  id="remember"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              )}
                            />
                            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                              Remember me for 30 days
                            </Label>
                          </div>
                          <Button type="submit" className="w-full h-11" isLoading={isLoading}>
                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>

                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Demo Access</span>
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full h-11 border-primary/20 hover:bg-primary/5 text-primary"
                          onClick={handleDemoLogin}
                          disabled={isLoading}
                        >
                          <User className="mr-2 h-4 w-4" /> Sign in as Demo Admin
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input
                              id="signup-name"
                              placeholder="John Doe"
                              leftIcon={<User className="h-4 w-4" />}
                              {...signupForm.register('name')}
                              error={signupForm.formState.errors.name?.message}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Email Address</Label>
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="name@example.com"
                              leftIcon={<Mail className="h-4 w-4" />}
                              {...signupForm.register('email')}
                              error={signupForm.formState.errors.email?.message}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="signup-password">Password</Label>
                              <Input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...signupForm.register('password')}
                                error={signupForm.formState.errors.password?.message}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm</Label>
                              <Input
                                id="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...signupForm.register('confirmPassword')}
                                error={signupForm.formState.errors.confirmPassword?.message}
                              />
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 pt-1">
                            <Controller
                              name="terms"
                              control={signupForm.control}
                              render={({ field }) => (
                                <Checkbox
                                  id="terms"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              )}
                            />
                            <Label htmlFor="terms" className="text-xs font-normal leading-tight cursor-pointer">
                              I agree to the <span className="text-primary hover:underline">Terms of Service</span> and <span className="text-primary hover:underline">Privacy Policy</span>
                            </Label>
                          </div>
                          {signupForm.formState.errors.terms && (
                            <p className="text-xs text-danger-500 font-medium">{signupForm.formState.errors.terms.message}</p>
                          )}
                          <Button type="submit" className="w-full h-11" isLoading={isLoading}>
                            Create Account <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </motion.div>
                    )}
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-11">
                      <Chrome className="mr-2 h-4 w-4" /> Google
                    </Button>
                    <Button variant="outline" className="h-11">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="space-y-1 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-xl bg-info-500 flex items-center justify-center shadow-lg shadow-info-500/20">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-center tracking-tight">Reset Password</CardTitle>
                  <CardDescription className="text-center">
                    Enter your email address and we'll send you a link to reset your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="name@example.com"
                        leftIcon={<Mail className="h-4 w-4" />}
                        {...forgotPasswordForm.register('email')}
                        error={forgotPasswordForm.formState.errors.email?.message}
                      />
                    </div>
                    <Button type="submit" className="w-full h-11" isLoading={isLoading}>
                      Send Reset Link
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setView('auth')}
                    >
                      Back to Login
                    </Button>
                  </form>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>

          <CardFooter className="bg-muted/30 border-t border-border/50 py-4 flex justify-center">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-success-500" /> Secure, encrypted authentication
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Darbaan Admin. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
