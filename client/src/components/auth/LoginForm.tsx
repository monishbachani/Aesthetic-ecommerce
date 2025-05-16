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

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.username, values.password);
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    id="remember-me" 
                  />
                </FormControl>
                <FormLabel htmlFor="remember-me" className="text-sm cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'LOGIN'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
