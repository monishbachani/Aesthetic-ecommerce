import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { termsAccepted, ...userData } = values;
      await register({
        ...userData,
        password: userData.password,
      });
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                  id="terms" 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'CREATE ACCOUNT'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
