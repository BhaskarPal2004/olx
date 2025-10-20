import AuthNavbar from "@/layouts/shared/AuthNavbar";
import Profile from "@/layouts/shared/Profile";


const ProfilePage = () => {

  return (
    <>
      <AuthNavbar />
      <section className="p-4 md:p-8 2xl:p-16 4xl:p-20">
        <Profile />
      </section>
    </>
  );
};

export default ProfilePage;
