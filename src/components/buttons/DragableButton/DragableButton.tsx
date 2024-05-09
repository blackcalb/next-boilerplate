import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const DragableButton = () => {
  return (
    <div className="inline-block rounded-md p-2 hover:cursor-grab hover:bg-gray-200 active:cursor-grabbing dark:hover:bg-gray-800">
      <FontAwesomeIcon icon={faGripVertical} size="lg" />
    </div>
  );
};
