export interface ProspectProfile {
  companyName: string;
  contactName: string;
  jobTitle: string;
  landingPage: string;
  logo: string;
  screenshotDataUrl: string | null;
  /** Name used in the "Hey [name]," greeting of the recovery email. Defaults to "there". */
  recipientName?: string;
}

export const EMPTY_PROSPECT: ProspectProfile = {
  companyName: "",
  contactName: "",
  jobTitle: "",
  landingPage: "",
  logo: "",
  screenshotDataUrl: null,
};
