const FieldSet = ({label, children}) => {
  return (
    <fieldset className="w-[300px]">
        {label && <legend className="text-lg text-neutral-900 mb-4">{label}</legend>}
        <div className="flex flex-col gap-2">
            {children}
        </div>
    </fieldset>
  )
}

export default FieldSet