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
import {
  AdaptsPriceTierValues,
  IndividualPricingSchema,
} from '@/src/forms/settings/individualAdaptsSchema';
import api from '@/src/lib/axios';
import { formatCents, toCents } from '@/src/lib/helper';
import {
  IAdaptsPriceTier,
  IAdaptsPricingSettings,
} from '@/src/types/settingsTypes';
import { Field, Form, Formik } from 'formik';
import {
  Check,
  DollarSign,
  MoreHorizontal,
  Package,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import AddTierDialog from './AddTierDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import DeleteDialog from '@/src/components/common/DeleteDialog';
import { toast } from 'sonner';
import EditTierDialog from './EditTierDialog';
import { Badge } from '@/src/components/ui/badge';

type OrganizationPricingProps = {
  setting: IAdaptsPricingSettings;
  refresh: () => void;
};

const OrganizationPricing: React.FC<OrganizationPricingProps> = ({
  setting,
  refresh,
}) => {
  const tiers = useMemo(() => {
    return setting.tiers;
  }, [setting.tiers]);
  const [currentData, setCurrentData] = useState<IAdaptsPriceTier>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onEdit = (tier: IAdaptsPriceTier) => {
    setCurrentData(tier);
    setOpenEditDialog(true);
  };

  const onDelete = (tier: IAdaptsPriceTier) => {
    setCurrentData(tier);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!currentData) return;

    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/adapts/organization/tiers/${currentData.id}`
      );
    } catch (error) {
      toast.error('Unable to delte tier');
    } finally {
      refresh();
      setCurrentData(undefined);
    }
  };

  const onEditSuccess = () => {
    setOpenEditDialog(false);
    setCurrentData(undefined);
    refresh();
  };

  return (
    <>
      <Card className="border-border/50 w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Organization Pricing Tiers
              </CardTitle>
              <CardDescription>
                Manage tiered pricing for purchasing multiple ADAPTS seat codes
              </CardDescription>
            </div>

            {setting.tiers.length < 3 && <AddTierDialog refresh={refresh} />}
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier Name</TableHead>
                <TableHead>Min. Quantity</TableHead>
                <TableHead>Max. Quantity</TableHead>
                <TableHead>Price / Seat</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier, key) => (
                <TableRow key={key}>
                  <TableCell>
                    {tier.name}
                    <div className='italic'>{tier.description}</div>
                    {/* Features List */}
                    {tier.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tier.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="gap-1 pr-1"
                          >
                            <Check className="w-3 h-3" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{tier.minQty}</TableCell>
                  <TableCell>{tier.maxQty ?? 'Unlimited'}</TableCell>
                  <TableCell>{formatCents(tier.unitAmount)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(tier)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(tier)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {setting.tiers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No pricing tiers configured. Add your first tier to get
                    started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={confirmDelete}
      />

      <EditTierDialog
        tier={currentData}
        onSuccess={onEditSuccess}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
    </>
  );
};

export default OrganizationPricing;
