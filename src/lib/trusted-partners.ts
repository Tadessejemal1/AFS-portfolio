import diplomaticLogo from "@/assets/partners/diplomatic.svg";
import ethiopiaGovLogo from "@/assets/partners/ethiopia-gov.svg";
import insuranceLogo from "@/assets/partners/insurance.svg";
import ngoLogo from "@/assets/partners/ngo.svg";
import unLogo from "@/assets/partners/un.svg";

export const TRUSTED_PARTNER_KEYS = ["un", "ngo", "ins", "gov", "dip"] as const;
export type TrustedPartnerKey = (typeof TRUSTED_PARTNER_KEYS)[number];

export const TRUSTED_PARTNER_LOGOS: Record<TrustedPartnerKey, string> = {
  un: unLogo,
  ngo: ngoLogo,
  ins: insuranceLogo,
  gov: ethiopiaGovLogo,
  dip: diplomaticLogo,
};
