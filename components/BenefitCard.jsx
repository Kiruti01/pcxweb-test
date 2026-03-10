const BenefitCard = ({ title, description, iconPath }) => {
  return (
    <div className="benefit-card bg-white p-10 max-md:p-6 rounded-[24px] border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex flex-col items-start h-full bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] -right-10 top-50">
      {/* Icon */}
      <img
        src={iconPath}
        alt="Rocket"
        className="w-12 h-12 max-md:w-10 max-md:h-10 mb-8 max-md:mb-5"
      />
      {/* Inter Bold Title */}
      <h3 className="text-[24px] max-md:text-base font-bold mb-5 max-md:mb-3 leading-[1.2] text-[#111827] font-inter">
        {title}
      </h3>

      {/* Roboto Regular Description */}
      <p className="text-[#6B7280] text-[17px] max-md:text-sm max-md:leading-5.5 leading-relaxed font-mono">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
