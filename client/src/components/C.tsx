import React, { ReactElement } from "react";

export function C({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): ReactElement {
  return (
    <div {...rest} className={`${className}`}>
      {children}
    </div>
  );
}

C.Input = function ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>): ReactElement {
  return (
    <input
      {...rest}
      className={`p-2 mt-1 bg-white rounded shadow border-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </input>
  );
};

C.ErrorMessage = function ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>): ReactElement {
  return (
    <p {...rest} className={`mt-1 text-xs text-red-500 ${className}`}>
      {children}
    </p>
  );
};

C.Label = function ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>): ReactElement {
  return (
    <label {...rest} className={`text-sm text-gray-500 ${className}`}>
      {children}
    </label>
  );
};

C.Button = function ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>): ReactElement {
  return (
    <button
      {...rest}
      className={`min-w-[10rem] px-4 py-2 mt-4 text-white bg-green-500 rounded shadow hover:opacity-70 border-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};
