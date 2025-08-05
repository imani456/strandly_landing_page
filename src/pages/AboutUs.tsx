import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">{t("aboutUs.title")}</h1>
      <div className="prose lg:prose-xl mx-auto">
        <p>{t("aboutUs.paragraph1")}</p>
        <p>{t("aboutUs.paragraph2")}</p>
        <p>{t("aboutUs.paragraph3")}</p>
        <ul>
          <li>{t("aboutUs.bullet1")}</li>
          <li>{t("aboutUs.bullet2")}</li>
          <li>{t("aboutUs.bullet3")}</li>
        </ul>
        <p>{t("aboutUs.paragraph4")}</p>
        <p>{t("aboutUs.paragraph5")}</p>
      </div>
    </div>
  );
};

export default AboutUs;
