"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import api from '@/src/lib/axios';
import { OrganizationFormValues, OrganizationSchema } from '@/src/forms/organizationSchema';
import { Building2, Plus } from 'lucide-react';
import { Textarea } from '@/src/components/ui/textarea';
import { toast } from 'sonner';

interface AddOrganizationDialogProps {
  onSuccess?: () => void;
}

export default function AddOrganizationDialog({
  onSuccess,
}: AddOrganizationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const initialValues: OrganizationFormValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  async function handleSubmit(values: OrganizationFormValues) {
    try {
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations`,
        values
      );

      onSuccess?.();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create organization");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto"><Plus /> Add Organization</Button>
      </DialogTrigger>

      <DialogContent aria-description='Add record dialog'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-1'><Building2 /> Add Organization</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(OrganizationSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4 py-4">

              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-right text-xs">
                  Name*
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Organization name"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-right text-xs">
                  Email*
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="organization@email.com"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="phone" className="text-right text-xs">
                  Phone*
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    placeholder="9950000000"
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="address" className="text-right text-xs">
                  Address
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Textarea}
                    id="address"
                    name="address"
                    placeholder="Optional address"
                    rows={3}
                  />
                  {touched.address && errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
