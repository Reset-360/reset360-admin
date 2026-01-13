import React from 'react';

const RefItemIdLabel = ({ ref }: { ref: string }) => {
  return (
    <div className="font-mono text-xs text-foreground tracking-wider">
      {ref}
    </div>
  );
};

export default RefItemIdLabel;
