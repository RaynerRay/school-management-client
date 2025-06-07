// "use client";
// import AddNewButton from "@/components/FormInputs/AddNewButton";
// import React from "react";
// import Select from "react-tailwindcss-select";
// import { Option, Options } from "react-tailwindcss-select/dist/components/type";

// type FormSelectInputProps = {
//   options: Options;
//   label: string;
//   option: Option;
//   setOption: any;
//   href?: string;
//   labelShown?: boolean;
//   toolTipText?: string;
//   isSearchable?: boolean;
// };

// export default function FormMultipleSelectInput({
//   options = [],
//   label,
//   option,
//   setOption,
//   href,
//   toolTipText,
//   labelShown = true,
//   isSearchable = true,
// }: FormSelectInputProps) {
//   // Debug logs
//   console.log("Options:", options);
//   console.log("Type of options:", typeof options);
//   console.log("First Option:", options?.[0]);
//   console.log("Option:", option);

//   // Ensure options is always an array and filter invalid items
//   const safeOptions = (Array.isArray(options) ? options : []).filter(
//     (item) =>
//       item && typeof item === "object" && "label" in item && "value" in item
//   );

//   // Ensure option is valid
//   const defaultOption = { label: "", value: "" };
//   const selectedOption = option && "label" in option ? option : defaultOption;

//   function handleChange(item: any) {
//     setOption(item);
//     console.log("Selected:", item);
//   }

//   console.log("Safe Options:", safeOptions);

//   return (
//     <div>
//       {labelShown && (
//         <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
//           Select {label}
//         </h2>
//       )}
//       <div className="flex items-center space-x-2">
//         <Select
//           isSearchable={isSearchable}
//           primaryColor="blue"
//           value={selectedOption}
//           onChange={handleChange}
//           options={safeOptions}
//           placeholder={label}
//           isMultiple={true}
//           isClearable={true}
//         />
//         {href && toolTipText && (
//           <AddNewButton toolTipText={toolTipText} href={href} />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;// eslint-disable-line @typescript-eslint/no-explicit-any
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
};
export default function FormMultipleSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
}: FormSelectInputProps) {
  // const [results, setResults] = useState([]);

  function handleChange(item: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
    setOption(item);
    console.log(item);
  }

  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          isSearchable={isSearchable}
          primaryColor="blue"
          value={option}
          onChange={handleChange}
          options={options}
          placeholder={label}
          isMultiple={true}
          isClearable={true}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
