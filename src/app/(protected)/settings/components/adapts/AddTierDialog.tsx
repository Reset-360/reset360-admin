import { Badge } from '@/src/components/ui/badge';
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
import { Textarea } from '@/src/components/ui/textarea';
import {
  AdaptsPriceTierSchema,
  AdaptsPriceTierValues,
} from '@/src/forms/settings/individualAdaptsSchema';
import api from '@/src/lib/axios';
import { toCents } from '@/src/lib/helper';
import { Field, Form, Formik } from 'formik';
import { Check, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const AddTierDialog = ({ refresh }: { refresh: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues: AdaptsPriceTierValues & { newFeature: string } = {
    name: '',
    minQty: 1,
    maxQty: 1,
    unitAmount: 0,
    description: '',
    features: [] as string[],
    newFeature: '',
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
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
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

              {/* Description */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="description" className="text-right text-xs">
                  Description
                </Label>
                <div className="col-span-3">
                  <Field name="description">
                    {({ field }: { field: any }) => (
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Enter tier description"
                        rows={3}
                      />
                    )}
                  </Field>
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

              {/* Features */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="newFeature" className="text-right text-xs">
                  Feature
                </Label>
                <div className="flex gap-2">
                  <Field name="newFeature">
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        id="newFeature"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && values.newFeature.trim()) {
                            e.preventDefault();
                            setFieldValue('features', [
                              ...values.features,
                              values.newFeature.trim(),
                            ]);
                            setFieldValue('newFeature', '');
                          }
                        }}
                      />
                    )}
                  </Field>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (values.newFeature.trim()) {
                        setFieldValue('features', [
                          ...values.features,
                          values.newFeature.trim(),
                        ]);
                        setFieldValue('newFeature', '');
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Features List */}
              {values.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      <Check className="w-3 h-3" />
                      {feature}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            'features',
                            values.features.filter((_, i) => i !== index)
                          )
                        }
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

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
