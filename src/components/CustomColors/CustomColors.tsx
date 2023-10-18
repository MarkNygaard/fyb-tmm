'use client';

type Props = {
  primary: string;
  secondary: string;
  accent: string;
};

const CustomColors = ({ primary, secondary, accent }: Props) => {
  return (
    <style global jsx>{`
      :root {
        ${primary};
        ${secondary};
        ${accent};
      }
    `}</style>
  );
};

export default CustomColors;