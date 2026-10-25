import SectionSvg from "../assets/svg/SectionSvg";

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}) => {
  return (
    <div
      id={id}
      className={`
    relative 
    ${
      customPaddings ||
      `py-0 lg:py-6 xl:py-20 ${crosses ? "lg:py- xl:py-40" : ""}`
    } 
    ${className || ""}`}
    >
      <div className="hidden absolute top-10 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-71.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />
      {children}

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};

export default Section;
