'use client';

import { useMemo, useState } from 'react';
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import api from '@/src/lib/axios';
import { Boxes, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Organization } from '@/src/types/organizationTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Cohort, EducationLevelLabels, EEducationLevel } from '@/src/types/cohortTypes';
import {
  SeatBatchFormValues,
  SeatBatchSchema,
} from '@/src/forms/seatBatchSchema';
import { EAssessmentType } from '@/src/types/assessmentTypes';
import { FutureCalendar } from '@/src/components/ui/future-calendar';
import moment from 'moment';

interface AddSeatBatchDialogProps {
  cohorts: Cohort[];
  organizations: Organization[];
  onSuccess?: () => void;
}

const AddSeatBatchDialog = ({
  onSuccess,
  organizations = [],
  cohorts = [],
}: AddSeatBatchDialogProps) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const initialValues: SeatBatchFormValues = {
    totalSeats: 0,
    cohortId: '',
    organizationId: '',
    expiresAt: '',
  };

  async function handleSubmit(values: SeatBatchFormValues) {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/seat-batches`, values);

      onSuccess?.();
      setOpen(false);
      toast.success('Successfully created seat batch');
    } catch (error) {
      toast.error('Failed to create seat batch');
    }
  }

  const filteredCohorts = (orgId: string) =>
    cohorts.filter((c) => c.organizationId?._id === orgId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Plus /> Add Seat Batch
        </Button>
      </DialogTrigger>

      <DialogContent aria-description="Add record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Boxes /> Add Seat Batch
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(SeatBatchSchema)}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => {
            const cohortOptions = filteredCohorts(values.organizationId);
            const selectedCohort = cohortOptions?.find(c => c._id == values.cohortId)

            return (
              <Form className="grid gap-4 py-4">
                {/* Organization Dropdown */}
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="organizationId"
                    className="text-right text-xs"
                  >
                    Organization
                  </Label>

                  <Select
                    value={values.organizationId}
                    onValueChange={(value) => {
                      setFieldValue('organizationId', value);
                      setFieldValue('cohortId', ''); // ✅ Reset cohort when org changes
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>

                    <SelectContent>
                      {organizations.map((org) => (
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

                {/* Cohort Dropdown */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cohortId" className="text-right text-xs">
                    Cohort
                  </Label>

                  <Select
                    value={values.cohortId || ''}
                    onValueChange={(value) => setFieldValue('cohortId', value)}
                    disabled={!values.organizationId} // ✅ Disable until org selected
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>

                    <SelectContent>
                      {cohortOptions.length > 0 ? (
                        cohortOptions.map((cohort) => (
                          <SelectItem key={cohort._id} value={cohort._id}>
                            {cohort.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-xs text-neutral-500">
                          No cohorts available
                        </div>
                      )}
                    </SelectContent>
                  </Select>

                  {touched.cohortId && errors.cohortId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cohortId}
                    </p>
                  )}
                </div>

                {/* Education Level */}
                {selectedCohort ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="cohortId" className="text-right text-xs">
                        Education Level
                      </Label>

                      <div className="col-span-3">
                        <Field
                          as={Input}
                          id="educationLevel"
                          name="educationLevel"
                          value={EducationLevelLabels[selectedCohort?.educationLevel as EEducationLevel]}
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {/* Total Seats */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="totalSeats" className="text-right text-xs">
                    Total Seats
                  </Label>
                  <div className="col-span-3">
                    <Field name="totalSeats">
                      {({ field }: { field: any }) => (
                        <Input
                          {...field}
                          id="totalSeats"
                          type="number"
                          placeholder="100"
                          min={0}
                        />
                      )}
                    </Field>
                    {touched.totalSeats && errors.totalSeats && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.totalSeats}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expiry At */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="expiryAt" className="text-right text-xs">
                    Expiry At
                  </Label>

                  <div className="col-span-3">
                    <Popover
                      open={openDatePicker}
                      onOpenChange={setOpenDatePicker}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.expiresAt
                            ? format(new Date(values.expiresAt), 'dd-MM-yyyy')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0">
                        <FutureCalendar
                          mode="single"
                          selected={
                            values.expiresAt
                              ? new Date(values.expiresAt)
                              : undefined
                          }
                          onSelect={(date: any) => {
                            setFieldValue(
                              'expiresAt',
                              moment(date).format('YYYY-MM-DD')
                            );
                            setOpenDatePicker(false);
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    {touched.expiresAt && errors.expiresAt && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.expiresAt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddSeatBatchDialog;
