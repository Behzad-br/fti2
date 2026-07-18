import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Loader2, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/auth/AuthContext';

// Form validation schema
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const StudentLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password, 'student');
            toast.success("Welcome, Student!", {
                description: "You have successfully logged into the portal.",
            });
            navigate('/');
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
            toast.error("Login failed", { description: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[5%] w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-[100px]"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[15%] -right-[5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px]"
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md px-6 relative z-10"
            >
                <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden p-8 md:p-10">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-primary shadow-xl shadow-blue-500/20 mb-6"
                        >
                            <GraduationCap className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Student Portal
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Access your courses, results, and schedules
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        {/* Student ID Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <Input
                                    {...form.register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="pl-12 h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-2xl text-base"
                                />
                            </div>
                            {form.formState.errors.email && (
                                <span className="text-red-500 text-xs ml-1 block font-medium">{form.formState.errors.email.message}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</Label>
                                <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <Input
                                    {...form.register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-12 pr-12 h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-2xl text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <span className="text-red-500 text-xs ml-1 block font-medium">{form.formState.errors.password.message}</span>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2 ml-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me</label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-14 text-base font-bold rounded-2xl gap-2 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all mt-4 border-none"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    Sign In to Portal
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center bg-gray-50/50 -mx-8 -mb-10 p-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            New student?{' '}
                            <Link to="/contact" className="text-blue-600 font-bold hover:underline transition-all">
                                Contact Admissions
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Footer info */}
                <div className="flex flex-col items-center mt-10 space-y-4">
                    <Link to="/" className="text-gray-500 hover:text-primary font-medium text-sm transition-all flex items-center gap-2">
                        ← Back to Homepage
                    </Link>
                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                        &copy; {new Date().getFullYear()} Future Target Institute
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentLogin;
