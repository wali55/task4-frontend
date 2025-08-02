import React from "react";

const Field = ({label, children, htmlFor, error}) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className="flex flex-col">
        {label && <label htmlFor={id} className="text-sm text-neutral-700 font-semibold mb-2">{label}</label>}
        {children}
        {!!error && <div className="text-sm text-red-500">{error?.message}</div>}
    </div>
  )
}

const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child?.props?.id;
    }
}

export default Field