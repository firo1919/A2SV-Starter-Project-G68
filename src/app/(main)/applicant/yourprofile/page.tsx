import { ProfileProvider } from "@profile/ProfileContext";
import ProfileFrame from "@profile/ProfileFrame";
import YourProfileForm from "@profile/YourProfileForm";

export default function Page() {
  return (
    <ProfileProvider>
      <ProfileFrame>
        <YourProfileForm />
      </ProfileFrame>
    </ProfileProvider>
  );
}