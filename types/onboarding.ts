export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  illustration: string;
  backgroundColor: string;
}

export const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: "See your city improve",
    description: "Report issues, track progress, and see how your community is improving.",
    illustration: "city-skyline",
    backgroundColor: "#A8D5D5"
  },
  {
    id: 2,
    title: "Snap & Send",
    description: "Take a picture of the problem. We'll automatically get the location.",
    illustration: "snap-send",
    backgroundColor: "#F5F5F5"
  },
  {
    id: 3,
    title: "Report local issues",
    description: "Spotted a pothole, broken streetlight, or graffiti? Let us know and help improve your neighborhood.",
    illustration: "report-issues",
    backgroundColor: "#7AB8A3"
  }
];