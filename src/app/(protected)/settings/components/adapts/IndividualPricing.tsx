import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { IndividualPricingSchema } from '@/src/forms/settings/individualAdaptsSchema';
import api from '@/src/lib/axios';
import { formatCents, toCents } from '@/src/lib/helper';
import { IAdaptsPricingSettings } from '@/src/types/settingsTypes';
import { Field, Form, Formik } from 'formik';
import {  PhilippinePeso } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type IndividualPricingProps = {
  setting: IAdaptsPricingSettings;
  refresh: () => void
};

const IndividualPricing: React.FC<IndividualPricingProps> = ({ setting, refresh}) => {
  const initialValues = {
    unitAmount: formatCents(setting.unitAmount),
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    if (!values.unitAmount) return;

    try {
      const amount = toCents(values.unitAmount);

      const requestParams = {
        unitAmount: amount,
      };

      await api.patch(`/settings/adapts/individual/pricing`, requestParams);

      toast.success(`Individual ADAPTS Pricing set to ${formatCents(amount)}`);
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSubmitting(false);
      refresh();
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhilippinePeso className="w-5 h-5 text-primary" />
          Individual ADAPTS Assessment Price
        </CardTitle>
        <CardDescription>
          Set the default price for a single ADAPTS seat code purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={toFormikValidationSchema(IndividualPricingSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="unitAmount" className="text-right text-xs">
                  Unit Amount*
                </Label>
                <div className="col-span-3">
                  <Field name="unitAmount">
                    {({ field }: { field: any }) => (
                      <Input
                        {...field}
                        id="unitAmount"
                        type="number"
                        placeholder="100.00"
                        min={0}
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default IndividualPricing;
