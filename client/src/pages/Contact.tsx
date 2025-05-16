import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    
    toast({
      title: 'Message sent',
      description: 'Thank you for your message. We will get back to you soon!',
    });
    
    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Dazzle Fashion</title>
        <meta 
          name="description" 
          content="Get in touch with us at Dazzle Fashion. We'd love to hear from you regarding any questions, feedback, or collaboration opportunities." 
        />
      </Helmet>
      
      {/* Contact Header */}
      <div className="bg-neutral-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">Contact Us</h1>
          <p className="mt-4 text-neutral-dark/70 max-w-xl mx-auto">
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Address */}
          <div className="flex items-start p-6 bg-white shadow-md rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Our Manufacturing Unit</h3>
              <p className="text-neutral-dark/70">
                Sikar House<br />
                Jaipur, Rajasthan<br />
                India
              </p>
            </div>
          </div>
          
          {/* Contact Details */}
          <div className="flex items-start p-6 bg-white shadow-md rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Get in Touch</h3>
              <p className="text-neutral-dark/70">
                Phone: +91 98765 43210<br />
                WhatsApp: +91 98765 43210<br />
                Email: <a href="mailto:contact@dazzlefashion.com" className="text-primary hover:underline">contact@dazzlefashion.com</a>
              </p>
            </div>
          </div>
          
          {/* Hours */}
          <div className="flex items-start p-6 bg-white shadow-md rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Opening Hours</h3>
              <p className="text-neutral-dark/70">
                Monday to Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 6:00 PM<br />
                Online Support: 24/7
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
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
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter message subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/90 px-8 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Map */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6">Find Us</h2>
            <div className="h-[400px] bg-neutral-light rounded-lg overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8607383477926!2d75.81268077460241!3d26.91344147656096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40b9b149bfb%3A0x7254df37d2182a4d!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715296435!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Dazzle Fashion Store Location"
              ></iframe>
              
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-heading font-semibold">Dazzle Fashion</h3>
                <p className="text-sm text-neutral-dark/70">Sikar House, Jaipur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-neutral-light py-16 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-2">What are your shipping options?</h3>
              <p className="text-neutral-dark/70">
                We offer standard shipping (5-7 business days) and express shipping (2-3 business days) across India. 
                Free shipping is available on orders above ₹1999.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-2">How can I track my order?</h3>
              <p className="text-neutral-dark/70">
                Once your order is shipped, you will receive a tracking number via email and SMS. 
                You can also track your order from your account page or by contacting our customer service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-2">What is your return policy?</h3>
              <p className="text-neutral-dark/70">
                We accept returns within 7 days of delivery for unworn items in their original packaging. 
                Please note that customized or sale items cannot be returned unless defective.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-2">Do you offer international shipping?</h3>
              <p className="text-neutral-dark/70">
                Yes, we ship to select countries. International shipping typically takes 7-14 business days 
                depending on the destination. Custom duties and taxes may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
