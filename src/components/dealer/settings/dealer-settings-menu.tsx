"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, KeyRound, LogOut, Trash2, UserPen } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { DeleteAccountModal } from "@/components/seller/settings/delete-account-modal";
import { SettingsItem } from "@/components/seller/settings/settings-item";

export function DealerSettingsMenu() {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteConfirm = () => {
    console.log("dealer account deleted");
    setShowDelete(false);
    router.push(ROUTES.auth.signIn);
  };

  const handleLogout = () => {
    console.log("logout");
    router.push(ROUTES.auth.signIn);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <SettingsItem
          icon={UserPen}
          label="Edit personal Info"
          href={ROUTES.dealer.settingsEditProfile}
          variant="default"
        />
        <SettingsItem
          icon={KeyRound}
          label="Change Password"
          href={ROUTES.dealer.settingsChangePassword}
          variant="default"
        />
        <SettingsItem
          icon={CreditCard}
          label="Payment Methods"
          href={ROUTES.dealer.settingsPaymentMethods}
          variant="default"
        />
        <SettingsItem
          icon={Trash2}
          label="Delete Account"
          variant="danger"
          onClick={() => setShowDelete(true)}
        />
        <SettingsItem icon={LogOut} label="Logout" variant="logout" onClick={handleLogout} />
      </div>

      <DeleteAccountModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
