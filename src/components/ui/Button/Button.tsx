import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const buttonStyles = cva(['font-light'], {
  variants: {
    intent: {
      primary: [
        'bg-skin-accent',
        'text-white',
        'hover:bg-transparent',
        'border-2',
        'border-skin-accent',
        'transform',
        'transition',
        'duration-300',
        'shadow-lg',
      ],
      secondary: [
        'bg-skin-accent',
        'text-white',
        'border-white',
        'border-2',
      ],
    },
    size: {
      small: ['text-sm', 'py-2', 'xl:py-3'],
      medium: ['text-xl', 'py-4', ' xl:py-5'],
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
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    width: 'medium',
    form: 'rounded',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  intent?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  width?: 'small' | 'medium' | 'large';
  form?: 'square' | 'rounded';
  label: string;
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  width,
  form,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonStyles({ intent, size, width, form }))}
      {...props}
    >
      {label}
    </button>
  );
};
