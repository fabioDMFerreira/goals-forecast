import chroma from 'chroma-js';
import React from 'react';
import Badge from 'reactstrap/lib/Badge';

interface Props {
  label: string;
  color?: string;
}

export default ({ label, color = 'grey' }: Props) => {
  const chromaColor = chroma(color || 'grey');

  return (
    <Badge style={{
      backgroundColor: chromaColor.alpha(0.1).css(),
      color,
      fontSize: '0.8rem',
      lineHeight: '0.8rem',
    }}
    >{label}
    </Badge>
  );
};
