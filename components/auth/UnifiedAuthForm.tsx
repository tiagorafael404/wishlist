'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Loader2, Mail, X } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const registerSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof registerSchema>;

type UnifiedAuthFormProps = {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function UnifiedAuthForm({ onClose, initialMode = 'register' }: UnifiedAuthFormProps) {
    const [authMode, setAuthMode] = useState(initialMode);
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const isLogin = authMode === 'login';
    
    const formSchema = useMemo(() => isLogin ? loginSchema : registerSchema, [isLogin]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    
    useEffect(() => {
        form.reset({
            name: '',
            email: '',
            password: '',
        });
    }, [isLogin, form]);


    const toggleMode = (e: React.MouseEvent) => {
        e.preventDefault();
        setAuthMode(prevMode => (prevMode === 'login' ? 'register' : 'login'));
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            if (isLogin) {
                const { email, password } = values as z.infer<typeof loginSchema>;
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const { name, email, password } = values as z.infer<typeof registerSchema>;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name) {
                    await updateProfile(userCredential.user, { displayName: name });
                }
            }
            toast({ title: isLogin ? 'Login Successful' : 'Registration Successful', description: 'Redirecting...' });
            router.push('/profile');
            onClose(); // Close modal on success
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: isLogin ? 'Login Failed' : 'Registration Failed',
                description: authError.code === 'auth/invalid-credential' && isLogin
                    ? 'Invalid email or password.'
                    : authError.code === 'auth/email-already-in-use' && !isLogin
                    ? 'This email is already registered.'
                    : authError.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="signup-window w-[800px] max-w-lg bg-[#11101f] border-4 border-white rounded-[25px] text-white font-sans">
            <div className="signup-header h-24 flex justify-between items-center px-6 pt-4">
                <div className="space w-10 h-10" />
                <div className="title text-center">
                    <Mail className="title1 mx-auto h-7 w-7" />
                    <h2 className="title2 text-2xl font-bold mt-2">
                        {isLogin ? 'Login' : 'Create an account'}
                    </h2>
                </div>
                 <button onClick={onClose} className="close self-start mt-2 p-2 rounded-full hover:bg-white/10">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="signup-form p-8 pt-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {!isLogin && (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-bold text-lg">Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Name" {...field} className="bg-white text-black h-12 text-base border-gray-300 focus:ring-primary focus:border-primary" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        )}
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white font-bold text-lg">E-mail</FormLabel>
                                <FormControl>
                                <Input placeholder="Email Address" {...field} className="bg-white text-black h-12 text-base border-gray-300 focus:ring-primary focus:border-primary" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white font-bold text-lg">Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="Password" {...field} className="bg-white text-black h-12 text-base border-gray-300 focus:ring-primary focus:border-primary" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <div className="pt-4">
                             <Button type="submit" disabled={isLoading} className="w-[250px] h-[50px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl rounded-lg mx-auto block">
                                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                {isLogin ? 'Login' : 'Register Account'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="mt-6 text-center">
                    <a href="#" onClick={toggleMode} className="text-white text-lg font-bold hover:underline cursor-pointer">
                        {isLogin ? 'create-account' : 'login'}
                    </a>
                </div>
            </div>
        </div>
    );
}
