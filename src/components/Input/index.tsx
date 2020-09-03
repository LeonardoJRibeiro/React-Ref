import React, { forwardRef, RefForwardingComponent, useRef, useCallback, useImperativeHandle } from 'react';

interface InputHandles {
  focus: () => void;
  validate: () => boolean;
  getValue: () => string | undefined;
}


const Input: RefForwardingComponent<InputHandles, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const getValue = useCallback(() => {
    return inputRef.current?.value;
  }, []);

  const validate = useCallback(() => {
    return !!inputRef.current
      && inputRef.current.value !== undefined
      && inputRef.current.value.length > 0
  }, []);

  useImperativeHandle(ref, () => {
    return {
      focus,
      getValue,
      validate,
    }
  })

  return (
    <input ref={inputRef} {...props}/>
  );
}

export default forwardRef(Input);