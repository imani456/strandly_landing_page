
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";

const Impressum = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="mb-8">
          <BackButton />
        </div>
        <h1 className="font-display text-4xl font-bold mb-8">{t("impressum.title")}</h1>
        <div className="space-y-6 font-body text-lg">
          <p>
            <strong>{t("impressum.company_name")}</strong>
            <br />
            {t("impressum.represented_by_name")}
            <br />
            {t("impressum.address").split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </p>
          <p>
            <strong>{t("impressum.represented_by_label")}</strong>
            <br />
            {t("impressum.represented_by_name")}
          </p>
          <p>
            <strong>{t("impressum.contact_label")}</strong>
            <br />
            {t("impressum.email_label")} <a href={`mailto:${t("impressum.email")}`} className="text-accent hover:underline">{t("impressum.email")}</a>
          </p>
          <p>
            <strong>{t("impressum.business_information_label")}</strong>
            <ul className="list-disc list-inside ml-4">
              <li>{t("impressum.business_type_label")} {t("impressum.business_type")}</li>
              <li>{t("impressum.registered_at_label")} {t("impressum.registered_at")}</li>
            </ul>
          </p>
          <p>
            <strong>{t("impressum.responsible_for_content_label")}</strong>
            <br />
            {t("impressum.responsible_for_content_name")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
