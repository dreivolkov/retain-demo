export interface ProspectProfile {
  companyName: string;
  contactName: string;
  jobTitle: string;
  landingPage: string;
  logo: string;
  screenshotDataUrl: string | null;
}

export const EMPTY_PROSPECT: ProspectProfile = {
  companyName: "",
  contactName: "",
  jobTitle: "",
  landingPage: "",
  logo: "",
  screenshotDataUrl: null,
};
