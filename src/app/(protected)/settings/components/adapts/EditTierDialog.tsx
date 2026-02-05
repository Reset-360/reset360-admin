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
import { Package } from 'lucide-react';
import { toast } from 'sonner';
import { IAdaptsPriceTier } from '@/src/types/settingsTypes';
import { fromCents, toCents } from '@/src/lib/helper';
import {
  AdaptsPriceTierSchema,
  AdaptsPriceTierValues,
} from '@/src/forms/settings/individualAdaptsSchema';

type EditTierDialogProps = {
  tier?: IAdaptsPriceTier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const EditTierDialog = ({
  tier,
  open,
  onOpenChange,
  onSuccess,
}: EditTierDialogProps) => {
  if (!tier) {
    return null;
  }

  const initialValues: IAdaptsPriceTier = {
    id: tier.id,
    name: tier.name,
    minQty: tier.minQty,
    maxQty: tier.maxQty,
    unitAmount: fromCents(tier.unitAmount),
  };

  async function handleSubmit(
    values: AdaptsPriceTierValues,
    { setSubmitting }: any
  ) {
    if (!tier) return;

    try {
      const params = {
        ...values,
        unitAmount: toCents(values.unitAmount),
      };
      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/adapts/organization/tiers/${tier.id}`,
        params
      );

      toast.success('Successfully updated tier');
    } catch (error) {
      toast.error('Failed to edit tier');
    } finally {
      setSubmitting(false);
      onSuccess?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="Add record dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <Package /> Edit Tier
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={toFormikValidationSchema(AdaptsPriceTierSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-right text-xs">
                  Name*
                </Label>
                <div className="col-span-3">
                  <Field name="name">
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="Enter tier name"
                        min={0}
                      />
                    )}
                  </Field>
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Min Qty */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="minQty" className="text-right text-xs">
                    Min Qty*
                  </Label>
                  <div className="col-span-3">
                    <Field name="minQty">
                      {({ field }: { field: any }) => (
                        <Input
                          {...field}
                          id="minQty"
                          type="number"
                          placeholder="1"
                          min={1}
                        />
                      )}
                    </Field>
                    {touched.minQty && errors.minQty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.minQty}
                      </p>
                    )}
                  </div>
                </div>

                {/* Max Qty */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="maxQty" className="text-right text-xs">
                    Max Qty*
                  </Label>
                  <div className="col-span-3">
                    <Field name="maxQty">
                      {({ field }: { field: any }) => (
                        <Input
                          {...field}
                          id="maxQty"
                          type="number"
                          placeholder="100"
                          min={1}
                        />
                      )}
                    </Field>
                    {touched.maxQty && errors.maxQty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.maxQty}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Unit Amount */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="unitAmount" className="text-right text-xs">
                  Price Per Seat*
                </Label>
                <div className="col-span-3">
                  <Field name="unitAmount">
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        id="unitAmount"
                        type="number"
                        placeholder="100.00"
                      />
                    )}
                  </Field>
                  {touched.unitAmount && errors.unitAmount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.unitAmount}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
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

export default EditTierDialog;
