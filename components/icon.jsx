import { twMerge } from "tailwind-merge";
//method call 
const Icon = ({ Icon, className, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        "text-base text-white duration-300 ease-linear transition-all hover:text-rose",
        className
      )}
    >
      <Icon />
    </div>
  );
};
export default Icon;
