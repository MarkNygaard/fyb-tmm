import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const buttonStyles = cva(
  [
    'group',
    'relative',
    'transition',
    'overflow-hidden',
    'font-light',
    'xl:font-normal',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-gradient-to-b',
          'from-skin-accent',
          'to-skin-accent/75',
          'text-white',
          'border-2',
          'border-skin-accent/50',
          'shadow-lg',
          'hover:scale-105',
        ],
        secondary: ['bg-skin-accent', 'text-white', 'border-white', 'border-2'],
      },
      size: {
        small: ['text-sm', 'py-2', 'xl:py-3'],
        medium: ['text-xl', 'py-3', 'xl:py-4'],
        large: ['text-2xl', 'py-6', 'xl:py-8'],
      },
      width: {
        small: ['px-4', 'xl:px-10'],
        medium: ['px-8', 'xl:px-14'],
        large: ['px-12', 'xl:px-20'],
      },
      form: {
        square: ['rounded-none'],
        rounded: ['rounded-md'],
      },
    },
    compoundVariants: [
      { intent: 'primary', size: 'medium', class: 'uppercase' },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      width: 'medium',
      form: 'rounded',
    },
  },
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  intent?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  width?: 'small' | 'medium' | 'large';
  form?: 'square' | 'rounded';
  label: string;
  glare?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  width,
  form,
  label,
  glare,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonStyles({ intent, size, width, form }))}
      {...props}
    >
      {label}
      {glare && (
        <div className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]'>
          <div className='relative h-full w-8 bg-white/20'></div>
        </div>
      )}
    </button>
  );
};
