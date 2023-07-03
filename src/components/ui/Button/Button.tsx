import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(['font-light', 'shadow-lg', 'py-4', 'xl:py-6'], {
  variants: {
    intent: {
      primary: [
        'bg-skin-accent',
        'text-white',
        'hover:scale-110',
        'transform',
        'transition',
        'duration-300',
      ],
      secondary: [
        'bg-white',
        'text-gray-800',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-lg', 'py-2', 'px-4'],
      large: ['text-2xl', 'py-3', 'px-6'],
    },
    width: {
      small: ['px-4', 'xl:px-12'],
      medium: ['px-8', 'xl:px-16'],
      large: ['px-12', 'xl:px-20'],
    },
  },
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    width: 'medium',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  intent?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  width?: 'small' | 'medium' | 'large';
  label: string;
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  width,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonStyles({ intent, size, width })} {...props}>
      {label}
    </button>
  );
};