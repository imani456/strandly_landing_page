import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "client" as "client" | "stylist"
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('strandly_waitlist')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          user_type: formData.userType
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: t("waitlist_modal.already_registered_title"),
            description: t("waitlist_modal.already_registered_description"),
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: t("waitlist_modal.welcome_title"),
          description: t("waitlist_modal.welcome_description"),
        });
        onOpenChange(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          userType: "client"
        });
      }
    } catch (error) {
      toast({
        title: t("waitlist_modal.error_title"),
        description: t("waitlist_modal.error_description"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-warm-white border-soft-caramel/20">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-display text-3xl text-cocoa-brown">
            {t("waitlist_modal.title")}
          </DialogTitle>
          {/* <p className="font-body text-cocoa-brown/80 leading-relaxed">
            Be the first to experience premium Afro hair services in Europe. 
            Join thousands of women who trust us for their hair care journey.
          </p> */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-body text-cocoa-brown">
                {t("waitlist_modal.first_name_label")} *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="border-soft-caramel/30 focus:border-soft-caramel"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-body text-cocoa-brown">
                {t("waitlist_modal.last_name_label")} *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="border-soft-caramel/30 focus:border-soft-caramel"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-cocoa-brown">
              {t("waitlist_modal.email_label")} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="border-soft-caramel/30 focus:border-soft-caramel"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body text-cocoa-brown">
              {t("waitlist_modal.phone_label")}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="border-soft-caramel/30 focus:border-soft-caramel"
              placeholder={t("waitlist_modal.phone_placeholder")}
            />
          </div>

          {/* User Type */}
          <div className="space-y-3">
            <Label className="font-body text-cocoa-brown">
              {t("waitlist_modal.user_type_label")} *
            </Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value as "client" | "stylist" }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client" className="font-body text-cocoa-brown cursor-pointer">
                  {t("waitlist_modal.user_type_client")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stylist" id="stylist" />
                <Label htmlFor="stylist" className="font-body text-cocoa-brown cursor-pointer">
                  {t("waitlist_modal.user_type_stylist")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full font-body text-lg py-3 bg-gradient-warm hover:opacity-90 text-warm-white border-0"
          >
            {loading ? t("waitlist_modal.joining_button") : t("waitlist_modal.join_button")}
          </Button>
        </form>

        <p className="text-center text-sm text-cocoa-brown/60 font-body mt-4">
          {t("waitlist_modal.privacy_notice")}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;