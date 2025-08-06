import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface GDPRRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type RequestType = "access" | "deletion" | "rectification" | "portability" | "withdrawal";

const GDPRRequestForm = ({ open, onOpenChange }: GDPRRequestFormProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    requestType: "access" as RequestType,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
    additionalInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real implementation, this would send the request to your backend
      // For now, we'll simulate the request
      console.log('GDPR Request:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "GDPR Request Submitted",
        description: "We have received your request and will respond within 30 days as required by GDPR. You will receive a confirmation email shortly.",
      });
      
      onOpenChange(false);
      setFormData({
        requestType: "access",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        description: "",
        additionalInfo: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRequestTypeDescription = (type: RequestType) => {
    switch (type) {
      case "access":
        return "Request a copy of all personal data we hold about you.";
      case "deletion":
        return "Request permanent deletion of your personal data (right to be forgotten).";
      case "rectification":
        return "Request correction of inaccurate or incomplete personal data.";
      case "portability":
        return "Request your data in a structured, machine-readable format.";
      case "withdrawal":
        return "Withdraw consent for data processing activities.";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-warm-white border-soft-caramel/20">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-display text-3xl text-cocoa-brown">
            Exercise Your GDPR Rights
          </DialogTitle>
          <p className="font-body text-cocoa-brown/80 leading-relaxed">
            Under GDPR, you have the right to access, correct, or delete your personal data. 
            Submit your request below and we'll respond within 30 days.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Request Type */}
          <div className="space-y-3">
            <Label className="font-body text-cocoa-brown">
              Type of Request *
            </Label>
            <RadioGroup
              value={formData.requestType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, requestType: value as RequestType }))}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="access" id="access" />
                <Label htmlFor="access" className="font-body text-cocoa-brown cursor-pointer">
                  <div>
                    <div className="font-semibold">Data Access</div>
                    <div className="text-sm text-cocoa-brown/70">Get a copy of your data</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deletion" id="deletion" />
                <Label htmlFor="deletion" className="font-body text-cocoa-brown cursor-pointer">
                  <div>
                    <div className="font-semibold">Data Deletion</div>
                    <div className="text-sm text-cocoa-brown/70">Permanently delete your data</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rectification" id="rectification" />
                <Label htmlFor="rectification" className="font-body text-cocoa-brown cursor-pointer">
                  <div>
                    <div className="font-semibold">Data Correction</div>
                    <div className="text-sm text-cocoa-brown/70">Correct inaccurate data</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portability" id="portability" />
                <Label htmlFor="portability" className="font-body text-cocoa-brown cursor-pointer">
                  <div>
                    <div className="font-semibold">Data Portability</div>
                    <div className="text-sm text-cocoa-brown/70">Get your data in machine-readable format</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="withdrawal" id="withdrawal" />
                <Label htmlFor="withdrawal" className="font-body text-cocoa-brown cursor-pointer">
                  <div>
                    <div className="font-semibold">Consent Withdrawal</div>
                    <div className="text-sm text-cocoa-brown/70">Withdraw consent for data processing</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            
            <p className="text-sm text-cocoa-brown/70 mt-2">
              {getRequestTypeDescription(formData.requestType)}
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-body text-cocoa-brown">
                First Name *
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
                Last Name *
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
              Email Address *
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
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="border-soft-caramel/30 focus:border-soft-caramel"
              placeholder="Optional"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-body text-cocoa-brown">
              Request Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="border-soft-caramel/30 focus:border-soft-caramel min-h-[100px]"
              placeholder="Please describe your request in detail..."
              required
            />
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="font-body text-cocoa-brown">
              Additional Information
            </Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              className="border-soft-caramel/30 focus:border-soft-caramel min-h-[80px]"
              placeholder="Any additional context or specific requirements..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full font-body text-lg py-3 bg-gradient-warm hover:opacity-90 text-warm-white border-0"
          >
            {loading ? "Submitting Request..." : "Submit GDPR Request"}
          </Button>
        </form>

        <div className="text-center text-sm text-cocoa-brown/60 font-body mt-4 space-y-2">
          <p>
            We will respond to your request within 30 days as required by GDPR.
          </p>
          <p>
            For urgent requests, contact us directly at{" "}
            <a href="mailto:privacy@strandly.co" className="text-cocoa-brown underline hover:text-brown-custom">
              privacy@strandly.co
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GDPRRequestForm; 