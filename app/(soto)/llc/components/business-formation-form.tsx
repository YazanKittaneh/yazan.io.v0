'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '../components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { BusinessFormation, EntityType, ExpediteOption } from '../types/business-formation';

const formSchema = z.object({
  entityInformation: z.object({
    entityName: z.string().min(1, { message: "Entity name is required" }),
    entityAddress: z.string().min(1, { message: "Entity address is required" }),
    serviceProductOffered: z.string().min(1, { message: "Service/product offered is required" }),
    entityType: z.enum(['LLC', 'S-CORP', 'C-CORP'] as const),
  }),
  processingOptions: z.object({
    expedite: z.enum(['YES', 'NO'] as const),
  }),
  ownerInformation: z.object({
    owner1: z.object({
      responsibleParty: z.boolean().default(true),
      fullName: z.string().min(1, { message: "Full name is required" }),
      address: z.string().min(1, { message: "Address is required" }),
      phone: z.string().min(10, { message: "Valid phone number is required" }),
      email: z.string().email({ message: "Valid email is required" }),
      ssn: z.string().min(9, { message: "Valid SSN is required" }),
      dob: z.string().min(1, { message: "Date of birth is required" }),
    }),
    owner2: z.object({
      fullName: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email({ message: "Valid email is required" }).optional(),
    }).optional(),
    owner3: z.object({
      fullName: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email({ message: "Valid email is required" }).optional(),
    }).optional(),
  }),
  attestation: z.object({
    signatures: z.array(
      z.object({
        signHere: z.string().optional(),
        date: z.string().optional(),
      })
    ).optional(),
  }),
});

export function BusinessFormationForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityInformation: {
        entityName: '',
        entityAddress: '',
        serviceProductOffered: '',
        entityType: 'LLC',
      },
      processingOptions: {
        expedite: 'NO',
      },
      ownerInformation: {
        owner1: {
          responsibleParty: true,
          fullName: '',
          address: '',
          phone: '',
          email: '',
          ssn: '',
          dob: '',
        },
      },
      attestation: {
        signatures: [{ signHere: '', date: '' }],
      },
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Here you would typically send the data to your backend
    alert('Form submitted successfully!');
  };

  const nextStep = () => {
    setStep(Math.min(step + 1, totalSteps));
  };

  const prevStep = () => {
    setStep(Math.max(step - 1, 1));
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Business Formation Application</CardTitle>
          <CardDescription>
            Complete the form below to start your business formation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Entity Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="entityInformation.entityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter entity name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="entityInformation.entityAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter entity address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="entityInformation.serviceProductOffered"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service/Product Offered</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe your service or product" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="entityInformation.entityType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Entity Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="LLC" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                LLC
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="S-CORP" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                S-CORP
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="C-CORP" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                C-CORP
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="processingOptions.expedite"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Expedite Processing (24HR TURNAROUND)</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="YES" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes (+$100 + 3% processing fee)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="NO" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No (Regular processing: 7-10 business days)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Owner Information</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="owner1">
                      <AccordionTrigger>Primary Owner (Responsible Party)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.ssn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SSN</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter SSN" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.dob"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="owner2">
                      <AccordionTrigger>Additional Owner (Optional)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="owner3">
                      <AccordionTrigger>Additional Owner (Optional)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Preparer Information</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preparer Name</p>
                        <p className="text-sm">BRIAN SOTO, CPA</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Firm Name</p>
                        <p className="text-sm">SOTO ACCOUNTING</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Street</p>
                        <p className="text-sm">4252 N. CICERO AVE.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">City, State, Zip</p>
                        <p className="text-sm">CHICAGO, IL 60641</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Fee Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">State Fee:</span> $150.00 + 3% PROCESSING FEE (LLC/CCORP)</p>
                      <p className="text-sm"><span className="font-medium">Regular Processing:</span> 7-10 BUSINESS DAYS</p>
                      <p className="text-sm"><span className="font-medium">Expedited Fee:</span> $100 + 3% PROCESSING FEE</p>
                      <p className="text-sm"><span className="font-medium">Expedited Processing:</span> 24HRS</p>
                      <p className="text-sm"><span className="font-medium">CPA Fee:</span> $250</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Attestation</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm mb-4">To the best of my knowledge the above information is correct.</p>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="attestation.signatures.0.signHere"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Signature</FormLabel>
                            <FormControl>
                              <Input placeholder="Type your full name to sign" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="attestation.signatures.0.date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Address:</span> 4252 N. Cicero Ave. Chicago, IL 60641</p>
                      <p className="text-sm"><span className="font-medium">Phone:</span> 312.715.8599</p>
                      <p className="text-sm"><span className="font-medium">Fax:</span> 312.489.2344</p>
                      <p className="text-sm"><span className="font-medium">Email:</span> brian@sotoaccounting.com</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
