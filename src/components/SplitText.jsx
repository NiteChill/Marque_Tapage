import React from 'react';

export default function SplitText({
  children,
  className,
  animationClass,
  container,
  split = 'chars',
  overflow = false,
}) {
  const words = [];
  children
    .split(' ')
    .map((e) => words.push(split === 'chars' ? e.split('') : e));
  return (
    <h1 className={className} ref={container ? container : undefined}>
      {words.map((word, id) => (
        <React.Fragment key={id}>
          <div className={`relative inline-block ${overflow ? undefined : 'overflow-hidden'}`}>
            {split === 'chars' ? (
              word.map((char, id) => (
                <div
                  className={`relative inline-block ${animationClass}`}
                  key={id}
                >
                  {char}
                </div>
              ))
            ) : (
              <div
                className={`relative inline-block ${animationClass}`}
                key={id}
              >
                {word}
              </div>
            )}
          </div>{' '}
        </React.Fragment>
      ))}
    </h1>
  );
}
