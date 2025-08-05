import { useTranslation } from "react-i18next";
import lensSvg from "/public/lens.svg";
import phoneSvg from "/public/phone.svg";
import hairSvg from "/public/hair.svg";

const ProcessSteps = ({ id }: { id?: string }) => {
  const { t } = useTranslation();
  const steps = [
    {
      icon: lensSvg,
      title: t("process_steps.step1_title"),
      description: t("process_steps.step1_description"),
    },
    {
      icon: phoneSvg,
      title: t("process_steps.step2_title"),
      description: t("process_steps.step2_description"),
    },
    {
      icon: hairSvg,
      title: t("process_steps.step3_title"),
      description: t("process_steps.step3_description"),
    },
  ];

  return (
    <section id={id} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 lg:py-24">
        <div className="relative grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-12">
          {/* Dashed line */}
          <div className="absolute top-8 left-0 right-0 hidden md:block">
            <div className="w-full border-t-2 border-dashed border-muted"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm z-10 relative">
                <img src={step.icon} alt={`Step ${index + 1} icon`} className="w-8 h-8" />
              </div>
              
              <h3 className="font-display text-3xl text-foreground pt-4">
                {step.title}
              </h3>
              
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;