"use client";


import { useCallback, useRef, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TermsModal } from "@/components/auth/terms-modal";
import { RoleSelection, type SignUpRole } from "@/components/auth/sign-up/role-selection";
import { SellerForm } from "@/components/auth/sign-up/seller-form";
import { DealerForm } from "@/components/auth/sign-up/dealer-form";
import { OtpVerification } from "@/components/auth/sign-up/otp-verification";
import { SuccessDealer } from "@/components/auth/sign-up/success-dealer";
import { SuccessSeller } from "@/components/auth/sign-up/success-seller";
import { useRegisterSeller, useRegisterDealer } from "@/features/auth/hooks/use-sign-up";
import { useVerifyOtp } from "@/features/auth/hooks/use-verify-otp";
import type { SellerSignUpInput, DealerSignUpInput } from "@/components/auth/sign-up/sign-up-schemas";
import { AlertCircle, X } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function SignUpPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<SignUpRole | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const setAgreedRef = useRef<(value: boolean) => void>(() => {});
  /** Stores validated form data while the user reviews the Terms/Privacy modal. */
  const pendingSellerDataRef = useRef<SellerSignUpInput | null>(null);
  const pendingDealerDataRef = useRef<DealerSignUpInput | null>(null);
  /** Generic advance callback used by dealer flow and direct terms-open clicks. */
  const pendingAdvanceRef = useRef<(() => void) | null>(null);

  const { mutate: registerSeller, isPending: isRegistering } = useRegisterSeller();
  const { mutate: registerDealer, isPending: isRegisteringDealer } = useRegisterDealer();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();

  const handleOtpVerify = useCallback((code: string) => {
    setApiError(null);
    verifyOtp(
      {
        email: registeredEmail,
        otp: code,
      },
      {
        onSuccess: () => {
          setStep(4);
        },
        onError: (error: Error) => {
          setApiError(error.message);
        },
      }
    );
  }, [verifyOtp, registeredEmail]);

  const registerAgreementSetter = useCallback((setter: (value: boolean) => void) => {
    setAgreedRef.current = setter;
  }, []);

  // Seller: capture form data → open Terms → API fires on Confirm
  const beginSellerSignUpTermsGate = useCallback((data: SellerSignUpInput) => {
    pendingSellerDataRef.current = data;
    pendingAdvanceRef.current = null;
    setShowPrivacyModal(false);
    setShowTermsModal(true);
    setApiError(null);
  }, []);

  const beginDealerSignUpTermsGate = useCallback((data: DealerSignUpInput) => {
    pendingDealerDataRef.current = data;
    pendingAdvanceRef.current = null;
    setShowPrivacyModal(false);
    setShowTermsModal(true);
    setApiError(null);
  }, []);

  const closeLegalModals = () => {
    setShowTermsModal(false);
    setShowPrivacyModal(false);
  };

  const handleLegalCancel = () => {
    pendingAdvanceRef.current = null;
    pendingSellerDataRef.current = null;
    pendingDealerDataRef.current = null;
    setAgreedRef.current(false);
    closeLegalModals();
  };

  const handleLegalConfirm = () => {
    setAgreedRef.current(true);
    closeLegalModals();

    // Seller registration flow: map form values → API shape and fire the mutation
    const sellerData = pendingSellerDataRef.current;
    if (sellerData) {
      pendingSellerDataRef.current = null;
      setApiError(null);

      registerSeller(
        {
          email: sellerData.email,
          password: sellerData.password,
          confirm_password: sellerData.confirmPassword,
          name: sellerData.fullName,
          phone: sellerData.phone,
          address: sellerData.address,
          zip_code: sellerData.zip,
        },
        {
          onSuccess: (response) => {
            setRegisteredEmail(response.user.email);
            setStep(3);
          },
          onError: (error: Error) => {
            setApiError(error.message);
          },
        }
      );
      return;
    }

    // Dealer registration flow: map form values → API shape and fire the mutation
    const dealerData = pendingDealerDataRef.current;
    if (dealerData) {
      pendingDealerDataRef.current = null;
      setApiError(null);

      registerDealer(
        {
          email: dealerData.businessEmail,
          password: dealerData.password,
          confirm_password: dealerData.confirmPassword,
          business_name: dealerData.businessName,
          business_email: dealerData.businessEmail,
          business_phone: dealerData.businessPhone,
          business_address: dealerData.address,
          zip_code: dealerData.zip,
          dealer_license_number: dealerData.licenseNumber,
        },
        {
          onSuccess: (response) => {
            setRegisteredEmail(response.user.email);
            setStep(3);
          },
          onError: (error: Error) => {
            setApiError(error.message);
          },
        }
      );
      return;
    }

    // Dealer flow / direct terms-open clicks: run the stored advance callback
    const run = pendingAdvanceRef.current;
    pendingAdvanceRef.current = null;
    run?.();
  };

  const legalModalOpen = showTermsModal || showPrivacyModal;
  const legalModalTitle = showPrivacyModal ? "Privacy Policy" : "Terms of Use";

  return (
    <AuthLayout>
      <TermsModal
        open={legalModalOpen}
        title={legalModalTitle}
        onCancel={handleLegalCancel}
        onConfirm={handleLegalConfirm}
      />

      {/* API Error Banner */}
      {apiError && (
        <div className="mb-4 flex w-full max-w-lg items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
          <span className="flex-1 font-navbar leading-relaxed">{apiError}</span>
          <button
            type="button"
            onClick={() => setApiError(null)}
            className="shrink-0 rounded p-0.5 hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {step === 1 && (
        <RoleSelection
          role={role}
          setRole={setRole}
          onContinue={() => {
            if (role) setStep(2);
          }}
        />
      )}

      {step === 2 && role === "seller" && (
        <SellerForm
          registerAgreementSetter={registerAgreementSetter}
          onOpenTerms={() => {
            pendingAdvanceRef.current = null;
            setShowPrivacyModal(false);
            setShowTermsModal(true);
          }}
          onOpenPrivacy={() => {
            pendingAdvanceRef.current = null;
            setShowTermsModal(false);
            setShowPrivacyModal(true);
          }}
          onRequestTermsBeforeComplete={beginSellerSignUpTermsGate}
          isLoading={isRegistering}
        />
      )}

      {step === 2 && role === "dealer" && (
        <DealerForm
          registerAgreementSetter={registerAgreementSetter}
          onOpenTerms={() => {
            pendingAdvanceRef.current = null;
            setShowPrivacyModal(false);
            setShowTermsModal(true);
          }}
          onOpenPrivacy={() => {
            pendingAdvanceRef.current = null;
            setShowTermsModal(false);
            setShowPrivacyModal(true);
          }}
          onSignUpComplete={beginDealerSignUpTermsGate}
          isLoading={isRegisteringDealer}
        />
      )}

      {step === 3 && (
        <OtpVerification
          email={registeredEmail}
          onContinue={handleOtpVerify}
          isLoading={isVerifying}
        />
      )}

      {step === 4 && role === "dealer" && <SuccessDealer />}
      {step === 4 && role === "seller" && <SuccessSeller />}
    </AuthLayout>
  );
}

