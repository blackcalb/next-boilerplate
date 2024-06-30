'use client';

import {
  faCancel,
  faCheck,
  faEdit,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import updateMovement from '@/actions/money-track/movemets/updateMovement';
import BaseButton from '@/components/buttons/BaseButton';
import FormButtonIcon from '@/components/buttons/FormButtonIcon';
import Input from '@/components/inputs/input';
import Select from '@/components/inputs/select';
import Typography from '@/components/Typography';
import type { Option } from '@/types/moneyTrack';
import { cn } from '@/utils/cn';

export interface MovementsWithCategoryAndAccountName {
  _id: string;
  category: { _id: string; name: string };
  bankAccount: { _id: string; name: string };
  type: string;
  name: string;
  date: string;
  currency: string;
  amount: number;
}

function getBackgroundColor(type: string) {
  switch (type) {
    case 'income':
      return 'bg-green-400';
    case 'expense':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
}

function getBorderColor(type: string) {
  switch (type) {
    case 'income':
      return 'border-green-600';
    case 'expense':
      return 'border-red-600';
    default:
      return 'border-gray-600';
  }
}

type MovementItemProps<T extends MovementsWithCategoryAndAccountName> =
  | {
      movement: T;
      allowEdit?: undefined;
      bankAccountOptions?: never[];
      categoriesOptions?: never[];
      path?: never;
      refetch?: never;
    }
  | {
      movement: T;
      allowEdit?: true;
      categoriesOptions?: Option[];
      bankAccountOptions?: Option[];
      path?: string;
      refetch?: () => void;
    };

export default function MovementItem<
  T extends MovementsWithCategoryAndAccountName,
>({
  movement,
  allowEdit,
  ...remanainingProps
}: Readonly<MovementItemProps<T>>) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      className={cn(
        'w-full',
        'grid gap-2 items-center',
        !allowEdit && 'grid-cols-5',
        allowEdit && 'grid-cols-6',
        'rounded-md border-2',
        getBorderColor(movement.type),
        getBackgroundColor(movement.type),
        'text-black',
        'px-4 py-2',
      )}
    >
      <div className="col-span-2">
        <Typography className="text-xl font-bold">{movement.name}</Typography>
        <Typography variant="p">
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(new Date(movement.date))}
        </Typography>
      </div>
      <div className="col-span-2">
        <Typography className="italic">{movement.bankAccount.name}</Typography>
        <Typography className="italic">{movement.category.name}</Typography>
      </div>
      <Typography className="text-lg font-bold">
        {Intl.NumberFormat('en-EU', {
          style: 'currency',
          currency: movement.currency,
        }).format(Math.abs(movement.amount))}
      </Typography>
      {allowEdit && (
        <div className="h-12 overflow-hidden">
          <motion.div
            className="flex h-12 items-center justify-end gap-2"
            variants={{
              hidden: { y: -48 },
              visible: { y: 0 },
            }}
            animate={isEditing || isDeleting ? 'hidden' : 'visible'}
          >
            <BaseButton
              type="button"
              className="text-black"
              iconStart={<FontAwesomeIcon icon={faEdit} />}
              onClick={() => setIsEditing(true)}
            />

            <BaseButton
              type="button"
              className="text-black"
              iconStart={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => setIsDeleting(true)}
            />
          </motion.div>
          <motion.div
            className="flex h-12 items-center justify-end gap-2"
            variants={{
              hidden: { y: 0 },
              visible: { y: -48 },
            }}
            animate={isDeleting ? 'visible' : 'hidden'}
          >
            <BaseButton
              type="button"
              className="text-black"
              iconStart={<FontAwesomeIcon icon={faCheck} />}
            />

            <BaseButton
              type="button"
              className="text-black"
              iconStart={<FontAwesomeIcon icon={faCancel} />}
              onClick={() => setIsDeleting(false)}
            />
          </motion.div>
        </div>
      )}

      <motion.div
        className="col-span-full"
        variants={{
          hidden: { height: 0 },
          visible: { height: 220 },
        }}
        animate={isEditing ? 'visible' : 'hidden'}
      >
        {allowEdit && isEditing && (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <FormUpdateRecord
            movement={movement}
            bankAccountOptions={remanainingProps?.bankAccountOptions ?? []}
            categoriesOptions={remanainingProps?.categoriesOptions ?? []}
            onClose={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
            path={remanainingProps.path}
            refetch={remanainingProps.refetch}
          />
        )}
      </motion.div>
    </div>
  );
}

function FormUpdateRecord({
  movement,
  bankAccountOptions,
  categoriesOptions,
  onCancel,
  onClose,
  path,
  refetch,
}: Readonly<{
  movement: MovementsWithCategoryAndAccountName;
  bankAccountOptions: Option[];
  categoriesOptions: Option[];
  onCancel: () => void;
  onClose: () => void;
  path?: string;
  refetch?: () => void;
}>) {
  // eslint-disable-next-line @typescript-eslint/naming-convention, unused-imports/no-unused-vars
  const [state, formAction] = useFormState(updateMovement, null);

  useEffect(() => {
    if (state?.sttus === 'success') {
      refetch?.();
      onClose();
    }
  }, [refetch, state?.sttus, onClose]);

  return (
    <form action={formAction}>
      <input type="hidden" value={movement._id} name="movementId" />
      <input type="hidden" value={path} name="path" />
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-2">
          <Input name="name" label="Name" defaultValue={movement.name} />
        </div>
        <div className="col-span-2">
          <Input
            name="date"
            label="Date"
            defaultValue={movement.date.split('T')[0]}
            type="date"
          />
        </div>
        <div className="col-span-2">
          <Input
            name="amount"
            label="Amount"
            defaultValue={-movement.amount}
            type="number"
          />
        </div>
        <div className="col-span-3">
          <Select
            name="bankAccount"
            options={bankAccountOptions}
            label="Bank Account"
            defaultValue={movement.bankAccount._id}
          />
        </div>
        <div className="col-span-3">
          <Select
            name="category"
            options={categoriesOptions}
            label="Category"
            defaultValue={movement.category._id}
          />
        </div>
      </div>
      <div className="mx-auto mt-4 flex justify-center gap-4">
        <FormButtonIcon
          icon={
            <FontAwesomeIcon icon={faSave} size="3x" className="text-black" />
          }
        />
        <BaseButton
          iconStart={
            <FontAwesomeIcon icon={faCancel} size="3x" className="text-black" />
          }
          type="reset"
          onClick={onCancel}
        />
      </div>
    </form>
  );
}
