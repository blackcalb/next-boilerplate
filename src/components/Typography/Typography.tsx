import React from 'react';

import { cn } from '@/utils/cn';
import { Colors, mapTextColors } from '@/utils/theme/colors';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: Colors;
  textGradient?: boolean;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const defaultProps = {
  variant: 'p' as NonNullable<TextProps['variant']>,
  color: Colors.inherit,
  textGradient: false,
  as: undefined,
  className: '',
};

const size: Record<NonNullable<TextProps['variant']>, string> = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
  p: 'text-base',
  span: 'text-base',
};

export const Typography = React.forwardRef<HTMLElement, TextProps>(
  function TypographyComponent(
    {
      variant = defaultProps.variant,
      color = defaultProps.color,
      // textGradient = defaultProps.textGradient,
      as,
      className = defaultProps.className,
      children,
      ...rest
    },
    ref,
  ) {
    const classes = cn(
      // classnames(
      //   typographyVariant,
      //   { [typographyColor.color]: !textGradient },
      //   { [gradientTextClasses]: textGradient },
      //   { [typographyColor.gradient]: textGradient },
      // ),
      mapTextColors[color],
      size[variant],
      className,
    );

    const template = React.createElement(
      as || variant,
      {
        ...rest,
        ref,
        className: classes,
      },
      children,
    );

    return template;
  },
);
