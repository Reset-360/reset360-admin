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
import { QrCode } from 'lucide-react';
import { toast } from 'sonner';

import { SeatBatch } from '@/src/types/seatBatchTypes';
import {
  GenerateSeatCodeSchema,
  GenerateSeatCodeValues,
} from '@/src/forms/seatBatchSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { EAssessmentType } from '@/src/types/assessmentTypes';
import { EducationLevelLabels, EEducationLevel } from '@/src/types/cohortTypes';

const assessmentTypes = Object.values(EAssessmentType);

type GenerateSeatCodeDialogProps = {
  seatBatch?: SeatBatch;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const GenerateSeatCodeDialog = ({
  seatBatch,
  open,
  onOpenChange,
  onSuccess,
}: GenerateSeatCodeDialogProps) => {
  if (!seatBatch) {
    return null;
  }

  const initialValues: GenerateSeatCodeValues = {
    batchId: seatBatch._id,
    cohortId: seatBatch.cohortId?._id,
    type: EAssessmentType.ADAPTS_S,
    quantity: 1,
  };
  
  async function handleSubmit(values: GenerateSeatCodeValues) {
    const start = performance.now();

    try {
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/seat-codes/generate`,
        values
      );

      const end = performance.now(); // end timer
      const duration = ((end - start) / 1000).toFixed(2);

      const message = `Successfully generated ${values.quantity} seat codes in ${duration} seconds`

      onSuccess?.();
      toast.success(message);
      console.log(message);
    } catch (error: any) {
      const end = performance.now();
      const duration = ((end - start) / 1000).toFixed(2);

      let message = `Failed to generate seat codes (after ${duration} seconds)`;

      if (error?.response?.data?.quantity) {
        message = error.response.data.quantity;
      }

      toast.error(message);
      console.log(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-description="Add record dialog"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1 text-neutral-900">
            <QrCode /> Generate Seat Codes
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(GenerateSeatCodeSchema)}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="grid gap-4 py-4">
              {/* Organization */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="organizationId" className="text-right text-xs">
                  Organization
                </Label>

                <div className="col-span-3">
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    value={seatBatch?.organizationId?.name}
                    readOnly
                  />
                </div>
              </div>

              {/* Cohort + Education Level */}
              {seatBatch?.cohortId ? (
                <>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="cohortId" className="text-right text-xs">
                      Cohort
                    </Label>

                    <div className="col-span-3">
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        value={seatBatch?.cohortId?.name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="cohortId" className="text-right text-xs">
                      Education Level
                    </Label>

                    <div className="col-span-3">
                      <Field
                        as={Input}
                        id="educationLevel"
                        name="educationLevel"
                        value={EducationLevelLabels[seatBatch?.cohortId?.educationLevel as EEducationLevel]}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {/* Type Dropdown */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="type" className="text-right text-xs">
                  Type
                </Label>

                <Select
                  value={values.type}
                  onValueChange={(value) => {
                    setFieldValue('type', value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>

                  <SelectContent>
                    {assessmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {touched.type && errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-right text-xs">
                  Quantity
                </Label>
                <div className="col-span-3">
                  <Field
                    as={Input}
                    id="quantity"
                    name="quantity"
                    placeholder="10"
                    type="number"
                    min={0}
                  />
                  {touched.quantity && errors.quantity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.quantity}
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
                  {isSubmitting ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateSeatCodeDialog;
