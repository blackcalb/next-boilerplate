'use client';

import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons/faSquareXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { deleteBillTrackItem } from '@/actions/money-track/bilTrackItems/deleteBillTrackItem';
import BaseButton from '@/components/buttons/BaseButton';
import FormButton from '@/components/buttons/FormButton';

export function DeleteBillButton({ id }: Readonly<{ id: string }>) {
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    return () => {
      setConfirmDel(false);
    };
  }, []);

  if (!confirmDel) {
    return (
      <BaseButton
        type="button"
        aria-label={`Delete Bill - ${id}`}
        color="dark"
        onClick={() => setConfirmDel(true)}
      >
        <FontAwesomeIcon icon={faTrash} size="xl" />
      </BaseButton>
    );
  }

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <BaseButton
        type="button"
        aria-label={`Cancel delete bill - ${id}`}
        color="dark"
        onClick={() => setConfirmDel(false)}
      >
        <FontAwesomeIcon icon={faSquareXmark} size="xl" />
      </BaseButton>
      <form action={deleteBillTrackItem}>
        <div className="flex justify-center">
          <input type="hidden" name="id" value={id} />
          <FormButton aria-label={`Delete Bill - ${id}`} color="dark">
            <FontAwesomeIcon icon={faCheckSquare} size="xl" />
          </FormButton>
        </div>
      </form>
    </motion.div>
  );
}
