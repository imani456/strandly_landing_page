const ProcessSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Find your style",
      description: "Browse our curated collection of Afro hair inspiration and connect with skilled stylists."
    },
    {
      number: "2", 
      title: "Book in seconds",
      description: "Choose your preferred stylist, select services, and book your appointment instantly."
    },
    {
      number: "3",
      title: "Look and feel your best", 
      description: "Experience premium Afro hair care that celebrates your natural beauty."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="relative grid md:grid-cols-3 gap-x-12 gap-y-16">
          {/* Dashed line */}
          <div className="absolute top-8 left-0 right-0 hidden md:block">
            <div className="w-full border-t-2 border-dashed border-muted"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm z-10 relative">
                <span className="font-display text-2xl font-bold text-primary-foreground">
                  {step.number}
                </span>
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