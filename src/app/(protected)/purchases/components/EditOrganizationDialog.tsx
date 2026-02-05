'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import api from '@/src/lib/axios';
import {
  OrganizationFormValues,
  OrganizationSchema,
} from '@/src/forms/organizationSchema';
import { Building2, Pencil, Plus } from 'lucide-react';
import { Textarea } from '@/src/components/ui/textarea';
import { Organization } from '@/src/types/organizationTypes';
import { toast } from 'sonner';

type EditOrganizationDialogProps = {
  organization?: Organization;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function EditOrganizationDialog({
  organization,
  open,
  onOpenChange,
  onSuccess,
}: EditOrganizationDialogProps) {
  if (!organization) {
    return null;
  }

  const initialValues: OrganizationFormValues = {
    name: organization.name,
    email: organization.email || '',
    phone: organization.phone || '',
    address: organization.address || '',
  };

  async function handleSubmit(values: OrganizationFormValues) {
    if (!organization) return;

    try {
      await api.put(`/organizations/${organization._id}`, values);

      onSuccess?.();
      toast.success('Successfully updated organization');
    } catch (error) {
      toast.error('Failed to update organization');
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="Add record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Building2 /> Edit Organization
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(OrganizationSchema)}
          onSubmit={handleSubmit}
          enableReinitialize
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
