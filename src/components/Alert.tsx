import Link from 'next/link';

const Alert = ({ preview }: { preview: boolean }): JSX.Element => {
  return (
    <div className='bg-pine-300 bg-accent-1 border-accent-2 border-b'>
      <div className='container py-2 text-center text-sm'>
        <Link href='/api/exit-preview'>
          <a className='hover:text-cyan underline transition-colors duration-200'>
            This is page is showing draft content. Click here to exit preview
            mode.
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Alert;
