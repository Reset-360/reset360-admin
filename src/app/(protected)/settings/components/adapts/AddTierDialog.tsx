import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  AdaptsPriceTierSchema,
  AdaptsPriceTierValues,
} from '@/src/forms/settings/individualAdaptsSchema';
import api from '@/src/lib/axios';
import { toCents } from '@/src/lib/helper';
import { Field, Form, Formik } from 'formik';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const AddTierDialog = ({ refresh }: { refresh: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues: AdaptsPriceTierValues = {
    name: '',
    minQty: 1,
    maxQty: 1,
    unitAmount: 0,
  };

  const handleSubmit = async (
    values: AdaptsPriceTierValues,
    { setSubmitting }: any
  ) => {
    const params = {
      ...values,
      unitAmount: toCents(values.unitAmount),
    };

    try {
      await api.post(`/settings/adapts/organization/tiers`, params);

      toast.success(`Successfully added tier`);
    } catch (err) {
      toast.error('Unable to add tier');
    } finally {
      setSubmitting(false);
      setIsOpen(false);
      refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Tier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{'Add New Pricing Tier'}</DialogTitle>
          <DialogDescription>
            Configure the tier settings for bulk seat code orders
          </DialogDescription>
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
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Add Tier'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTierDialog;
