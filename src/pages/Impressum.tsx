
const Impressum = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <h1 className="font-display text-4xl font-bold mb-8">Impressum (Legal Notice)</h1>
        <div className="space-y-6 font-body text-lg">
          <p>
            <strong>Company Name:</strong> Strandly
          </p>
          <p>
            <strong>Address:</strong> Musterstraße 1, 12345 Musterstadt, Germany
          </p>
          <p>
            <strong>Email:</strong> contact@strandly.com
          </p>
          <p>
            <strong>Phone:</strong> +49 123 4567890
          </p>
          <p>
            <strong>Responsible for Content (Verantwortlich nach § 55 RStV):</strong>
            <br />
            Max Mustermann
            <br />
            Musterstraße 1, 12345 Musterstadt, Germany
          </p>
          <p>
            <strong>VAT ID (USt-IdNr.):</strong> DE123456789
            <br />
            <em className="text-muted-foreground">
              Alternatively, if you are a Kleinunternehmer (small business owner):
              "Umsatzsteuerbefreit nach §19 UStG" (VAT exempt according to §19 UStG).
            </em>
          </p>
          <p>
            <strong>Commercial Register (Handelsregister):</strong>
            <br />
            Amtsgericht Musterstadt, HRB 12345
            <br />
            <em className="text-muted-foreground">
              (Only if applicable)
            </em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
