'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import api from '@/src/lib/axios';
import { Group, Plus } from 'lucide-react';
import { Textarea } from '@/src/components/ui/textarea';
import { toast } from 'sonner';
import { CohortFormValues, CohortSchema } from '@/src/forms/cohortSchema';
import { Organization } from '@/src/types/organizationTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Cohort, EducationLevelLabels, EEducationLevel } from '@/src/types/cohortTypes';

type EditCohortDialogProps = {
  cohort?: Cohort;
  organizations: Organization[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const educationLevelOptions = Object.values(EEducationLevel).map(
  (level) => ({
    id: level,
    label: EducationLevelLabels[level],
  })
);

const EditCohortDialog = ({
  cohort,
  open,
  onOpenChange,
  onSuccess,
  organizations = [],
}: EditCohortDialogProps) => {
  if (!cohort) {
    return null;
  }

  const initialValues: CohortFormValues = {
    name: cohort.name || '',
    organizationId: cohort.organizationId?._id,
    educationLevel: cohort.educationLevel || '',
    description: cohort.description,
    isActive: cohort.isActive,
  };

  console.log(initialValues);

  async function handleSubmit(values: CohortFormValues) {
    if (!cohort) return;

    try {
      await api.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cohorts/${cohort._id}`,
        values
      );

      onSuccess?.();
      toast.success('Successfully updated cohort');
    } catch (error) {
      toast.error('Failed to edit cohort');
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="Add record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Group /> Edit Cohort
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(CohortSchema)}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="grid gap-4 py-4">
              {/* Organization Dropdown */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="organizationId" className="text-right text-xs">
                  Organization*
                </Label>

                <div className="col-span-3">
                  <Select
                    onValueChange={(value) =>
                      setFieldValue('organizationId', value)
                    }
                    value={values.organizationId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>

                    <SelectContent>
                      {organizations?.map((org) => (
                        <SelectItem key={org._id} value={org._id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {touched.organizationId && errors.organizationId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.organizationId}
                    </p>
                  )}
                </div>
              </div>

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
                    placeholder="Cohort name"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Education Level Dropdown */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="educationLevel" className="text-right text-xs">
                  Education Level*
                </Label>

                <div className="col-span-3">
                  <Select
                    onValueChange={(value) =>
                      setFieldValue('educationLevel', value)
                    }
                    value={values.educationLevel}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>

                    <SelectContent>
                      {educationLevelOptions.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {touched.educationLevel && errors.educationLevel && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="description" className="text-right text-xs">
                  Description
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    placeholder="Optional description"
                    rows={3}
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
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
};

export default EditCohortDialog;
